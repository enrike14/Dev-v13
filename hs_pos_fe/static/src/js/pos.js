odoo.define("pos_fe.screens", function (require) {
  "use strict";

  var screens = require("point_of_sale.screens");

  screens.ReceiptScreenWidget.include({
    renderElement: function () {
      let self = this;
      this.$(".button.print-fe").click(function () {
        console.log("el onclick");
        if (!self._locked) {
          //self.printfe();
        }
      });
    },
  });
});
