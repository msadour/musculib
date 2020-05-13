from rest_framework.permissions import BasePermission


class ActionsAllowed(BasePermission):
    message = "You must be admin to do this actions."
    method_allowed = ['GET']

    def has_permission(self, request, view):
        if request.method == 'GET' or request.user.is_superuser:
            return True
        return False
