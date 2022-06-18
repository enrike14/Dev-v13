odoo.define("pos_fe.receipt", function (require) {
  "use strict";
  var models = require("point_of_sale.models");
  models.Order = models.Order.extend({
    is_to_invoice: function () {
      _super_order.initialize.apply(this, arguments);
      return true;
    },
  });
});
