"""
Urls file.
"""

from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ExerciseViewSet,
    UserViewSet,
    MuscleViewSet,
    DeclinationViewSet,
    CustomAuthToken,
)


router = DefaultRouter()
router.register(r"exercise", ExerciseViewSet, basename="exercise")
router.register(r"user", UserViewSet, basename="user")
router.register(r"muscle", MuscleViewSet, basename="muscle")
router.register(r"declination", DeclinationViewSet, basename="declination")
router.register(r"logout", DeclinationViewSet, basename="declination")

urlpatterns = router.urls

urlpatterns += [
    path("api-token-auth/", CustomAuthToken.as_view()),
]
