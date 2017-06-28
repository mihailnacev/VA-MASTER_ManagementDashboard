from django.conf.urls import url
from . import views

urlpatterns=[
    url(r'^getAllCompanies/$',views.get_all_companies,name='getAllCompanies'),
    url(r'^(?P<company_id>[0-9]+)/getCompany/$',views.get_company,name='getCompany'),
    url(r'^getAllDataCenters/$',views.get_all_dataCenters,name='getAllDataCenters'),
    url(r'^(?P<dataCenter_id>[0-9]+)/getDataCenter/$', views.get_dataCenter, name='getDataCenter'),
    url(r'^getAllVAMasters/$',views.get_all_VAMasters, name='getAllVAMasters'),
]