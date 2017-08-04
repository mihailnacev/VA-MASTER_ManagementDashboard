from django.shortcuts import render, redirect
from django.http import Http404
import json
# Create your views here.
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core.urlresolvers import reverse
from django.template import loader
from .models import Company, DataCenter, VAMaster
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm

def signup(request):
    return render(request,'app/signup.html')
def react(request):
    return render(request, 'app/index.html')
def get_all_companies(request):
    data=serializers.serialize('json',Company.objects.all())
    #return JsonResponse(data,safe=False)
    return HttpResponse(data,content_type='application/json');
#@api_view(['POST'])
#@parser_classes((JSONParser,))
def delete_company(request, format=None):
    if request.method == 'POST':
        name=request.POST.get("name",'')
        company=Company.objects.get(Name=name)
    company.delete()
    return HttpResponse("DELETE_COMPANY: SUCCESSFUL")
    #return HttpResponse(request.data)
def delete_data_center(request,format=None):
    if request.method == 'POST':
        name=request.POST.get("name",'')
    dataCenter=DataCenter.objects.get(Name=name)
    dataCenter.delete()
    return HttpResponse("DELETE_DATA_CENTER: SUCCESSFUL")
def delete_va_master(request, format=None):
    if request.method == 'POST':
        domain=request.POST.get("domain",'')
    vaMaster=VAMaster.objects.get(Domain=domain)
    vaMaster.delete()
    return HttpResponse("DELETE_VA_MASTER: SUCCESSFUL")
def get_company(request,company_id):
    company =  Company.objects.get(pk=company_id).to_json()
    company = json.dumps(company)
    # return JsonResponse(company, safe=False)
    return HttpResponse(company, content_type='application/json');
def get_all_dataCenters(request):
    data=serializers.serialize('json',DataCenter.objects.all())
    return HttpResponse(data,content_type='application/json');
    # return JsonResponse(data,safe=False)
def get_dataCenter(request,dataCenter_id):
   # data=serializers.serialize('json', [DataCenter.objects.get(pk=dataCenter_id)])
   dataCenter= DataCenter.objects.get(pk=dataCenter_id).to_json()
   dataCenter= json.dumps(dataCenter)
   return JsonResponse(dataCenter, safe=False)
def get_all_VAMasters(request):
    data=serializers.serialize('json', VAMaster.objects.all().select_related('Company'))
    return HttpResponse(data,content_type='application/json')
