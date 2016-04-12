# -*- coding: utf-8 -*-
from datetime import datetime
import urllib

from django.utils.timezone import utc
from django.views.generic.base import View
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.template import RequestContext
from django.utils.decorators import method_decorator
from django.db.models import Q

class IndexViews(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(IndexViews, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        response = {}

        return render_to_response('website/index.html', response,
            context_instance=RequestContext(request))


    def post (self, request, *args, **kwargs):
        pass
