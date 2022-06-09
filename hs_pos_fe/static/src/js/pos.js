odoo.define("pos_fe.screens", function (require) {
  "use strict";

  var screens = require("point_of_sale.screens");

  screens.ReceiptScreenWidget.include({
    printfe: function () {
      console.log('Funciona JS');
      let self = this;
      let order = self.pos.get_order();

      const orderName = order.get_name();
      
        await this.rpc({
        model: 'pos.order',
        method: 'action_print_fe',
        args: [[orderName]],
        kwargs: { context: this.env.session.user_context },
        },{
        timeout: 30000,
        shadow: true,
        }).then(function (file) {
        if (file.url){
          console.log(file);
        //window.open(file.url);
        }
        }).catch(function (reason){
        });
    },

    renderElement: function () {
      let self = this;
      this.$(".button.print-fe").click(function () {
        console.log("el onclick");
        if (!self._locked) {
          self.printfe();
        }
      });
    },
  });
});
