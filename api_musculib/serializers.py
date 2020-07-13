"""
Serializers file.
"""
from typing import Dict

from django.contrib.auth.hashers import check_password
from rest_framework import serializers

from .models import Exercice, Customer, Muscle, Declination


class MuscleNameSerializer(serializers.ModelSerializer):
    """
    Class MuscleNameSerializer
    """

    class Meta:
        """
        Class Meta
        """

        model = Muscle
        fields = ("id", "name")


class ExerciceSerializer(serializers.ModelSerializer):
    """
    Class who serialize one or many exercice(s) instance.
    """

    main_muscle_worked = MuscleNameSerializer(
        many=False, source="get_main_muscle_worked"
    )
    others_muscles_worked = MuscleNameSerializer(
        many=True, source="get_others_muscles_worked"
    )

    class Meta:
        """
        Class Meta
        """

        model = Exercice
        fields = [
            "id",
            "name",
            "main_muscle_worked",
            "others_muscles_worked",
            "declination",
            "display_image",
            "description",
        ]


class CustomerSerializer(serializers.ModelSerializer):
    """
    Class UserSerializer
    """

    class Meta:
        """
        Class Meta
        """

        model = Customer
        fields = "__all__"


class MuscleSerializer(serializers.ModelSerializer):
    """
    Class MuscleSerializer
    """

    other_muscle_worked = ExerciceSerializer(
        many=True, source="get_related_other_exercises"
    )
    main_muscle_worked = ExerciceSerializer(
        many=True, source="get_related_main_exercises"
    )

    class Meta:
        """
        Class Meta
        """

        model = Muscle
        fields = ("id", "name", "main_muscle_worked", "other_muscle_worked")


class DeclinationSerializer(serializers.ModelSerializer):
    """
    Class DeclinationSerializer
    """

    related_exercises = ExerciceSerializer(
        many=True, source="get_related_declination_exercises"
    )

    class Meta:
        """
        Class Meta
        """

        model = Declination
        fields = ("id", "name", "related_exercises")


class AuthTokenSerializer(serializers.Serializer):
    """
    Serializer for the user authentication object.
    """

    username = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, trim_whitespace=False
    )

    def authenticate_user(self, username: str = None, password: str = None):
        """Authenticate with username and password.

        Args:
            username:
            password:

        Returns:
            User.
        """
        try:
            user = Customer.objects.get(username=username)
            if check_password(password, user.password):
                return user
            else:
                return None
        except Exception:
            return None

    def validate(self, attrs: Dict):
        """Validate a member with credentials.

        Args:
            attrs: Datas from the view.

        Returns:
            User authenticate.
        """
        username = attrs.get("username")
        password = attrs.get("password")
        user = self.authenticate_user(username=username, password=password)
        if not user:
            msg = "Unable to authenticate with provided credentials"
            raise serializers.ValidationError(msg, code="authorization")

        return user
