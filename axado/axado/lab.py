# -*- coding: utf-8 -*-
from datetime import datetime
import json
import urllib

from django.utils.timezone import utc
from django.views.generic.base import View
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.template import RequestContext
from django.utils.decorators import method_decorator
from django.db.models import Q

class LabViews(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(LabViews, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        response = {}
        action = kwargs.get('action')

        if action == 'lab':
    		return render_to_response('website/lab.html', response,
            	context_instance=RequestContext(request))

        elif action == 'ecommerce':
        	return render_to_response('website/lab/ecommerce/index.html', response,
            	context_instance=RequestContext(request))

        return render_to_response('website/lab.html', response,
            context_instance=RequestContext(request))


    def post (self, request, *args, **kwargs):
        pass
