"""
Command for init the databases.
"""
import json

from django.core.management.base import BaseCommand

from musculib_API.settings import BASE_DIR
from apps.exercice.models import Declination, Muscle, Exercice


class Command(BaseCommand):
    """
    Class command.
    """

    help = "Delete database"

    def handle(self, *args, **options):
        """
        Execute the command that create book(s).
        """

        Declination.objects.all().delete()
        Muscle.objects.all().delete()
        Exercice.objects.all().delete()

        self.stdout.write("Datas are deleted.")
