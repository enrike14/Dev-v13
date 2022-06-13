# -*- coding: utf-8 -*-

import base64
from cmath import log
from io import BytesIO
from pydoc import cli
from xmlrpc.client import DateTime
from odoo import models, fields, api
import zeep
import logging
from base64 import b64decode
from datetime import date, datetime, timezone
from odoo import http
from odoo.http import request
from odoo.http import content_disposition
import qrcode
from odoo.exceptions import UserError
import requests
import time
import json
from odoo.http import request
from odoo import http

_logger = logging.getLogger(__name__)


class pos_electronic_invoice(models.Model):
    _inherit = "pos.order"
    qr_code = fields.Binary("QR Factura Electrónica",
                            attachment=True, readonly="True")
    CAFE = fields.Char(string="CAFE")
    include_pos = fields.Char(string="POS?")

    @api.model
    def action_print_fe(self, name):
        pdf = False
        config_document_obj = self.env["electronic.invoice"].search(
            [('name', '=', 'ebi-pac')], limit=1)
        if config_document_obj:
            isPos = config_document_obj.pos_module
        if isPos:
            order = self.env["pos.order"].search(
                [('pos_reference', 'in', name)], limit=1)
            pdf = order.account_move.get_pdf_fe_pos()
        return pdf
