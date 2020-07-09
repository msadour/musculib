"""
Test Declination.
"""

from .test_base import BaseTestCase


class DeclinationTestCase(BaseTestCase):
    """Class ListTestCase."""

    def test_list(self):
        """Test list of declination.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get("/api_musculib/declination/")
        assert len(response.data) > 0 and response.status_code == 200

    def test_retrieve(self):
        """Test retrieve a declination.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(
            "/api_musculib/declination/" + str(self.machine.id) + "/"
        )
        assert len(response.data) > 0 and response.status_code == 200

    def test_post(self):
        """Test create a declination (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.post("/api_musculib/declination/", {"name": "test"})
        assert response.status_code == 403

    def test_patch(self):
        """Test update a declination (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.patch(
            "/api_musculib/muscle/" + str(self.machine.id) + "/", {"name": "test"}
        )
        assert response.status_code == 403

    def test_delete(self):
        """Test delete a declination (Must be failed with status code 403).

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(
            "/api_musculib/muscle/" + str(self.machine.id) + "/"
        )
        assert response.status_code == 403
