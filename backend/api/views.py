from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.


@api_view()
def event_list(request):
    return Response('testing')


@api_view()
def event_detail(request, pk):
    event = Event.objects.get(pk=pk)
    serializer = EventSerializer(event)
    return Response(serializer.data)


def index(request):
    return HttpResponse("test")
