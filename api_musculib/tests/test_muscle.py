"""
Test muscle.
"""

from .test_base import BaseTestCase


class MuscleTestCase(BaseTestCase):
    """Class ListTestCase."""

    def test_list(self):
        """Test list of muscles.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get("/api_musculib/muscle/")
        assert len(response.data) > 0 and response.status_code == 200

    def test_retrieve(self):
        """Test retrieve a muscle.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get("/api_musculib/muscle/" + str(self.chest.id) + "/")
        assert len(response.data) > 0 and response.status_code == 200

    def test_post(self):
        """Test create a muscle (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.post("/api_musculib/muscle/", {"name": "test"})
        assert response.status_code == 403

    def test_patch(self):
        """Test update a muscle (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.patch(
            "/api_musculib/muscle/" + str(self.chest.id) + "/", {"name": "test"}
        )
        assert response.status_code == 403

    def test_delete(self):
        """Test delete a muscle (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(
            "/api_musculib/muscle/" + str(self.chest.id) + "/"
        )
        assert response.status_code == 403
