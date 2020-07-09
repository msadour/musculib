"""
Test Exercise.
"""

from .test_base import BaseTestCase


class ExerciseTestCase(BaseTestCase):
    """Class ListTestCase."""

    def test_list(self):
        """Test list of exercises.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get("/api_musculib/exercise/")
        assert len(response.data) > 0 and response.status_code == 200

    def test_retrieve(self):
        """Test retrieve an exercise.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(
            "/api_musculib/exercise/" + str(self.exercise_curl.id) + "/"
        )
        assert len(response.data) > 0 and response.status_code == 200

    def test_post(self):
        """Test create an exercise (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.post("/api_musculib/exercise/", {"name": "test"})
        assert response.status_code == 403

    def test_patch(self):
        """Test update an exercise (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.patch(
            "/api_musculib/exercise/" + str(self.exercise_curl.id) + "/",
            {"name": "test"},
        )
        assert response.status_code == 403

    def test_delete(self):
        """Test delete an exercise (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(
            "/api_musculib/muscle/" + str(self.exercise_curl.id) + "/"
        )
        assert response.status_code == 403
