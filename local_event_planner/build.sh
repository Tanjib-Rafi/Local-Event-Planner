#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

pip install djangorestframework

pip install djangorestframework-simplejwt

pip install django-cors-headers

python manage.py migrate
