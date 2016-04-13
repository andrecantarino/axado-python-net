# -*- coding:utf-8 -*-
from django.conf.urls import patterns, include, url

from admin.views import HomeView
from admin.login import LoginViews
from admin.carriers import CarriersViews

urlpatterns = patterns('',
	url(r'^$', HomeView.as_view() ),

    #login
    url(r'^login(/(?P<action>(check|logout)))?[/]?$', LoginViews.as_view() ),

    #transportadora
    url(r'^transportadora[/]?$', CarriersViews.as_view(), {'action':'transportadora'}, 'transportadora'),
    url(r'^transportadora/novo[/]?$', CarriersViews.as_view(), {'action':'transportadora-novo'}, 'transportadora-novo'),
    url(r'^transportadora/salvar[/]?$', CarriersViews.as_view(), {'action':'transportadora-salvar'}, 'transportadora-salvar'),
    url(r'^transportadora/avaliar[/]?$', CarriersViews.as_view(), {'action':'transportadora-avaliar'}, 'transportadora-avaliar'),
    url(r'^transportadora/(?P<cnpj>[^/]+)[/]?$', CarriersViews.as_view(), {'action':'transportadora-detalhe'}, 'transportadora-detalhe'),
    url(r'^transportadora/editar/(?P<cnpj>[^/]+)[/]?$', CarriersViews.as_view(), {'action':'transportadora-editar'}, 'transportadora-editar'),
    url(r'^transportadora/deletar/(?P<cnpj>[^/]+)[/]?$', CarriersViews.as_view(), {'action':'transportadora-deletar'}, 'transportadora-deletar'),
)






	