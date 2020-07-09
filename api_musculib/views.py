# -*- coding: utf-8 -*-
"""
Views.
"""


from __future__ import unicode_literals

from typing import Any

from django.contrib.auth import logout as django_logout

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, permissions, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import permission_classes
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token


from .models import Exercice, Customer, Muscle, Declination
from .serializers import (
    ExerciceSerializer,
    UserSerializer,
    MuscleSerializer,
    DeclinationSerializer,
    AuthTokenSerializer,
)
from .permissions import ActionsAllowed


class ExerciceViewSet(viewsets.ModelViewSet):
    """
    Class ExerciceViewSet
    """

    queryset = Exercice.objects.all()
    serializer_class = ExerciceSerializer
    permission_classes = (ActionsAllowed,)


class MuscleViewSet(viewsets.ModelViewSet):
    """
    Class MuscleViewSet
    """

    queryset = Muscle.objects.all()
    serializer_class = MuscleSerializer
    permission_classes = (ActionsAllowed,)


class DeclinationViewSet(viewsets.ModelViewSet):
    """
    Class ExerciceViewSet
    """

    queryset = Declination.objects.all()
    serializer_class = DeclinationSerializer
    permission_classes = (ActionsAllowed,)


class UserViewSet(viewsets.ModelViewSet):
    """
    Class UserViewSet
    """

    queryset = Customer.objects.all()
    serializer_class = UserSerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a member.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        new_member = Customer.objects.create_user(**datas)

        serializer = UserSerializer(new_member, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@permission_classes((permissions.AllowAny,))
class CustomAuthToken(ObtainAuthToken):
    authentication_classes = [TokenAuthentication]

    def post(self, request: Request, *args: Any, **kwargs: Any):

        serializer = AuthTokenSerializer()
        user = serializer.validate(attrs=request.data)

        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "username": user.username, "member_id": user.id}
        )


@permission_classes((permissions.AllowAny,))
class LogoutViewSet(viewsets.ViewSet):
    def create(self, request: Request, *args: Any, **kwargs: Any):
        return self.logout(request)

    def logout(self, request: Request):

        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass
        if getattr(settings, "REST_SESSION_LOGIN", True):
            django_logout(request)

        response = Response(
            {"detail": "Successfully logged out."}, status=status.HTTP_200_OK
        )

        return response
