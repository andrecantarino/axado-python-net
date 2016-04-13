# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from axado.settings import STATIC_ROOT, MEDIA_ROOT
from axado.index import IndexViews

urlpatterns = patterns('',
    # arquivos estaticos (html, js e css)
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': STATIC_ROOT}),

    # uploads e arquivos de usuário
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': MEDIA_ROOT}),

    #home
    url(r'^$', IndexViews.as_view()),

    # include do app administrativo
    url(r'^admin/', include('admin.urls') ),    
)
