# -*- coding: utf-8 -*-

from odoo import models, fields, api

import logging
_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = "pos.order"

    def action_pos_order_invoice(self):
        act_window = super(PosOrder, self).action_pos_order_invoice()
        for order in self:
            if order.account_move and order.account_move.type == 'out_invoice':
                order.account_move.send_fiscal_doc()
                # order.account_move.get_pdf_fe()
        return act_window