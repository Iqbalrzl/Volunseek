from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.decorators import api_view, action
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, ListModelMixin
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import *
from .serializers import *
from .permissions import *
from .filters import *
from .pagination import *

# Create your views here.


class EventViewSet(ModelViewSet):
    queryset = Event.objects.select_related(
        'event_type').prefetch_related('image').all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    filterset_class = EventFilter
    search_fields = ['^title', 'title',
                     'event_type__type', 'description', 'location']
    ordering_fields = ['title', 'start_date']

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        self.pagination_class = EventPagination
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EventDetailViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = EventDetail.objects.select_related('event').all()
    serializer_class = EventDetailSerializer
    permission_classes = [IsAdminOrReadOnly]


class NestedEventDetailViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = NestedEventDetailSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return EventDetail.objects.select_related(
            'event').filter(pk=self.kwargs['event_pk'])

    def get_serializer_context(self):
        return {'event_id': self.kwargs['event_pk']}

    def create(self, request, *args, **kwargs):
        event_detail = self.get_queryset()
        if event_detail:
            return Response(data={'details': 'Event details already exist.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return super().create(request, *args, **kwargs)


class EventImageViewSet(ModelViewSet):
    serializer_class = EventImageSerializer
    # permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return EventImage.objects.filter(event_id=self.kwargs['event_pk'])

    def get_serializer_context(self):
        return {'event_id': self.kwargs['event_pk'], 'request': self.request}


class EnrollmentViewSet(ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Enrollment.objects.select_related('event').select_related('participant').all()
        (participant_id, created) = Participant.objects.only(
            'id').get_or_create(user_id=self.request.user.id)
        return Enrollment.objects.filter(participant_id=participant_id)


class CreateEnrollmentViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, GenericViewSet):
    serializer_class = CreateEnrollmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Enrollment.objects.select_related('event').select_related('participant').filter(event_id=self.kwargs['event_pk'])

    def get_serializer_context(self):
        event_id = self.kwargs['event_pk']
        return {'event_id': event_id, 'user_id': self.request.user.id}


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
