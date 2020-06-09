from django.contrib import admin
from .models import *

# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    list_display=('user', 'team_name', 'team_users', 'player_data', 'items_data', 'uniq_items_data', 'consumables_data', 'log_data',  'quests_data')
    search_fields = ['user__username', 'team_name', 'player_data', 'team_users', 'items_data', 'uniq_items_data', 'consumables_data', 'log_data',  'quests_data']

admin.site.register(UserProfile,UserProfileAdmin)
