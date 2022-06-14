odoo.define("pos_fe.screens", function (require) {
  "use strict";
  var session = require("web.session");
  var screens = require("point_of_sale.screens");
  var rpc = require("web.rpc");
  var models = require("point_of_sale.models");
  models.load_fields("pos.order", "CAFE");
  //models.load_fields("pos.order", "qr_code");
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
  });
});

odoo.define("pos_receipt_custom.ReceiptScreenWidget", function (require) {
  "use strict";
  var screens = require("point_of_sale.screens");
  var ReceiptScreenWidget = screens.ReceiptScreenWidget;

  ReceiptScreenWidget.include({
    get_receipt_render_env: function () {
      var order = this.pos.get_order();
      var receipt_data = order.export_for_printing();
      _.each(receipt_data.orderlines, function (line) {
        // quantity
        var nb = String(line.quantity);
        if (nb.length == 1) {
          line.quantity_nb = "<pre>  " + line.quantity + "</pre>";
        } else if (nb.length == 2) {
          line.quantity_nb = "<pre> " + line.quantity + "</pre>";
        } else if (nb.length == 3) {
          line.quantity_nb = line.quantity;
        }

        //product_name
        var product_nb = line.product_name_wrapped[0].length;
        var max_nb = 20;
        var final_product = "";
        if (product_nb >= max_nb) {
          for (var i = 0; i < max_nb; i++) {
            final_product = final_product + line.product_name_wrapped[0][i];
          }
        } else {
          var diff_nb = max_nb - product_nb;
          final_product = "<pre>" + line.product_name_wrapped[0];
          for (var i = 0; i < diff_nb; i++) {
            final_product = final_product + " ";
          }
          final_product = final_product + "</pre>";
        }
        line.final_product = final_product;

        //price unit
        var max_pu_nb = 7;
        var pu_nb = String(line.price).length;
        var diff_pu_nb = max_pu_nb - pu_nb;
        var final_pu = "<pre>";
        for (var i = 0; i < diff_pu_nb; i++) {
          final_pu = final_pu + " ";
        }
        final_pu = final_pu + line.price + "</pre>";
        line.final_pu = final_pu;

        //price display
        var max_pd_nb = 10;
        var pd_nb = String(line.price_display).length;
        var diff_pd_nb = max_pd_nb - pd_nb;
        var final_pd = "<pre>";
        for (var i = 0; i < diff_pd_nb; i++) {
          final_pd = final_pd + " ";
        }
        final_pd = final_pd + line.price_display + "</pre>";
        line.final_pd = final_pd;
      });

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
