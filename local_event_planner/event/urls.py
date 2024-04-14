from django.urls import path
from .views import EventListCreate, EventRetrieveUpdateDestroy, NearestEventsList

urlpatterns = [
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroy.as_view(), name='event-detail'),
    path('nearest-events/<int:id>/', NearestEventsList.as_view(), name='nearest_events_list'),

]
