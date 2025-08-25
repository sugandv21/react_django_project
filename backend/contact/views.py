from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer
from django.core.mail import send_mail
from django.conf import settings

class ContactView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        send_mail(
            subject=f"New Contact Message from {instance.name}",
            message=f"Message: {instance.message}\nPhone: {instance.phone}\nEmail: {instance.email}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=["suganyasdv16@gmail.com"],
        )
