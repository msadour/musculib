"""
Model file.
"""

from django.db import models


from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from api_musculib.managers import CustomUserManager


class Declination(models.Model):
    """
    Class Declination
    """

    name = models.CharField(max_length=300)

    def get_related_declination_exercices(self):
        return self.declinations.filter(declination=self)


class Muscle(models.Model):
    """
    Class Muscle
    """

    name = models.CharField(max_length=300)

    def get_plural(self):
        """
        Return the name of the plural's muscle name.
        :param self:
        :return: the plural's name of the muscle
        """

        if self.name == 'calfs':
            return 'calves'

    def get_related_main_exercices(self):
        return self.main_muscle_worked.filter(main_muscle_worked=self)

    def get_related_other_exercices(self):
        return self.other_muscle_worked.filter(others_muscles_worked=self)


class Exercice(models.Model):
    """
    Class Exercice
    """
    name = models.CharField(max_length=300)
    main_muscle_worked = models.ForeignKey(Muscle, on_delete=models.CASCADE, related_name="main_muscle_worked")
    others_muscles_worked = models.ManyToManyField(Muscle, related_name="other_muscle_worked")
    declination = models.ForeignKey(Declination, on_delete=models.CASCADE, related_name="declinations")
    photo = models.ImageField(upload_to='static/img/exercices/', default='exercices/no_found.png')
    description = models.CharField(max_length=1000, default='Not yet description')

    def get_main_muscle_worked(self):
        """
        Return the name of the main muscle used (using for serializer)
        :param self:
        :return: main muscle worked name
        """

        return self.main_muscle_worked.name

    def get_others_muscles_worked(self):
        """
        Return list of secondary muscles worked.
        :param self:
        :return: others muscles yorked
        """

        return [muscle.name for muscle in self.others_muscles_worked.all()]

    def display_image(self):
        """
        Return the path of the image.
        :param self:
        :return: path of the image
        """

        return 'media/' + self.declination.name + '/' + self.photo.name
    #
    # def build(self, request):
    #     """
    #     Create an exercice via a request POST.
    #     :param self:
    #     :param request: request sended by the API views.
    #     :return:
    #     """
    #
    #     name_exercice = dict(request.data).get('name')[0]
    #     main_muscle_worked = dict(request.data).get('main_muscle_worked')[0]
    #     others_muscles_worked = dict(request.data).get('others_muscles_worked', [])
    #     declination = dict(request.data).get('declination')[0]
    #
    #     self.name = name_exercice
    #
    #     self.main_muscle_worked = Muscle.objects.get(id=main_muscle_worked)
    #     self.declination = Declination.objects.get(id=declination)
    #     self.save()
    #
    #     for muscle in others_muscles_worked:
    #         muscle_obj = Muscle.objects.get(name=muscle)
    #         self.others_muscles_worked.add(muscle_obj)
    #
    # def update(self, request):
    #     for attr, value in dict(request.data).items():
    #         if attr == 'others_muscles_worked':
    #             for muscle in value:
    #                 muscle_obj = Muscle.objects.filter(name=muscle).first()
    #                 self.others_muscles_worked.add(muscle_obj)
    #         else:
    #             if attr == 'main_muscle_worked':
    #                 value = Muscle.objects.get(id=int(value[0]))
    #             elif attr == 'declination':
    #                 value = Declination.objects.get(id=int(value[0]))
    #             else:
    #                 value = value[0]
    #             setattr(self, attr, value)
    #     self.save()


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    favorite_exercice = models.ManyToManyField(Exercice)

    USERNAME_FIELD = 'username'

    objects = CustomUserManager()

    def get_full_name(self):
        return self.first_name + " " + self.last_name
