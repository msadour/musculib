# Generated by Django 3.0.7 on 2020-07-15 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_musculib', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='city',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='customer',
            name='country',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
