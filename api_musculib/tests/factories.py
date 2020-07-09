"""
Factories file.
"""

import factory
from factory.faker import faker


from api_musculib.models import Exercice, Muscle, Declination

FAKE = faker.Faker()


class ExerciseFactory(factory.django.DjangoModelFactory):
    """
    Class ExerciceFactory.
    """

    class Meta:
        model = Exercice


class MuscleFactory(factory.django.DjangoModelFactory):
    """
    Class CategoryFactory.
    """

    class Meta:
        model = Muscle


class DeclinationFactory(factory.django.DjangoModelFactory):
    """
    Class DeclinationFactory.
    """

    class Meta:
        model = Declination
