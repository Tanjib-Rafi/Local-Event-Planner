## Key Features

- **Token-based Authentication**: Utilizes JWT (JSON Web Tokens) for secure authentication, with user tokens stored locally in the browser's localStorage

- **Restricted Access**: Only authenticated users are permitted to create events and view the Dahsboard

- **Validate Date**: User cannot choose past date/time from the calender to create event

- **Redux State Management**: Implements Redux for efficient state management

- **Search/Filter**: Supports search/filter based on event name, location and time range 

- **Django REST Framework Backend**: Django REST Framework on the backend to provide API endpoints

- **Satellite and Normal Map Views**: Offers users the option to view event locations in both satellite and normal map views with fullscreen view

- **Nearby Events**: Show nearby events


## Front-End Setup instructions (React Js)

First, clone the repository to your local machine:

```bash
git clone https://github.com/Tanjib-Rafi/Local-Event-Planner
```

Change Directory:

```bash
cd Local-Event-Planner/
```

Install dependencies::

```bash
npm i
```

Finally, run the development server:

```bash
npm run start
```

Note:

For Location Autocomplete Suggestion I used LocationIq api:
```bash
https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${searchQuery}&limit=5&format=json
```
Replace apiKey with your actual API key.



## Back-End Setup instructions (Django Rest Framework)

Change Directory

```bash
cd local_event_planner/
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
python manage.py runserver 8001
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

## Screenshots

![Home](https://github.com/Tanjib-Rafi/Local-Event-Planner/assets/68615390/07165304-198e-4197-8815-82cf0f3e94e5)

![localhost_3000_event_1](https://github.com/Tanjib-Rafi/Local-Event-Planner/assets/68615390/b1722aa1-fac1-41e7-8b47-946f92f5c148)

![autosuggest](https://github.com/Tanjib-Rafi/Local-Event-Planner/assets/68615390/813bb850-64f8-4b46-bdd5-579891ab80ff)

![satellite](https://github.com/Tanjib-Rafi/Local-Event-Planner/assets/68615390/6811f530-ee73-48b3-ac77-dc9dc8492829)

![full](https://github.com/Tanjib-Rafi/Local-Event-Planner/assets/68615390/78f9f76c-e01c-4f4e-8bc2-565224f6a2a8)

![signup](https://github.com/Tanjib-Rafi/Local-Event-Planner/assets/68615390/f7f6f33b-7a77-4001-88d1-c3d708d7ad07)

![login](https://github.com/Tanjib-Rafi/Local-Event-Planner/assets/68615390/10704527-b25c-4162-b7fa-e6211710604d)















