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

## Run server: 
  > manage.py runserver
