odoo.define("pos_fe.screens", function (require) {
  "use strict";

  var screens = require("point_of_sale.screens");
  //console.log("Funciona JS");
  screens.ReceiptScreenWidget.include({
    printfe: function () {
      console.log("Funciona JS Function");
      var self = this;
      var order = self.pos.get_order();

      var orderName = order.get_name();
      console.log(orderName);
      console.log(this.env.session.user_context);
      /* await this.rpc({
        model: 'pos.order',
        method: 'action_print_fe',
        args: [[orderName]],
        kwargs: { context: this.env.session.user_context },
        },{
        timeout: 30000,
        shadow: true,
        }).then(function (file) {
        if (file){
          console.log(file);
        //window.open(file.url);
        }
        }).catch(function (reason){
        });*/
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
