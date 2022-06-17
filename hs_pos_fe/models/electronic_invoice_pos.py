# -*- coding: utf-8 -*-
import base64
from odoo import models, fields, api
import qrcode
import logging
from io import BytesIO
import time

_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = "pos.order"

    qr_code = fields.Binary("QR Factura Electrónica",
                            attachment=True, readonly="True", store=True)
    CAFE = fields.Char(string="CAFE", store=True)
    include_pos = fields.Char(string="POS?", store=True)
    qr_str = fields.Char(string="POS?", store=True)

    @api.model
    def action_print_fe(self, name):
        order = self.env["pos.order"].search(
            [('pos_reference', 'in', name)], limit=1)
        return order.account_move.get_pdf_fe_pos()

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

                # constultamos el objeto de nuestra configuración del servicio
                config_document_obj = self.env["electronic.invoice"].search(
                    [('name', '=', 'ebi-pac')], limit=1)
                if config_document_obj:
                    isPos = config_document_obj.pos_module
                    order.include_pos = str(isPos)

                if str(isPos) == 'True':
                    order.account_move.send_fiscal_doc()
                    time.sleep(4)

                    self.generate_qr(order.account_move.qr_pos)
                    order.CAFE = str(order.account_move.cafe)
                    order.qr_str = str(order.account_move.qr_pos)

        return act_window

    @api.model
    def create_from_ui(self, orders, draft=False):
        order_list = super(PosOrder, self).create_from_ui(orders, draft=draft)
        cufe = self.browse(order_list[0].get('id')).CAFE
        qr_str = self.browse(order_list[0].get('id')).qr_str
        include_pos = self.browse(order_list[0].get('id')).include_pos

        order_list[0]["CAFE"] = cufe
        order_list[0]["qr_str"] = qr_str
        order_list[0]["include_pos"] = include_pos

        return order_list
