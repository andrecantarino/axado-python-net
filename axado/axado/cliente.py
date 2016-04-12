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

class ClienteViews(View):
	@method_decorator(csrf_exempt)
	def dispatch(self, *args, **kwargs):
		return super(ClienteViews, self).dispatch(*args, **kwargs)

	def get(self, request, *args, **kwargs):
		action = kwargs.get('action')
		cpf = kwargs.get('cpf')
		response = {}

		if action == 'cliente':
			query = ''

			try:
				response['query'] = request.GET.copy()
				query = response['query']['q']
			except Exception, e:
				query = ''

			if len(query):
				resp = requests.get('http://localhost:3000/cliente?q=%s' % response['query']['q'])
				#resp = requests.get('http://api.andrecantarino.com.br/cliente?q=%s' % response['query']['q'])
				response['cliente'] = json.loads(resp.text)
			else:
				resp = requests.get('http://localhost:3000/cliente/listar')
				#resp = requests.get('http://api.andrecantarino.com.br/cliente/listar')
				response['cliente'] = json.loads(resp.text)
			
			return render(request, 'website/lab/ecommerce/cliente/index.html', {'response': response})
		
		elif action == 'cliente-novo':
			response['action'] = '/lab/ecommerce/cliente/salvar/'
			response['title'] = 'CADASTRO DE CLIENTES'

			return render(request, 'website/lab/ecommerce/cliente/cliente.html', {'response': response})

		elif action == 'cliente-detalhe':
			resp = requests.get('http://localhost:3000/cliente/%s' % cpf)
			#resp = requests.get('http://api.andrecantarino.com.br/cliente/%s' % cpf)
			response['cliente'] = json.loads(resp.text)

			return render(request, 'website/lab/ecommerce/cliente/detalhe.html', {'response': response})

		elif action == 'cliente-editar':
			resp = requests.get('http://localhost:3000/cliente/%s' % cpf)
			#resp = requests.get('http://api.andrecantarino.com.br/cliente/%s' % cpf)
			response['action'] = '/lab/ecommerce/cliente/editar/%s' % cpf
			response['cliente'] = json.loads(resp.text)
			response['cliente_id'] = response['cliente']['lista'][0]['_id']
			response['title'] = 'EDITAR CLIENTES'
			
			return render(request, 'website/lab/ecommerce/cliente/cliente.html', {'response': response})

		elif action == 'cliente-deletar':
			resp = requests.delete('http://localhost:3000/cliente/deletar/%s' % cpf)
			#resp = requests.delete('http://api.andrecantarino.com.br/cliente/deletar/%s' % cpf)
			response['cliente'] = json.loads(resp.text)

			return redirect('/lab/ecommerce/cliente/')

		else:
			return render_to_response('website/lab/ecommerce/cliente/index.html', response,
	            context_instance=RequestContext(request))

	def post (self, request, *args, **kwargs):
		action = kwargs.get('action')
		response = {}
		response['cliente'] = request.POST.copy()
		listaTel = ''

		if action == 'cliente-salvar':
			#telefones
			lista = request.POST.getlist('telefones[]')
			if lista:
				for tel in lista:
					if len(tel) > 1:
						listaTel += "%s;" % tel

			headers = {'content-type': 'application/json'}
			url = 'http://localhost:3000/cliente/salvar'
			#url = 'http://api.andrecantarino.com.br/cliente/salvar'
			data = {
				"name":"%s" % response['cliente']['name'], 
				"cpf":"%s" % response['cliente']['cpf'], 
				"email":"%s" % response['cliente']['email'], 
				"maritalStatus":"%s" % response['cliente']['maritalStatus'],
				"telefones": "%s" % listaTel,
				"logradouro":"%s" % response['cliente']['logradouro'],
				"numero":"%s" % response['cliente']['numero'],
				"complemento":"%s" % response['cliente']['complemento'],
				"bairro":"%s" % response['cliente']['bairro'],
				"nomebairro":"%s" % response['cliente']['nomebairro'],
				"cidade":"%s" % response['cliente']['cidade'],
				"nomecidade":"%s" % response['cliente']['nomecidade'],
				"estado":"%s" % response['cliente']['estado'],
				"nomeestado":"%s" % response['cliente']['nomeestado'],
				"cpfHidden":"%s" % response['cliente']['cpfHidden'], 
				"emailHidden":"%s" % response['cliente']['emailHidden'],
			}

			response['action'] = '/lab/ecommerce/cliente/salvar/'
			resp = requests.post(url, data=json.dumps(data), headers=headers)
			response['resp'] = json.loads(resp.text)
			response['title'] = 'CADASTRO DE CLIENTES'

			try:
				if response['resp']['erro']:
					data = u"{\"erro\":\"True\",\"mensagem\":\"Erro ao salvar o cliente\", \"lista\":[{\"name\":\"%s\", \"cpf\":\"%s\", \"email\":\"%s\", \"maritalStatus\":\"%s\", \"logradouro\":\"%s\", \"numero\":\"%s\", \"complemento\":\"%s\", \"bairro\":\"%s\", \"cidade\":\"%s\", \"estado\":\"%s\", \"telefones\":\"%s\", \"nomebairro\":\"%s\", \"nomecidade\":\"%s\", \"nomeestado\":\"%s\"}]}" % (response['cliente']['name'], response['cliente']['cpf'], response['cliente']['email'], response['cliente']['maritalStatus'], response['cliente']['logradouro'], response['cliente']['numero'], response['cliente']['complemento'], response['cliente']['bairro'], response['cliente']['cidade'], response['cliente']['estado'], listaTel, response['cliente']['nomebairro'], response['cliente']['nomecidade'], response['cliente']['nomeestado'])
					response['cliente'] = json.loads(data)
					
					return render(request, 'website/lab/ecommerce/cliente/cliente.html', {'response': response})
				else:
					return redirect('/lab/ecommerce/cliente/')
			except Exception, e:
				print "%s" % str(e)

		elif action == 'cliente-editar':
			#telefones
			lista = request.POST.getlist('telefones[]')
			if lista:
				for tel in lista:
					if len(tel) > 1:
						listaTel += "%s;" % tel

			headers = {'content-type': 'application/json'}
			url = 'http://localhost:3000/cliente/editar/%s' % response['cliente']['cpfHidden']
			#url = 'http://api.andrecantarino.com.br/cliente/editar/%s' % response['cliente']['cpfHidden']
			data = {
				"name":"%s" % response['cliente']['name'], 
				"cpf":"%s" % response['cliente']['cpf'], 
				"email":"%s" % response['cliente']['email'], 
				"maritalStatus":"%s" % response['cliente']['maritalStatus'],
				"telefones": "%s" % listaTel,
				"logradouro":"%s" % response['cliente']['logradouro'],
				"numero":"%s" % response['cliente']['numero'],
				"complemento":"%s" % response['cliente']['complemento'],
				"bairro":"%s" % response['cliente']['bairro'],
				"nomebairro":"%s" % response['cliente']['nomebairro'],
				"cidade":"%s" % response['cliente']['cidade'],
				"nomecidade":"%s" % response['cliente']['nomecidade'],
				"estado":"%s" % response['cliente']['estado'],
				"nomeestado":"%s" % response['cliente']['nomeestado'],
				"cpfHidden":"%s" % response['cliente']['cpfHidden'], 
				"emailHidden":"%s" % response['cliente']['emailHidden'],
				"telefoneHidden":"%s" % response['cliente']['telefoneHidden'],
				"clienteId":"%s" % response['cliente']['clienteId'], 
			}

			resp = requests.put(url, data=json.dumps(data), headers=headers)
			response['resp'] = json.loads(resp.text)
			response['title'] = 'EDITAR CLIENTES'
			
			try:
				if response['resp']['erro']:
					data = u"{\"erro\":\"True\",\"mensagem\":\"Erro ao salvar o cliente\", \"lista\":[{\"name\":\"%s\", \"cpf\":\"%s\", \"email\":\"%s\", \"maritalStatus\":\"%s\", \"logradouro\":\"%s\", \"numero\":\"%s\", \"complemento\":\"%s\", \"bairro\":\"%s\", \"cidade\":\"%s\", \"estado\":\"%s\", \"telefones\":\"%s\", \"nomebairro\":\"%s\", \"nomecidade\":\"%s\", \"nomeestado\":\"%s\", \"clienteId\":\"%s\"}]}" % (response['cliente']['name'], response['cliente']['cpf'], response['cliente']['email'], response['cliente']['maritalStatus'], response['cliente']['logradouro'], response['cliente']['numero'], response['cliente']['complemento'], response['cliente']['bairro'], response['cliente']['cidade'], response['cliente']['estado'], listaTel, response['cliente']['nomebairro'], response['cliente']['nomecidade'], response['cliente']['nomeestado'], response['cliente']['clienteId'])
					response['cliente'] = json.loads(data)
					
					return render(request, 'website/lab/ecommerce/cliente/cliente.html', {'response': response})
				else:
					return redirect('/lab/ecommerce/cliente/')
			except Exception, e:
				print "%s" % str(e)

		else:
			return render_to_response('website/lab/ecommerce/cliente/index.html', response,
				context_instance=RequestContext(request))