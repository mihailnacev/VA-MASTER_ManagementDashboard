from django.shortcuts import render, redirect
from django.http import Http404
import json
# Create your views here.
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core.urlresolvers import reverse
from django.template import loader
from .models import Company, DataCenter, VAMaster, PublicKey, UserVA, Token, Privileges
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
import uuid

#import rsa
#import Crypto
#from Crypto.Cipher import AES
#from Crypto.Cipher import PKCS1_OAEP
#from Crypto.PublicKey import RSA
#from Crypto.Util import asn1
#from base64 import b64decode
#import sys
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
        company=Company.objects.filter(Name=name)[0]
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
def add_va_master(request, format=None):
    if request.method == 'POST':
        domain=request.POST.get("domain",'')
        url=request.POST.get("url",'')
        ip=request.POST.get("ip",'')
        username=request.POST.get("username",'')
        password=request.POST.get("password",'')
        vpnport=request.POST.get("vpnport",'')
        company=request.POST.get("company",'')
        dataCenter=request.POST.get("dataCenter",'')
        publickey=request.POST.get("publickey",'')
        token=request.POST.get("token",'')
    c=Company.objects.get(Name=company);
    dc=DataCenter.objects.get(Name=dataCenter);
    #with open('rsa.pub', 'r') as pub_file:
    #    pub_key = RSA.importKey(pub_file.read())
    #pkcs1CipherTmp=PKCS1_OAEP.new(pub_key)
    #encrypted=pkcs1CipherTmp.encrypt(password.encode('utf-8')).encode('base64')
    #pub = rsa.PublicKey.load_pkcs1(publickey)
    #crypto = rsa.encrypt(password, pub)
    password=password.replace(" ","+")
    va=VAMaster(Domain=domain, URL=url, InternalIP=ip, Username=username, VPNPort=vpnport, Company=c, DataCenter=dc);
    va.save();
    va=VAMaster.objects.get(Domain=domain)
    user=Token.objects.get(Content=token).User
    privilege_pass=Privileges(Property='Get password', Value=password, User=user, VAMaster=va)
    privilege_pass.save()
    privilege_share=Privileges(Property='Share', Value='1', User=user, VAMaster=va)
    privilege_share.save()
    privilege_delete=Privileges(Property='Delete', Value='1', User=user, VAMaster=va)
    privilege_delete.save()
    return HttpResponse("ADD_VA_MASTER: SUCCESSFUL")
def register(request, format=None):
    if request.method=='POST':
        firstname=request.POST.get("firstname",'')
        lastname=request.POST.get("lastname",'')
        email=request.POST.get("email",'')
        username=request.POST.get("username",'')
        password=request.POST.get("password",'')
        publickey=request.POST.get("publickey",'')
    if len(publickey)<300:
        publickey_part_one=publickey[:27]
        publickey_part_two=publickey[27:255].replace(" ","+")
        publickey_part_two= publickey_part_two.replace("\t","+")
        publickey_part_three = publickey_part_two.replace(" ", "+")
        publickey_part_three=publickey[255:]
        publickey=publickey_part_one+publickey_part_two+publickey_part_three
    else:
        publickey_part_one = publickey[:27]
        publickey_part_two = publickey[27:432].replace(" ", "+")
        publickey_part_two = publickey_part_two.replace("\t", "+")
        publickey_part_three = publickey_part_two.replace(" ", "+")
        publickey_part_three = publickey[432:]
        publickey = publickey_part_one + publickey_part_two + publickey_part_three
    password=password.replace(" ","+")
    hashpass = make_password(password, None, 'default')
    pk=PublicKey(Content=publickey)
    pk.save()
    user=UserVA(FirstName=firstname, LastName=lastname, Email=email, Username=username, Password=hashpass, PublicKey=pk)
    user.save()
    return HttpResponse("REGISTER_USER: SUCCESSFUL")
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
    #data=serializers.serialize('json', VAMaster.objects.all().select_related('Company'))
    #return HttpResponse(data,content_type='application/json')
    data_json=[]
    for va in VAMaster.objects.all():
        #data_json.append(json.dumps(va.to_json()))
        response_record={}
        response_record['Domain']=va.Domain
        response_record['URL']=va.URL
        response_record['InternalIP']=va.InternalIP
        response_record['Username']=va.Username
        #response_record['Password']=va.Password
        response_record['VPNPort']=va.VPNPort
        if va.Company is not None:
            response_record['Company']="Name: "+va.Company.Name
        if va.DataCenter is not None:
            response_record['DataCenter']="Name: "+va.DataCenter.Name
        data_json.append(response_record)
    data = json.dumps(data_json)
    return HttpResponse(data, 'application/json')
def sign_in(request):
    uname=request.GET.get('username', '')
    password=request.GET.get('password', '')
    user=UserVA.objects.filter(Username=uname)
    if not user:
        return HttpResponse("Unsuccessful_sign_in")
    else:
        found=user[0]
        if check_password(password, found.Password):
            token=str(uuid.uuid4())
            tokenSave=Token(Content=token, User=user[0])
            tokenSave.save()
            return HttpResponse(tokenSave.Content)
        else:
            return HttpResponse("Unsuccessful_sign_in")
def delete_token(request):
    content=request.POST.get("content",'')
    token=Token.objects.get(Content=content)
    token.delete()
    return HttpResponse("DELETE_TOKEN: SUCCESSFUL")
def get_username_per_token(request):
    value=request.GET.get("token")
    token=Token.objects.get(Content=value)
    return HttpResponse(token.User.Username)
def get_password(request):
    uname=request.GET.get('username', '')
    user=UserVA.objects.filter(Username=uname)[0]
    return HttpResponse(user.Password)
def get_public_key(request):
    uname = request.GET.get('username', '')
    user = UserVA.objects.get(Username=uname)
    return HttpResponse(user.PublicKey.Content)
def get_va_password(request):
    token=request.GET.get('token', '')
    domain=request.GET.get('domain', '')
    user=Token.objects.filter(Content=token)[0].User
    va=VAMaster.objects.filter(Domain=domain)[0]
    zapis=Privileges.objects.filter(VAMaster=va).filter(User=user).filter(Property='Get password')
    if not zapis:
        return HttpResponse("NOT")
    else:
        return HttpResponse(zapis[0].Value)
def get_va_password_delete(request):
    token=request.GET.get('token', '')
    domain=request.GET.get('domain', '')
    user=Token.objects.filter(Content=token)[0].User
    va=VAMaster.objects.filter(Domain=domain)[0]
    zapis=Privileges.objects.filter(VAMaster=va).filter(User=user).filter(Property='Delete')
    zapis_password=Privileges.objects.filter(VAMaster=va).filter(User=user).filter(Property='Get password')
    if not zapis:
        return HttpResponse("NOT")
    else:
        return HttpResponse(zapis_password[0].Value)
def get_va_password_share(request):
    token=request.GET.get('token', '')
    domain=request.GET.get('domain', '')
    user=Token.objects.filter(Content=token)[0].User
    va=VAMaster.objects.filter(Domain=domain)[0]
    zapis_share=Privileges.objects.filter(VAMaster=va).filter(User=user).filter(Property='Share')
    zapis_password=Privileges.objects.filter(VAMaster=va).filter(User=user).filter(Property='Get password')
    if not zapis_share:
        return HttpResponse("NOT")
    else:
        return HttpResponse(zapis_password[0].Value)
def get_all_users(request):
    data_json=[]
    users=UserVA.objects.all()
    for user in users:
        response_record={}
        response_record['value']=user.Username
        data_json.append(response_record)
    data = json.dumps(data_json)
    return HttpResponse(data, 'application/json')
def share(request):
    if request.method=='POST':
        username=request.POST.get("username",'')
        password=request.POST.get("password",'')
        domain=request.POST.get("domain",'')
    password=password.replace(" ","+")
    va=VAMaster.objects.filter(Domain=domain)[0]
    user=UserVA.objects.filter(Username=username)[0]
    privilege_pass=Privileges(Property='Get password', Value=password, User=user, VAMaster=va)
    privilege_pass.save()
    privilege_share=Privileges(Property='Share', Value='1', User=user, VAMaster=va)
    privilege_share.save()
    privilege_delete=Privileges(Property='Delete', Value='1', User=user, VAMaster=va)
    privilege_delete.save()
    return HttpResponse("SHARE: SUCCESSFUL")




