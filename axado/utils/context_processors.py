# -*- coding: utf-8 -*-
from django.conf import settings

def default_context(context):

    context_dict = {
        'STATIC_URL': settings.STATIC_URL,
        'MEDIA_URL': settings.MEDIA_URL,
        'SITE_URL': settings.SITE_URL,
        'DOMAIN_NAME': settings.DOMAIN,
    }
    return context_dict