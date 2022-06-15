odoo.define("pos_fe.receipt", function (require) {
  "use strict";
  var models = require("point_of_sale.models");
  models.load_fields("pos.order", ["cufe", "qr_code", "include_pos"]);
  var _super_orderline = models.Orderline.prototype;
  models.Orderline = models.Orderline.extend({
    export_for_printing: function () {
      var order = _super_order.export_for_printing.apply(this, arguments);
      order.cufe = this.get_order().CAFE;
      return line;
    },
  });
});
