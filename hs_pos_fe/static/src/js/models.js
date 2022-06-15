odoo.define("pos_fe.models", function (require) {
  "use strict";
  var models = require("point_of_sale.models");
  var _super_order = models.PosModel.prototype;

  models.PosModel = models.PosModel.extend({
    initialize: function (session, attributes) {
      var self = this;
      models.load_fields("pos.order", ["cufe", "qr_code", "include_pos"]);
      _super_order.initialize.apply(this, arguments);
    },
  });
});
