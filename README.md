# VA-MASTER Management Dashboard

VA-Master
* Company [MODEL_FK]
* Domain (мора да има va.com.mk)
* URL
* Internal IP
* Username
* Password
* VPN Port [integer]
* DataCenter [MODEL_FK]

DataCenter
* Name
* Description
* Location [KNet, Balkantel, Customer]
* URL (https:// )
* Type [VM, Customer]

Company
* Name
* Description
* Address
* Contact person
* Contact e-mail
* Contact number

### Dependencies:
  > pip install django
  > pip install djangorestframework
  > pip install django-cors-headers
  > pip install django-oauth-toolkit
  > pip install pycrypto

### Run server: 
  > manage.py runserver
  
