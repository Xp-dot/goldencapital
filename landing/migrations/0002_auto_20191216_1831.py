# Generated by Django 3.Raznoe on 2019-12-16 18:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='image',
            field=models.ImageField(default=None, upload_to='media/posts_image/'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='article',
            name='post_date',
            field=models.DateField(blank=True, default=django.utils.timezone.now),
        ),
    ]
