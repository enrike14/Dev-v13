odoo.define("pos_fe.receipt", function (require) {
  "use strict";
  var models = require("point_of_sale.models");
  var _super_order = models.Order.prototype;
  models.Order = models.Order.extend({
    is_to_invoice: function () {
      _super_order.is_to_invoice.apply(this, arguments);
      return true;
    },
  });
});
