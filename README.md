
## Front-End Setup instructions

First, clone the repository to your local machine:

```bash
git clone https://github.com/Tanjib-Rafi/Local-Event-Planner
```

change Directory:

```bash
cd Local-Event-Planner
```

Install dependencies::

```bash
npm i
```

Finally, run the development server:

```bash
npm run start
```


## Back-End Setup instructions

First, clone the repository to your local machine:

```bash
cd 
```

Install the requirements:

```bash
pip install -r requirements.txt
```

Apply the migrations:

```bash
python3 manage.py migrate
```

Finally, run the development server:

```bash
python manage.py runserver
```

## Database Setup

In the settings.py make sure database setup for Postgresql is correct:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'local_event_planner',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

```




