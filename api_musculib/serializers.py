"""
Serializers file.
"""
from django.contrib.auth.hashers import check_password
from rest_framework import serializers

from .models import Exercice, Customer, Muscle, Declination


class MuscleNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Muscle
        fields = ('id', 'name')


class ExerciceSerializer(serializers.ModelSerializer):
    """
    Class who serialize one or many exercice(s) instance.
    """

    main_muscle_worked = MuscleNameSerializer(many=False, source='get_main_muscle_worked')
    others_muscles_worked = MuscleNameSerializer(many=True, source='get_others_muscles_worked')

    class Meta:
        model = Exercice
        fields = ['id', 'name', 'main_muscle_worked', 'others_muscles_worked', 'declination', 'display_image', 'description']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'


class MuscleSerializer(serializers.ModelSerializer):

    other_muscle_worked = ExerciceSerializer(many=True, source='get_related_other_exercices')
    main_muscle_worked = ExerciceSerializer(many=True, source='get_related_main_exercices')

    class Meta:
        model = Muscle
        fields = ('id', 'name', 'main_muscle_worked', 'other_muscle_worked')


class DeclinationSerializer(serializers.ModelSerializer):

    related_exercices = ExerciceSerializer(many=True, source='get_related_declination_exercices')

    class Meta:
        model = Declination
        fields = ('id', 'name', 'related_exercices')


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object.

    Attributes:
        email (str):
        password (str):
    """

    username = serializers.CharField()
    password = serializers.CharField(style={"input_type": "password"}, trim_whitespace=False)

    def authenticate_user(self, username=None, password=None):
        try:
            # Try to find a user matching your username
            print('-------------------- authenticate_user')
            print(password)
            print(Customer.objects.all())
            user = Customer.objects.get(username=username)
            if check_password(password, user.password):
                return user
            else:
                return None
        except:
            return None

    def validate(self, attrs):

        username = attrs.get("username")
        password = attrs.get("password")
        user = self.authenticate_user(username=username, password=password)
        if not user:
            msg = "Unable to authenticate with provided credentials"
            raise serializers.ValidationError(msg, code="authorization")

        return user
