from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Item
from .serializers import ItemSerializer, UserSerializer
from rest_framework import generics, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user)

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [] 

    def post(self, request, *args, **kwargs):  
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response({
            'user': serializer.data,  
            'access': tokens['access'],
            'refresh': tokens['refresh']
        }, status=status.HTTP_201_CREATED)
