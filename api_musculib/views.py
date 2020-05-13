# -*- coding: utf-8 -*-
"""
Views.
"""


from __future__ import unicode_literals

from django.contrib.auth import (
    logout as django_logout
)

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, permissions, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.http import JsonResponse


from .models import Exercice, User, Muscle, Declination
from .serializers import ExerciceSerializer, UserSerializer, MuscleSerializer, DeclinationSerializer, \
    AuthTokenSerializer
from .classes import SearchCache
from .permissions import ActionsAllowed

searching = SearchCache()


class ExerciceViewSet(viewsets.ViewSet):
    """
    Class ExerciceViewSet
    """

    permission_classes = (ActionsAllowed, )
    authentication_classes = (TokenAuthentication,)

    def list(self, request, *args, **kwargs):
        exercices = Exercice.objects.all()
        serializer = ExerciceSerializer(exercices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        exercice = Exercice.objects.get(id=pk)
        serializer = ExerciceSerializer(exercice, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MuscleViewSet(viewsets.ViewSet):
    """
    Class MuscleViewSet
    """

    permission_classes = (ActionsAllowed, )
    authentication_classes = (TokenAuthentication,)

    def list(self, request, *args, **kwargs):
        muscles = Muscle.objects.all()
        serializer = MuscleSerializer(muscles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        muscle = Muscle.objects.get(id=pk)
        serializer = MuscleSerializer(muscle, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeclinationViewSet(viewsets.ViewSet):
    """
    Class ExerciceViewSet
    """

    def list(self, request, *args, **kwargs):
        declinations = Declination.objects.all()
        serializer = DeclinationSerializer(declinations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        declination = Declination.objects.get(id=pk)
        serializer = DeclinationSerializer(declination, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet):
    """
    Class UserViewSet
    """

    def create(self, request, *args, **kwargs):
        datas = request.data
        user = User.objects.create(**datas)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk=None):
        data = request.data
        user = User.objects.get(id=pk)
        for attr, value in data.items():
            if attr == "add_favorite_exercice":
                exercice = Exercice.objects.get(id=value)
                user.favorite_exercice.add(exercice)
            elif attr == "delete_favorite_exercice":
                exercice = Exercice.objects.get(id=value)
                user.favorite_exercice.remove(exercice)
            else:
                setattr(user, attr, value)
        user.save()
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, pk=None, *args, **kwargs):
        user = User.objects.get(id=pk)
        user.favorite_exercice.clear()
        user.delete()

        return Response(status=status.HTTP_200_OK)


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = [TokenAuthentication]

    def create(self, request, *args, **kwargs):

        serializer = AuthTokenSerializer()
        user = serializer.validate(attrs=request.data)

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'member_id': user.id
        })


@permission_classes((permissions.AllowAny,))
class LogoutViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        return self.logout(request)

    def logout(self, request):

        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass
        if getattr(settings, 'REST_SESSION_LOGIN', True):
            django_logout(request)

        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)

        return response