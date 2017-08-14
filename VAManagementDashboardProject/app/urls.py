# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url
from . import views

urlpatterns=[

    url(r'^login/$', views.sign_in, name='login'),
    url(r'^register/$', views.register, name='register'),
    url(r'^getPassword/$', views.get_password, name='getPassword'),
    url(r'^getPublicKey/$', views.get_public_key, name='getPublicKey'),
	url(r'^getAllCompanies/$',views.get_all_companies,name='getAllCompanies'),
    url(r'^deleteCompany/$', views.delete_company, name='deleteCompany'),
    url(r'^deleteToken/$', views.delete_token, name='deleteToken'),
    url(r'^getUsername/$', views.get_username_per_token, name='getUsername'),
    url(r'^deleteDataCenter/$', views.delete_data_center, name='deleteDataCenter'),
    url(r'^deleteVAMaster/$', views.delete_va_master, name='deleteVAMaster'),
	url(r'^addVAMaster/$', views.add_va_master, name='addVAMaster'),
    url(r'^(?P<company_id>[0-9]+)/getCompany/$',views.get_company,name='getCompany'),
    url(r'^getAllDataCenters/$',views.get_all_dataCenters,name='getAllDataCenters'),
    url(r'^(?P<dataCenter_id>[0-9]+)/getDataCenter/$', views.get_dataCenter, name='getDataCenter'),
    url(r'^getAllVAMasters/$',views.get_all_VAMasters, name='getAllVAMasters'),
]
