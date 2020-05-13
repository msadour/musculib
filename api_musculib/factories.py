"""
Factories file.
"""

import factory
from factory.faker import faker

from django.contrib.auth.models import User

from apps.exercice.models import Exercice, Muscle, Declination

FAKE = faker.Faker()


class UserFactory(factory.django.DjangoModelFactory):
    """
    Class UserFactory.
    """

    username = FAKE.email()
    email = FAKE.email()
    password = 'qwertz'

    class Meta:
        model = User


class ExerciceFactory(factory.django.DjangoModelFactory):
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