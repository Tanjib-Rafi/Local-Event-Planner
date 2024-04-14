from rest_framework import generics
from .models import Event
from .serializers import EventSerializer
from django.db.models import F, FloatField
from django.db.models.functions import Sqrt, Cast


class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class NearestEventsList(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        longitude = float(self.request.query_params.get('longitude'))
        latitude = float(self.request.query_params.get('latitude'))
        current_event_id = self.kwargs['id']

        distance_expression = Sqrt((F('longitude') - longitude) ** 2 + (F('latitude') - latitude) ** 2)
        distance_expression = Cast(distance_expression, output_field=FloatField())

        nearest_events = Event.objects.exclude(id=current_event_id).annotate(distance=distance_expression).order_by('distance')[:3]

        return nearest_events