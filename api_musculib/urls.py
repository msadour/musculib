"""
Urls file.
"""

from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ExerciseViewSet,
    CustomerViewSet,
    MuscleViewSet,
    DeclinationViewSet,
    CustomAuthToken,
    LogoutViewSet,
)


router = DefaultRouter()
router.register(r"exercise", ExerciseViewSet, basename="exercise")
router.register(r"muscle", MuscleViewSet, basename="muscle")
router.register(r"declination", DeclinationViewSet, basename="declination")
router.register(r"customer", CustomerViewSet, basename="customer")
router.register(r"logout", LogoutViewSet, basename="logout")

urlpatterns = router.urls

urlpatterns += [
    path("api-token-auth/", CustomAuthToken.as_view()),
]
