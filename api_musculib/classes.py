"""
Contain the class 'Search' used by the views to do a search.
"""
import requests
import random

from django.core.cache import cache
from django.db.models import Q

from .models import Muscle, Declination, Exercice
from .serializers import ExerciceSerializer


class SearchCache:
    """
    Class Search.
    """

    @staticmethod
    def get_objects(tag):
        """
        This method return the list of name of Muscle, declination and exercice.
        :param tag: name of the classes at plural
        :return: queryset.
        """

        if tag not in cache.__dict__.keys():
            if tag == 'muscles':
                query = [muscle.name for muscle in Muscle.objects.all()]
            elif tag == 'declinations':
                query = [declination.name for declination in Declination.objects.all()]
            else:
                query = [exercice.name for exercice in Exercice.objects.all()]
            cache.__dict__[tag] = query
        else:
            query = cache.__dict__[tag]

        return query

    def get_serializer(self, views, url_name):
        """
        This method provide a serializer by searching queryset in cache.
        :param views: Viewset object
        :param url_name:
        :return: serializer.
        """

        url_unique = url_name

        if 'id' in views.kwargs:
            url_unique += ':' + str(views.kwargs.get('id'))
        elif 'name' in views.kwargs:
            url_unique += ':' + views.kwargs.get('name')
        elif 'muscle' in views.kwargs:
            url_unique += ':' + views.kwargs.get('muscle')
        elif 'muscle_using' in views.kwargs:
            url_unique += ':' + views.kwargs.get('muscle_using')
        elif 'declinaison' in views.kwargs:
            url_unique += ':' + views.kwargs.get('declinaison')

        if url_unique not in cache.__dict__.keys():
            if url_name == 'exercice' or url_name == 'exercice-id':
                id = views.kwargs.get('id')

                query_exercice =  Exercice.objects.get(id=id)
                many = False

            elif url_name == 'exercices':
                query_exercice = Exercice.objects.all().order_by('main_muscle_worked', 'declination')
                many = True

            elif url_name == 'exercice-name':
                name = views.kwargs.get('name')
                query_exercice = Exercice.objects.get(name__iexact=name)
                many = False

            elif url_name == 'exercices-muscle':
                muscle = views.kwargs.get('muscle')
                query_exercice = Exercice.objects.filter(main_muscle_worked__name=muscle)\
                    .order_by('main_muscle_worked', 'declination')
                many = True

            elif url_name == 'exercice-using':
                muscle_using = Muscle.objects.get(name=views.kwargs.get('muscle_using'))
                query_exercice = Exercice.objects.filter(
                    Q(main_muscle_worked__name=muscle_using.name)
                    | Q(others_muscles_worked=muscle_using)).distinct()
                many = True

            elif url_name == 'random':
                query_exercice = Exercice.objects.order_by('?').first()
                many = False

            else:
                declination = views.kwargs.get('declinaison')
                query_exercice = Exercice.objects.filter(declination__name=declination).order_by('main_muscle_worked')
                many = True

            cache.__dict__[url_unique] = {'query_exercice': query_exercice, 'many': many}
        else:
            query_exercice = cache.__dict__[url_unique]['query_exercice']
            many = cache.__dict__[url_unique]['many']

        return ExerciceSerializer(query_exercice, many=many)

    def search(self, url):
        """
        This method search exercices by a given an URL.
        :param url:
        :return: response.
        """

        if url not in cache.__dict__.keys():
            response = requests.get(url).json
            cache.__dict__[url] = response
        else:
            response = cache.__dict__[url]

        return response
