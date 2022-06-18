this.$(".js_invoice").removeClass("highlight");
odoo.define("pos_fe.screens", function (require) {
  "use strict";

  var screens = require("point_of_sale.screens");

  screens.PaymentScreenWidget.include({
    click_invoice: function () {
      var order = this.pos.get_order();

      order.set_to_invoice(true);
      this._super();
      if (order.is_to_invoice()) {
        this.$(".js_invoice").addClass("highlight");
      } else {
        this.$(".js_invoice").removeClass("highlight");
      }
    },
  });
});
