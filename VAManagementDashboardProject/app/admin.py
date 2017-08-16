# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Company, DataCenter, VAMaster, UserVA
# Register your models here.
class VAMasterInline(admin.TabularInline):
    model=VAMaster
    extra=1

class DataCenterInline(admin.TabularInline):
    model=DataCenter
    extra=1

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('Name','Description','Address','ContactPerson','ContactEmail','ContactNumber')
    search_fields = ['Name']
    list_filter = ['Name','Address']
    inlines = [VAMasterInline]

class VAMasterAdmin(admin.ModelAdmin):
    list_display = ('Domain','URL','InternalIP','Username', 'VPNPort', 'Company', 'DataCenter')
    list_filter=['Domain','URL','InternalIP']

class DataCenterAdmin(admin.ModelAdmin):
    list_display = ('Name','Description','Location','URL','Type')
    search_fields = ['Name']
    list_filter = ['Name','Location','Type']
    inlines = [VAMasterInline]
class UserVAAdmin(admin.ModelAdmin):
    list_display = ('FirstName','LastName','Email','Username','Password')

admin.site.register(Company,CompanyAdmin)
admin.site.register(DataCenter, DataCenterAdmin)
admin.site.register(VAMaster,VAMasterAdmin)
admin.site.register(UserVA,UserVAAdmin)

