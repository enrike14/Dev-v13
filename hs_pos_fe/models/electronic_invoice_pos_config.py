# -*- coding: utf-8 -*-

from dataclasses import field
from email.policy import default
from odoo import models, fields, api
from datetime import datetime


class electronic_invoice(models.Model):
    _inherit = "electronic.invoice"
    pos_module = fields.Boolean(string="Activar en POS")
