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
    path('postcard_calc/', views.postcard_calc, name="postcard_calc"),
    path('tgc_solar/', views.tgc_solar, name="tgc_solar"),
    path('secret/', views.secret, name="secret"),
    path('article/<article_id>', views.show_article, name='article'),
    path('bunker5/', views.bunker5, {'template_name': "messages.html"}, name="bunker5"),
    path('bunker5/messages.html', views.bunker5, {'template_name': "messages.html"}, name="bunker5"),
    path('bunker5/messages2.html', views.bunker5, {'template_name': "messages2.html"}, name="bunker5_2"),
    path('bunker5/messages3.html', views.bunker5, {'template_name': "messages3.html"}, name="bunker5_3"),
]