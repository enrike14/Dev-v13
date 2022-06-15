odoo.define("pos_fe.models", function (require) {
  "use strict";
  var models = require("point_of_sale.models");
  //this.get_model('res.company');
  var _super_order = models.PosModel.prototype;

  models.PosModel = models.PosModel.extend({
    initialize: function (session, attributes) {
      var self = this;
      models.load_fields("pos.order", ["CAFE", "qr_code", "include_pos"]);
      _super_order.initialize.apply(this, arguments);
    },
  });
});
