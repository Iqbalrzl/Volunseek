from rest_framework.pagination import PageNumberPagination


class EventPagination(PageNumberPagination):
    page_size = 12
    page_query_param = 'page'
    max_page_size = 100
