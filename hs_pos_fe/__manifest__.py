# -*- coding: utf-8 -*-
{
    "name": "hs_pos_fe",
    "summary": """
       Electronic Invoice POS""",
    "description": """
        Long description of module's purpose
    """,
    "author": "HS Consult",
    "website": "http://www.hconsul.com/odoo/",
    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    "category": "Uncategorized",
    "version": "0.1",
    "licence": "OPL-1",
    # any module necessary for this one to work correctly
    "depends": ["hs_electronic_invoice", "point_of_sale"],
    # always loaded
    "data": [
        "views/assets.xml",
        "views/invoice_pos_conf.xml"
    ],
    # only loaded in demonstration mode
    "qweb": [
        "static/src/xml/pos.xml",

    ],
}
