from django.db import models

# Create your models here.
class LuckyWheelField(models.Model):
    title = models.CharField(max_length=200)
    probability = models.TextField(default='')

