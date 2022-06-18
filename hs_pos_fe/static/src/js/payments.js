this.$(".js_invoice").removeClass("highlight");
odoo.define("pos_fe.screens", function (require) {
  "use strict";
  var session = require("web.session");
  var screens = require("point_of_sale.screens");
  var rpc = require("web.rpc");

  screens.PaymentScreenWidget.include({
    click_invoice: function () {
      this._super();
      var order = this.pos.get_order();

      //order.set_to_invoice(!order.is_to_invoice());
      order.set_to_invoice(true);

      if (order.is_to_invoice()) {
        this.$(".js_invoice").addClass("highlight");
      } else {
        this.$(".js_invoice").removeClass("highlight");
      }
    },
  });
});
