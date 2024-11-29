from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.decorators import api_view, action
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, ListModelMixin
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from .serializers import *
from .permissions import *

# Create your views here.


class EventViewSet(ModelViewSet):
    queryset = Event.objects.select_related('event_type').all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]


class EventList(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request):
        queryset = Event.objects.select_related('event_type').all()
        serializer = EventSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# @api_view(['GET', 'POST'])
# def event_list(request):
#     if request.method == 'GET':
#         queryset = Event.objects.select_related('event_type').all()
#         serializer = EventSerializer(
#             queryset, many=True, context={'request': request})
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = EventSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

class EventDetails(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        if event.event.count() > 0:
            return Response({'error': 'Event cannot be deleted because it associated with enrollment.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(['GET', 'PUT', 'DELETE'])
# def event_detail(request, pk):
#     event = get_object_or_404(Event, pk=pk)
#     if request.method == 'GET':
#         serializer = EventSerializer(event)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = EventSerializer(event, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
#     elif request.method == 'DELETE':
#         if event.enrollment.event.count() > 0:
#             return Response({'error': 'Event cannot be deleted because it associated with enrollment.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


class EventTypeList(ListCreateAPIView):
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return EventType.objects.all()

    def get_serializer_class(self):
        return EventTypeSerializer


# @api_view()
# def event_type_list(request):
#     queryset = EventType.objects.all()
#     serializer = EventTypeSerializer(queryset, many=True)
#     return Response(serializer.data)

class EventTypeDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return EventType.objects.all()

    def get_serializer_class(self):
        return EventTypeSerializer


# @api_view()
# def event_type_detail(request, pk):
#     type = get_object_or_404(EventType, pk=pk)
#     serializer = EventTypeSerializer(type)
#     return Response(serializer.data)

class EventDetailViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = EventDetail.objects.select_related('event').all()
    serializer_class = EventDetailSerializer
    permission_classes = [IsAdminOrReadOnly]


class NestedEventDetailViewSet(ModelViewSet):
    serializer_class = NestedEventDetailSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return EventDetail.objects.select_related(
            'event').filter(pk=self.kwargs['event_pk'])

    def get_serializer_context(self):
        return {'event_id': self.kwargs['event_pk']}


class EnrollmentList(APIView):
    def get(self, request):
        queryset = Enrollment.objects.select_related(
            'event').select_related('participant').all()
        serializer = EnrollmentSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = EnrollmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ParticipantViewSet(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [IsAdminOrReadOnly]

    def list(self, request, *args, **kwargs):
        if request.user.is_staff:
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()

    # ,permission_classes=[IsAuthenticated])
    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        (participant, created) = Participant.objects.get_or_create(
            user_id=request.user.id)
        if request.method == 'GET':
            serializer = ParticipantMeSerializer(participant)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ParticipantMeSerializer(
                participant, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
