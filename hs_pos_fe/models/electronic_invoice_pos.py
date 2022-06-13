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
                fe_info = order.account_move.get_fe_info()
                logging.info("RETORNO FE INFO:" + fe_info)
                """ for info in fe_info:

                    if info == 'cafe':
                        cafe = fe_info[info]

                    if info == 'qr':
                        qr = fe_info[info]

                    if info == 'isPOS':
                        if fe_info[info]:
                            order.account_move.send_fiscal_doc()
                            order.include_pos = fe_info[info]
                            order.qr_code = qr
                            order.CAFE = cafe
                            logging.info("El CAFE del FE:" + order.CAFE) """

        return act_window
