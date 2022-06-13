# -*- coding: utf-8 -*-
import base64
from odoo import models, fields, api
import qrcode
import logging
from io import BytesIO

_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = "pos.order"

    def generate_qr(self, strQR):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(strQR)
        qr.make(fit=True)
        img = qr.make_image()
        temp = BytesIO()
        img.save(temp, format="PNG")
        qr_image = base64.b64encode(temp.getvalue())
        self.qr_code = qr_image

    def action_pos_order_invoice(self):
        act_window = super(PosOrder, self).action_pos_order_invoice()
        for order in self:
            if order.account_move and order.account_move.type == 'out_invoice':
                logging.info("IS POS INFO::::::" +
                             order.account_move.is_Pos_info())
                if order.account_move.is_Pos_info() == 'True':
                    order.include_pos = str(order.account_move.is_Pos_info())
                    order.account_move.send_fiscal_doc()
                    fe_info_cafe = order.account_move.get_fe_info()
                    logging.info("RETORNO FE INFO:" + str(fe_info_cafe))

                    self.generate_qr(fe_info_cafe)
                    order.CAFE = str(fe_info_cafe)

        return act_window
