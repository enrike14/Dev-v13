odoo.define("pos_fe.models", function (require) {
  "use strict";
  var models = require("point_of_sale.models");
  //this.get_model('res.company');
  var _super_order = models.PosModel.prototype;

  models.PosModel = models.PosModel.extend({
    _save_to_server: function (orders, options) {
      var order_list = _super_order._save_to_server.apply(this, arguments);

      order_list.then(
        function (value) {
          console.log(value);
          return value;
        },
        function (error) {
          console.log(error);
          return order_list;
        }
      );
      return order_list;
    },

    initialize: function (session, attributes) {
      var self = this;
      models.load_fields("pos.order", ["CAFE", "qr_code", "include_pos"]);
      _super_order.initialize.apply(this, arguments);
    },
  });
});
