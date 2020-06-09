from django.db import models
from django.contrib.auth.models import User,Group
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    team_name = models.CharField(max_length=200)
    team_users = models.CharField(max_length=200)
    player_data = models.TextField(default='')
    log_data = models.TextField(default='')
    items_data = models.TextField(default='')
    consumables_data = models.TextField(default='')
    uniq_items_data = models.TextField(default='')
    quests_data = models.TextField(default='')

    def __str__(self):
        return self.user.username
