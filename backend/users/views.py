from rest_framework import generics, permissions, serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import UserSerializer, RegisterSerializer
from .models import User
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token

    def validate(self, attrs):
        # Le front peut envoyer 'username' ou 'email'.
        email = attrs.get('username') or attrs.get('email')
        password = attrs.get('password')
        
        # Authentification manuelle avec email
        from django.contrib.auth import authenticate
        user = authenticate(username=email, password=password)
        
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        
        attrs['email'] = email
        
        # 'TokenObtainPairSerializer' s'attend à 'username' dans attrs.
        attrs['username'] = email
        
        data = super().validate(attrs)
        data['access_token'] = data.pop('access')
        data['token_type'] = 'bearer'
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (JSONParser, MultiPartParser, FormParser)

    def get_object(self):
        return self.request.user
