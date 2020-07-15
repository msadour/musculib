# -*- coding: utf-8 -*-
"""
Views.
"""


from __future__ import unicode_literals

from typing import Any

from django.contrib.auth import logout as django_logout

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
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
    CustomerSerializer,
    MuscleSerializer,
    DeclinationSerializer,
    AuthTokenSerializer,
)
from .permissions import ActionsAllowed


class ExerciseViewSet(viewsets.ModelViewSet):
    """
    Class ExerciceViewSet
    """

    queryset = Exercice.objects.all()
    serializer_class = ExerciceSerializer
    permission_classes = (ActionsAllowed,)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        List of exercises.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        if request.query_params:
            search = request.query_params
            self.queryset = self.queryset.filter(Q(name__icontains=search["search"]))
            serializer = ExerciceSerializer(self.queryset, many=True)
            return Response(serializer.data, status=200)
        return super().list(request, *args, **kwargs)


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


class CustomerViewSet(viewsets.ModelViewSet):
    """
    Class UserViewSet
    """

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

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
        new_customer = Customer.objects.create_user(**datas)

        serializer = CustomerSerializer(new_customer, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
        """Update a member.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            kwargs: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        customer = Customer.objects.get(id=pk)
        for attr, value in datas.items():
            if attr == "password":
                customer.set_password(value)
            elif attr == "email":
                customer.email = datas["email"]
                customer.username = datas["email"]
            elif attr == "add_exercise":
                exercise = Exercice.objects.get(id=value)
                customer.favorite_exercice.add(exercise)
            elif attr == "remove_exercise":
                exercise = Exercice.objects.get(id=value)
                customer.favorite_exercice.remove(exercise)
            else:
                setattr(customer, attr, value)
        customer.save()
        serializer = CustomerSerializer(customer)

        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes((permissions.AllowAny,))
class CustomAuthToken(ObtainAuthToken):
    authentication_classes = [TokenAuthentication]

    def post(self, request: Request, *args: Any, **kwargs: Any):

        serializer = AuthTokenSerializer()

        try:
            user = serializer.validate(attrs=request.data)
        except Exception:
            return Response({"message": "Unable to authenticate with provided credentials", "status": 404}, status=404)

        request.user = user

        token, created = Token.objects.get_or_create(user=user)

        return Response(
            {
                "token": token.key,
                "username": user.username,
                "customer_id": user.id,
            }
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
