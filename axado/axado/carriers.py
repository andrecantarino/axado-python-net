# -*- coding: utf-8 -*-
from datetime import datetime
import requests
import json

from django.utils.timezone import utc
from django.views.generic.base import View
from django.shortcuts import render_to_response, render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.template import RequestContext
from django.utils.decorators import method_decorator

from axado.settings import URL_API

class CarriersViews(View):
	@method_decorator(csrf_exempt)
	def dispatch(self, *args, **kwargs):
		return super(CarriersViews, self).dispatch(*args, **kwargs)

	def get(self, request, *args, **kwargs):
		action = kwargs.get('action')
		cnpj = kwargs.get('cnpj')
		response = {}

		if action == 'transportadora':
			query = ''

			try:
				response['query'] = request.GET.copy()
				query = response['query']['q']
			except Exception, e:
				query = ''

			if len(query):
				resp = requests.get('%stransportadora?q=%s' % (URL_API, response['query']['q']))
				response['transportadora'] = json.loads(resp.text)
			else:
				resp = requests.get('%stransportadora/listar' % URL_API)
				response['transportadora'] = json.loads(resp.text)
			
			return render(request, 'website/transportadora/index.html', {'response': response})
		
		elif action == 'transportadora-novo':
			response['action'] = '/transportadora/salvar/'
			response['title'] = 'CADASTRO DE TRANSPORTADORA'

			return render(request, 'website/transportadora/transportadora.html', {'response': response})

		elif action == 'transportadora-detalhe':
			resp = requests.get('%stransportadora/%s' % (URL_API, cnpj))
			response['transportadora'] = json.loads(resp.text)

			return render(request, 'website/transportadora/detalhe.html', {'response': response})

		elif action == 'transportadora-editar':
			resp = requests.get('%stransportadora/%s' % (URL_API, cnpj))
			response['action'] = '/transportadora/editar/%s' % cnpj
			response['transportadora'] = json.loads(resp.text)
			response['transportadora_id'] = response['transportadora']['lista'][0]['_id']
			response['title'] = 'EDITAR TRANSPORTADORA'
			
			return render(request, 'website/transportadora/transportadora.html', {'response': response})

		elif action == 'transportadora-deletar':
			resp = requests.delete('%stransportadora/deletar/%s' % (URL_API, cnpj))
			response['transportadora'] = json.loads(resp.text)

			return redirect('/transportadora/')

		else:
			return render_to_response('website/transportadora/index.html', response,
	            context_instance=RequestContext(request))

	def post (self, request, *args, **kwargs):
		action = kwargs.get('action')
		response = {}
		response['transportadora'] = request.POST.copy()

		if action == 'transportadora-salvar':
			headers = {'content-type': 'application/json'}
			url = '%stransportadora/salvar' % URL_API
			data = {
				"name":"%s" % response['transportadora']['name'], 
				"company_name":"%s" % response['transportadora']['company_name'], 
				"cnpj":"%s" % response['transportadora']['cnpj'], 
				"phone":"%s" % response['transportadora']['phone'], 
				"email":"%s" % response['transportadora']['email'],
			}

			response['action'] = '/transportadora/salvar/'
			resp = requests.post(url, data=json.dumps(data), headers=headers)
			response['resp'] = json.loads(resp.text)
			response['title'] = 'CADASTRO DE TRANSPORTADORA'

			try:
				if response['resp']['erro']:
					data = u"{\"erro\":\"True\",\"mensagem\":\"Erro ao salvar a transportadora\", \"lista\":[{\"name\":\"%s\", \"company_name\":\"%s\", \"cnpj\":\"%s\", \"phone\":\"%s\", \"email\":\"%s\", }]}" % (response['transportadora']['name'], response['transportadora']['company_name'], response['transportadora']['cnpj'], response['transportadora']['phone'], response['transportadora']['email'])
					response['transportadora'] = json.loads(data)
					
					return render(request, 'website/transportadora/transportadora.html', {'response': response})
				else:
					return redirect('/transportadora/')
			except Exception, e:
				print "%s" % str(e)

		elif action == 'transportadora-editar':
			headers = {'content-type': 'application/json'}
			url = '%stransportadora/editar/%s' % (URL_API, response['transportadora']['cnpjHidden'])
			data = {
				"name":"%s" % response['transportadora']['name'], 
				"company_name":"%s" % response['transportadora']['company_name'], 
				"cnpj":"%s" % response['transportadora']['cnpj'], 
				"phone":"%s" % response['transportadora']['phone'],
				"email": "%s" % response['transportadora']['email'],
				"cnpjHidden":"%s" % response['transportadora']['cnpjHidden'], 
				"transportadoraId":"%s" % response['transportadora']['transportadoraId'], 
			}

			resp = requests.put(url, data=json.dumps(data), headers=headers)
			response['resp'] = json.loads(resp.text)
			response['title'] = 'EDITAR TRANSPORTADORA'
			
			try:
				if response['resp']['erro']:
					data = u"{\"erro\":\"True\",\"mensagem\":\"Erro ao salvar a transportadora\", \"lista\":[{\"name\":\"%s\", \"company_name\":\"%s\", \"cnpj\":\"%s\", \"phone\":\"%s\", \"email\":\"%s\", \"cnpjHidden\":\"%s\", \"transportadoraId\":\"%s\" }]}" % (response['transportadora']['name'], response['transportadora']['company_name'], response['transportadora']['cnpj'], response['transportadora']['phone'], response['transportadora']['email'], response['transportadora']['cnpjHidden'], response['transportadora']['transportadoraId'])
					response['transportadora'] = json.loads(data)
					
					return render(request, 'website/transportadora/transportadora.html', {'response': response})
				else:
					return redirect('/transportadora/')
			except Exception, e:
				print "%s" % str(e)

		else:
			return render_to_response('website/transportadora/index.html', response,
				context_instance=RequestContext(request))