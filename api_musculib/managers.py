from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(
        self,
        username,
        password,
        is_admin=False,
        is_staff=False,
        is_active=True,
        **fields
    ):
        """
        Create and save a User with the given email and password.
        """
        if not username:
            raise ValueError("User must have an username")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(email=self.normalize_email(username))
        user.set_password(password)  # change password to hash

        user.admin = is_admin
        user.staff = is_staff
        user.active = is_active
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("User must have an username")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(email=self.normalize_email(username))
        user.set_password(password)
        user.admin = True
        user.staff = True
        user.active = True
        user.save(using=self._db)
        return user
