# -*- coding: utf-8 -*-
from django.views.generic.base import View
from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django.contrib import messages
from django.http import HttpResponse, HttpRequest
from json import dumps


class HomeView (View):
	def get(self, request):
		#url default para redirect
		response = {}
		next = "/admin/home"
		
		if "next" in request.GET:
			next = request.GET["next"]
		
		#redirect caso já esteja logado
		# if Login().isUser(request):
		# 	return redirect("/admin/home")

		return render_to_response("admin/index.html", { 'next': next },
			context_instance=RequestContext(request))


	def post(self, request):
		if request.POST["email"] and request.POST["psw"]:
			# login = Login()
			# user = login.verifyLogin(email=request.POST["email"], pswd=request.POST["psw"] )
			
			#verifica user e seta os cookies nescessários
			if user and user.id:
				#login.setLoginCookies(request=request, user=user)

				if len(request.POST["next"]) > 0:
					return redirect(request.POST["next"])
				else:
					return redirect("/admin/home")
			#else:
			#framework msgs djangos
			messages.error(request, 'Usuario nao encontrado')
		
		return render_to_response("admin/index.html",
			context_instance=RequestContext(request))