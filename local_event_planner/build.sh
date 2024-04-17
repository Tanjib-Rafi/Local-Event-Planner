#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt
pip install djangorestframework

python manage.py migrate
