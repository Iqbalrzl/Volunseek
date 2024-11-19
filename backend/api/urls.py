from django.urls import path
from .views import index, event_list, event_detail

urlpatterns = [
    path('events/', event_list, name='api_events'),
    path('events/<int:pk>/', event_detail, name='api_events_detail'),
    path('', index, name='api_index')
]
