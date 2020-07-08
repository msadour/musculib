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
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token


from .models import Exercice, User, Muscle, Declination
from .serializers import ExerciceSerializer, UserSerializer, MuscleSerializer, DeclinationSerializer, \
    AuthTokenSerializer
from .classes import SearchCache
from .permissions import ActionsAllowed

searching = SearchCache()


class ExerciceViewSet(viewsets.ModelViewSet):
    """
    Class ExerciceViewSet
    """

    queryset = Exercice.objects.all()
    serializer_class = ExerciceSerializer


class MuscleViewSet(viewsets.ModelViewSet):
    """
    Class MuscleViewSet
    """

    queryset = Muscle.objects.all()
    serializer_class = MuscleSerializer

    permission_classes = (ActionsAllowed, )
    authentication_classes = (TokenAuthentication,)


class DeclinationViewSet(viewsets.ModelViewSet):
    """
    Class ExerciceViewSet
    """

    queryset = Declination.objects.all()
    serializer_class = DeclinationSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    Class UserViewSet
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


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