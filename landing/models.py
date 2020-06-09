from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.core.cache import cache
from django.dispatch import receiver

SHORT_TEXT_LEN = 200

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    image = models.ImageField(upload_to ='media/posts_image/', max_length=100)
    post_date = models.DateField(default=timezone.now,blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'

    def __str__(self):
        return self.title

    def get_short_text(self):
        if len(self.text) > SHORT_TEXT_LEN:
            return self.text[:SHORT_TEXT_LEN]+"..."
        else:
            return self.text

class Actual_News(models.Model):
    title = models.CharField(max_length=200)
    link = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Актуальное событие'
        verbose_name_plural = 'Актуальные события'
    def __str__(self):
        return self.title

@receiver(post_save, sender=Actual_News)
def actual_news_added(sender, instance, created, **kwargs):
    print('Recieve message to save')
    if created:
        cache.delete('last-news-cache')