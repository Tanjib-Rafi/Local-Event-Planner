from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField(blank=True, null=True)
    location = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=12, decimal_places=9, blank=True, null=True)
    longitude = models.DecimalField(max_digits=12, decimal_places=9, blank=True, null=True)

    def __str__(self):
        return self.title

