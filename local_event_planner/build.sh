#!/usr/bin/env bash
# exit on error
set -o errexit

source venv/bin/activate

pip install -r requirements.txt

pip install djangorestframework

pip install djangorestframework-simplejwt

pip3 install djangorestframework-corsheaders

python manage.py migrate
