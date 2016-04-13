# -*- coding: utf-8 -*-
from functools import wraps
import requests
import json

from django.http import HttpResponseRedirect
from axado.settings import URL_API

def access_required(permission):
    """
    Decorador de usuário autenticado
    """
    def decorator(func):
        def inner_decorator(request, *args, **kwargs):
            response = {}
            data = {}

            if permission == 'admin':
                try:
                    user_id = request.request.COOKIES['id']
                    url = request.request.path.split('/')[2]

                    if user_id:
                        resp = requests.get('%susuario/%s' % (URL_API, user_id))
                        response['resp'] = json.loads(resp.text)

                        if len(response['resp']['lista']) > 0:
                            return func(request, *args, **kwargs)
                        else:
                            redirect = "/admin/"
                            if request.request.META.get("PATH_INFO"):
                                redirect = "/admin/?next=%s" % request.request.META.get('PATH_INFO')
                            
                            return HttpResponseRedirect(redirect)
                    else:
                        redirect = "/admin/"
                        if request.request.META.get("PATH_INFO"):
                            redirect = "/admin/?next=%s" % request.request.META.get('PATH_INFO')
                        
                        return HttpResponseRedirect(redirect)

                    return HttpResponseRedirect('/admin/%s/' % url)
                except:
                    redirect = "/admin/"
                    if request.request.META.get("PATH_INFO"):
                        redirect = "/admin/?next=%s" % request.request.META.get('PATH_INFO')
                    
                    return HttpResponseRedirect(redirect)

        return wraps(func)(inner_decorator)

    return decorator