import logging
import traceback
from django.http import JsonResponse
from rest_framework import status

logger = logging.getLogger(__name__)

class GlobalExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
            return response
        except Exception as e:
            return self.handle_exception(request, e)

    def handle_exception(self, request, e):
        # Professional logging
        logger.error(f"Unhandled Exception at {request.path}: {str(e)}")
        logger.error(traceback.format_exc())

        # Response construction
        error_response = {
            "error": {
                "message": "Une erreur interne est survenue.",
                "type": e.__class__.__name__,
                "path": request.path
            }
        }

        # Show more detail in debug mode
        from django.conf import settings
        if settings.DEBUG:
            error_response["error"]["detail"] = str(e)
            error_response["error"]["traceback"] = traceback.format_exc().splitlines()

        return JsonResponse(error_response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
