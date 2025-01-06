from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from django.contrib.auth import authenticate, get_user_model
from .models import Restaurant, Review
from .serializers import UserSerializer, RestaurantSerializer, ReviewSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

User = get_user_model()

# Custom permission class for Restaurant viewset
class RestaurantPermission(BasePermission):
    def has_permission(self, request, view):
        # Allow GET requests without authentication
        if request.method in SAFE_METHODS:
            return True
        # Require authentication for all other methods
        return request.user and request.user.is_authenticated

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        print("user", user)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            print(token)
            user_info = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_superuser': user.is_superuser
            }
            return Response({"token": token.key, "user": user_info}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [RestaurantPermission]  # Use our custom permission class

    def perform_create(self, serializer):
        serializer.save(representative=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        restaurant_id = self.request.query_params.get('restaurant_id')
        if restaurant_id:
            return self.queryset.filter(restaurant_id=restaurant_id)
        return self.queryset

    def perform_create(self, serializer):
        review = serializer.save()
        user = self.request.user
        user.earned_points += 5
        user.save()