from django.shortcuts import render
from django.http import Http404
import json
# Create your views here.
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core.urlresolvers import reverse
from django.template import loader
from .models import Company, DataCenter, VAMaster
from django.core import serializers
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_all_companies(request):
    # data=serializers.serialize('json',Company.objects.all())
    # data= json.dumps(Company.objects.all())
    data_json=[]
    for company in Company.objects.all():
        data_json.append(json.dumps(company.to_json()))
    data = json.dumps(data_json)
    resp = JsonResponse(data, safe=False)
    resp['Access-Control-Allow-Origin']= '*'
    return resp
    # return JsonResponse(data, safe=False)
    # return HttpResponse(data, content_type='application/json')

def get_company(request,company_id):
    company =  Company.objects.get(pk=company_id).to_json()
    company = json.dumps(company)
    return JsonResponse(company, safe=False)
    # return HttpResponse(Company.objects.get(pk=1))
def get_all_dataCenters(request):
    data=serializers.serialize('json',DataCenter.objects.all())
    return JsonResponse(data,safe=False)
def get_dataCenter(request,dataCenter_id):
   # data=serializers.serialize('json', [DataCenter.objects.get(pk=dataCenter_id)])
   dataCenter= DataCenter.objects.get(pk=dataCenter_id).to_json()
   dataCenter= json.dumps(dataCenter)
   return JsonResponse(dataCenter, safe=False)
def get_all_VAMasters(request):
    data=serializers.serialize('json', VAMaster.objects.select_related().all())
    return JsonResponse(data,safe=False)