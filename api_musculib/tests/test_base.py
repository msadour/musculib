"""
Test Base class.
"""
from rest_framework.test import APITestCase, APIClient

from .factories import ExerciseFactory, MuscleFactory, DeclinationFactory


class BaseTestCase(APITestCase):
    """Class BaseTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""

        self.client = APIClient()
        self.back = MuscleFactory(name="back")
        self.chest = MuscleFactory(name="chest")
        self.biceps = MuscleFactory(name="biceps")
        self.triceps = MuscleFactory(name="triceps")
        self.shoulder = MuscleFactory(name="shoulder")
        self.barbell = DeclinationFactory(name="barbell")
        self.bodyweight = DeclinationFactory(name="bodyweight")
        self.machine = DeclinationFactory(name="machine")

        self.exercise_pullup = ExerciseFactory(
            name="Pull up", main_muscle_worked=self.back, declination=self.bodyweight
        )
        self.exercise_pullup.others_muscles_worked.add(self.biceps)

        self.exercise_bench_press = ExerciseFactory(
            name="Bench press", main_muscle_worked=self.chest, declination=self.barbell
        )
        self.exercise_bench_press.others_muscles_worked.add(self.triceps)

        self.exercise_curl = ExerciseFactory(
            name="Curl", main_muscle_worked=self.biceps, declination=self.barbell
        )
