"""
Command for init the databases.
"""
import json

from django.core.management.base import BaseCommand

from musculib.settings import BASE_DIR
from api_musculib.models import Declination, Muscle, Exercice, Customer


class Command(BaseCommand):
    """
    Class command.
    """

    help = "Init database"

    def handle(self, *args, **options):
        """
        Execute the command that create book(s).
        """

        datas_files = BASE_DIR + "/musculib/datas/exercices.json"

        Declination.objects.all().delete()
        Muscle.objects.all().delete()
        Exercice.objects.all().delete()
        Customer.objects.all().delete()

        with open(datas_files) as json_file:
            datas_list = json.load(json_file)

            for declination, exercices_by_muscle in datas_list.items():
                declination_obj, _ = Declination.objects.get_or_create(name=declination)
                for muscle, exercices in exercices_by_muscle.items():
                    muscle_obj, _ = Muscle.objects.get_or_create(name=muscle)
                    for exercice in exercices:
                        new_exercice_obj = Exercice(
                            name=exercice["name"],
                            photo=exercice["photo"],
                            main_muscle_worked=muscle_obj,
                            declination=declination_obj,
                            description=exercice["description"],
                        )
                        new_exercice_obj.save()
                        for others_muscles_worked in exercice["others_muscles_worked"]:
                            others_muscles_worked_obj, _ = Muscle.objects.get_or_create(
                                name=others_muscles_worked
                            )
                            new_exercice_obj.others_muscles_worked.add(
                                others_muscles_worked_obj.id
                            )
        self.stdout.write("The database has been (re)initlialize.")
