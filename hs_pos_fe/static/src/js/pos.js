odoo.define("pos_fe.screens", function (require) {
  "use strict";
  var session = require("web.session");
  var screens = require("point_of_sale.screens");
  var rpc = require("web.rpc");
  var models = require("point_of_sale.models");
  models.load_fields("pos.order", "CAFE");
  //models.load_fields("pos.order", "qr_code");...
  console.log(models);
  screens.ReceiptScreenWidget.include({
    printfe: async function () {
      console.log("Funciona JS Function");
      var self = this;
      var order = self.pos.get_order();
      console.log(order);

      var orderName = order.get_name();
      console.log(orderName);
      console.log(this);
      console.log(session.user_context);
      await rpc
        .query(
          {
            model: "pos.order",
            method: "action_print_fe",
            args: [[orderName]],
            kwargs: { context: session.user_context },
          },
          {
            timeout: 30000,
            shadow: true,
          }
        )
        .then(function (file) {
          console.log(file);
          if (file) {
            console.log(file);
            //window.open("data:application/pdf," + encodeURI(file));
            var byteCharacters = atob(file);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var file = new Blob([byteArray], {
              type: "application/pdf;base64",
            });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          }
        })
        .catch(function (reason) {});
    },

    renderElement: function () {
      var self = this;
      this._super();
      this.$(".button.printfe").click(function () {
        //console.log("el onclick");
        if (!self._locked) {
          self.printfe();
        }
      });
    },

    getfevalues: async function () {
      var self = this;
      var order = self.pos.get_order();
      var orderName = order.get_name();

      await rpc
        .query(
          {
            model: "pos.order",
            method: "action_print_fe",
            args: [[orderName]],
            kwargs: { context: session.user_context },
          },
          {
            timeout: 30000,
            shadow: true,
          }
        )
        .then(function (dato) {
          console.log(dato);
          return "datossssss";
        })
        .catch(function (reason) {});
    },

    get_receipt_render_env: async function () {
      var self = this;
      var order = this.pos.get_order();
      var receipt_data = order.export_for_printing();
      //receipt_data.qr = await self.getfevalues();
      console.log("DATA::::::::" + receipt_data);

      return {
        widget: this,
        pos: this.pos,
        order: order,
        receipt: receipt_data,
        orderlines: order.get_orderlines(),
        paymentlines: order.get_paymentlines(),
      };
    },
  });
});
