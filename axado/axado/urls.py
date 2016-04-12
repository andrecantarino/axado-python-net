# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from axado.settings import STATIC_ROOT, MEDIA_ROOT
from axado.index import IndexViews
from axado.lab import LabViews
from axado.cliente import ClienteViews
from axado.carriers import CarriersViews


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
    
    #lab
    # url(r'^lab[/]?$', LabViews.as_view(), {'action':'lab'}, 'lab' ),
    # url(r'^lab/ecommerce[/]?$', LabViews.as_view(), {'action':'ecommerce'}, 'ecommerce' ),

    #ecommerce
    # url(r'^lab/ecommerce/cliente[/]?$', ClienteViews.as_view(), {'action':'cliente'}, 'cliente'),
    # url(r'^lab/ecommerce/cliente/novo[/]?$', ClienteViews.as_view(), {'action':'cliente-novo'}, 'cliente-novo'),
    # url(r'^lab/ecommerce/cliente/salvar[/]?$', ClienteViews.as_view(), {'action':'cliente-salvar'}, 'cliente-salvar'),
    # url(r'^lab/ecommerce/cliente/(?P<cpf>[^/]+)[/]?$', ClienteViews.as_view(), {'action':'cliente-detalhe'}, 'cliente-detalhe'),
    # url(r'^lab/ecommerce/cliente/editar/(?P<cpf>[^/]+)[/]?$', ClienteViews.as_view(), {'action':'cliente-editar'}, 'cliente-editar'),
    # url(r'^lab/ecommerce/cliente/deletar/(?P<cpf>[^/]+)[/]?$', ClienteViews.as_view(), {'action':'cliente-deletar'}, 'cliente-deletar'),
)
