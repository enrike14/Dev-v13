odoo.define("pos_fe.models", function (require) {
  "use strict";
  var models = require("point_of_sale.models");
  var _super_order = models.PosModel.prototype;

  models.PosModel = models.PosModel.extend({
    _save_to_server: function (orders, options) {
      var order_list = _super_order._save_to_server.apply(this, arguments);

      order_list.then(
        function (value) {
          console.log(value);
          try {
            localStorage.setItem("cufe", value[0].CAFE);
            localStorage.setItem("qr_code", value[0].qr_str);
            localStorage.setItem("id", value[0].id);
            localStorage.setItem("is_pos", value[0].include_pos);
          } catch (error) {
            console.error(error);
          }
        },
        function (error) {
          console.log(error);
        }
      );

      return order_list;
    },
    initialize: function (session, attributes) {
      var self = this;
      models.load_fields("pos.order", [
        "CAFE",
        "qr_code",
        "include_pos",
        "qr_str",
      ]);
      _super_order.initialize.apply(this, arguments);
    },
  });
});
