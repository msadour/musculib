from django.urls import path, re_path
from frontend.views import index

urlpatterns = [
    path(r'', index),
    path(r'<str>', index),
]