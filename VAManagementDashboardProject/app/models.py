# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.validators import RegexValidator
from django import forms
# Create your models here.


class Company(models.Model):
    class Meta:
        verbose_name='Company'
        verbose_name_plural='Companies'

    Name=models.CharField(max_length=50)
    Description=models.CharField(max_length=200)
    Address=models.CharField(max_length=150)
    ContactPerson=models.CharField(max_length=100)
    ContactEmail=models.EmailField()
    ContactNumber=models.CharField(
        max_length=9,
        blank=True,
        validators=[
            RegexValidator(
                regex='07(0|1|2|5|6|7|8)\d{6}',
                message='Not valid format',
                code='invalid_ContactNumber'
            ),
        ]
    )

    def __repr__(self):
        return "Name: %s, Address: %s" %(self.Name, self.Address)

    def __str__(self):
        return "Name: %s, Address: %s" % (self.Name, self.Address)

    def to_json(self):
        json_data = {
            "Name" : self.Name,
            "Description": self.Description,
            "Address": self.Description,
            "ContactPerson": self.ContactPerson,
            "ContactEmail": self.ContactEmail,
            "ContactNumber": self.ContactNumber,
        }
        return json_data

#kobjekt.__dict__
class DataCenter(models.Model):
    Name=models.CharField(max_length=100)
    Description=models.CharField(max_length=200)
    KNET_ENUM=0
    BALKANTEL_ENUM=1
    CUSTOMER_ENUM=2
    Locations=['Knet','Balkantel','Customer']
    LOCATION_CHOICES=(
        (KNET_ENUM,'Knet'),
        (BALKANTEL_ENUM,'Balkantel'),
        (CUSTOMER_ENUM,'Customer'),
    )
    LOCATION_CHOICES_CHAR=(
	    ('Knet','Knet'),
        ('Balkantel', 'Balkantel'),
        ('Customer', 'Customer'),
	)
    #Location=models.SmallIntegerField(choices=LOCATION_CHOICES)
    Location=models.CharField(max_length=30, choices=LOCATION_CHOICES_CHAR)
    URL=models.URLField()
    VM_ENUM=0
    CUSTOMER_ENUM_ONE=1
    LXC_ENUM=2
    Types=['VM', 'Customer', 'LXC']
    TYPE_CHOICES=(
        (VM_ENUM,'VM'),
        (CUSTOMER_ENUM_ONE,'Customer'),
        (LXC_ENUM,'LXC'),
    )
    TYPE_CHOICES_CHAR=(
	    ('VM', 'VM'),
        ('Customer', 'Customer'),
        ('LXC', 'LXC'),
	)
    #Type=models.SmallIntegerField(choices=TYPE_CHOICES)
    Type=models.CharField(max_length=30, choices=TYPE_CHOICES_CHAR)

    def __str__(self):
        return "Name: %s, Location: %s, URL: %s, Type; %s" %(self.Name,self.Location,self.URL,self.Type)

    def __repr__(self):
        return "Name: %s, Location: %s, URL: %s, Type; %s" % (self.Name, self.Location, self.URL, self.Type)

    def to_json(self):
        json_data={
          'Name': self.Name,
          'Description': self.Description,
          'Location': self.Locations[int(self.Location)],
          'URL': self.URL,
          'Type': self.Types[self.Type],
        };
        return json_data


class VAMaster(models.Model):
    Domain=models.CharField(
        max_length=100,
        blank=True,
        validators=[
            RegexValidator(
                regex='^[a-z0-9]+(\.[a-z0-9]+)+$',
                message='Not valid format',
                code='invalid_Domain'
            ),
        ]
    )
    URL=models.URLField()
    InternalIP=models.GenericIPAddressField()
    Username=models.CharField(max_length=100)
    Password = models.CharField(max_length=400,null=True)
    VPNPort=models.IntegerField()
    #Company=models.OneToOneField(Company,null=True,on_delete=models.SET_NULL)
    Company=models.ForeignKey('Company',null=True,on_delete=models.SET_NULL)
    DataCenter=models.ForeignKey('DataCenter',null=True)
	
    def to_json(self):
        return {
            "Domain": self.Domain,
            "URL": self.URL,
            "InternalIP": self.InternalIP,
            "Username": self.Username,
            "Password": self.Password,
            "VPNPort": self.VPNPort,
            "Company":self.Company.Name,
            "DataCenter": self.DataCenter.Name
        }
		
class UserVA(models.Model):
    FirstName=models.CharField(max_length=50)
    LastName=models.CharField(max_length=50)
    Email=models.EmailField()
    Username=models.CharField(max_length=50)
    Password=models.CharField(max_length=300)
    PublicKey=models.OneToOneField('PublicKey',null=True, on_delete=models.SET_NULL)

class PublicKey(models.Model):
    Content=models.CharField(max_length=500)

class Token(models.Model):
    Content=models.CharField(max_length=500)
    User=models.OneToOneField('UserVA',null=True, on_delete=models.SET_NULL)