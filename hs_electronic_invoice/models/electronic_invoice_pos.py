# -*- coding: utf-8 -*-

from odoo import models, fields, api
import odoo.exceptions import ValidationError
import logging
_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = "pos.order"

    def action_pos_order_invoice(self):
        act_window = super(PosOrder, self).action_pos_order_invoice()
        for order in self:
            if order.occount.move_type and order.coount_move.move_type == 'out_invoice':
                order.account_move.send_fiscal_doc()
        return act_window
