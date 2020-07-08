from django.urls import path, re_path
from frontend.views import index

urlpatterns = [
    path(r'', index),
    path(r"<page>", index),
    path(r"<page>/<int:id>", index),
    path(r"<page>/<str:type>/<int:id>", index),
]