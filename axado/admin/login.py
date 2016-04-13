# -*- coding: utf-8 -*-
import datetime
import hashlib
from re import sub
import json
import requests
from json import dumps

from django.views.generic.base import View
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse

from axado.settings import URL_API, SESSION_COOKIE_DOMAIN

class LoginViews (View):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(LoginViews, self).dispatch(*args, **kwargs)

    def get(self, request, **kwargs):
        action = kwargs.get('action')

        if action == "logout":
            #desologa user
            self.logout(request)
            referer = self.get_referer_view(request, "/")

            return redirect(referer)

    def post (self, request, *args, **kwargs):
        action = kwargs.get('action')
        data = { 'status': 0 }
        response = { }

        if action == "check":
            if request.POST["email"] and request.POST["psw"]:
                headers = {'content-type': 'application/json'}
                url = '%susuario/login' % URL_API
                data = {
                    "email":"%s" % request.POST["email"], 
                    "password":"%s" % request.POST["psw"], 
                }

                resp = requests.post(url, data=json.dumps(data), headers=headers)
                response['resp'] = json.loads(resp.text)

                if len(response['resp']['lista']['_id']) > 0:
                    return HttpResponse(dumps(response['resp']), content_type="application/json")
                else:
                    return redirect('/admin/')

        return HttpResponse(dumps(data), content_type="application/json")

    def get_referer_view(self, request, default=None):
        # if the user typed the url directly in the browser's address bar
        referer = request.META.get('HTTP_REFERER')
        if not referer:
            return default

        # remove protoloco e quebra a url
        referer = sub('^https?:\/\/', '', referer).split('/')

        if referer[0] != request.META.get('HTTP_HOST'):
            return default

        # pega o path relativo da url
        referer = u'/' +  u'/'.join(referer[1:])
        return referer

    def setLoginCookies(self, request, user):
        self._setCookie(request, "id", user.id)
        self._setCookie(request, "name", user.name)
        self._setCookie(request, "cpf", user.url)
        self._setCookie(request, "email", user.email)

    def _setCookie(self, request, key, value):
        # import ipdb
        # ipdb.set_trace()

        max_age = 365 * 24 * 60 * 60  # 1 ano
        expires = datetime.datetime.strftime(
            datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age),
            "%a, %d-%b-%Y %H:%M:%S GMT")

        domain = SESSION_COOKIE_DOMAIN

        if isinstance(value, basestring):
            value = value.encode("utf-8")

        request.COOKIES.set(key, value, domain=domain,
                            max_age=max_age, path="/", expires=expires)

    def logout(self, request):
        """
        Remove cookies de login
        """
        domain = '.%s' % SESSION_COOKIE_DOMAIN
        if domain.find(':') > 0:
            domain = domain.replace(domain[domain.find(':'):], '')

        #erro (descomentar depois)
        domain = SESSION_COOKIE_DOMAIN
        request.COOKIES.delete("id", path="/", domain=domain)
        request.COOKIES.delete("name", path="/", domain=domain)
        request.COOKIES.delete("cpf", path="/", domain=domain)
        request.COOKIES.delete("email", path="/", domain=domain)