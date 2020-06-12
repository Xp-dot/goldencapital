from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.landing, name="landing"),
    path('history/', views.history, name="history"),
    path('tgc_solar/', views.tgc_solar, name="tgc_solar"),
    path('ustav/', views.ustav, name="ustav"),
    path('sostav/', views.sostav, name="sostav"),
    path('tutorial/', views.tutorial, name="tutorial"),
    path('calc/', views.calc, name="calc"),
    path('log_viewer/', views.log_viewer, name="log_viewer"),
    path('stats_calc/', views.stats_calc, name="stats_calc"),
    path('log_calc/', views.log_calc, name="log_calc"),
    path('gifts_calc/', views.gifts_calc, name="gifts_calc"),
    path('article/<article_id>', views.show_article, name='article'),
]