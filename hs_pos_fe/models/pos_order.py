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

    @api.model
    def action_print_fe(self, name):
        order = self.env["pos.order"].search(
            [('pos_reference', 'in', name)], limit=1)
        return order.account_move.get_pdf_fe_pos(order.account_move.tipoEmisionPdf, order.account_move.tipoDocPdf, order.account_move.pdfNumber, order.account_move.puntoFacturacion)
        # return order.account_move.id
