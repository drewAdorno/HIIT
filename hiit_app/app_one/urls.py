from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('exercise/<str:exer_num>/<str:exercise_name>', views.exercise),
    path('starttraning', views.starttraning),
    path('traning', views.traning),
    path('reset', views.reset)
    
]
