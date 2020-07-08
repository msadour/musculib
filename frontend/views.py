from django.shortcuts import render


def index(request, page: str = "", id: int = 1):
  return render(request, 'frontend/index.html')
