from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm
from .models import UserProfile

data_type = {'player':'player_data', 'log':'log_data','item' :'items_data','consumable':'consumables_data','uniq_item': 'uniq_items_data','quest': 'quests_data'}

# Create your views here.
def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, "users/register.html", {'form' : form})


#@login_required
def profile_load(request):
    usr_obj = None
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        post_data_type = request.POST['data_type']
        try:
            usr = User.objects.get(username=username)
            print(usr.username)
        except:
            return render(request, 'users/tgc_response_page.html', {'response_string':'wrong username'})
        success = usr.check_password(password)
        if success:
            usr_obj = UserProfile.objects.filter(user=usr)[:1].get()
            if request.POST['type'] == "load":
                return render(request, 'users/get_data.html', {'user_data': usr_obj})
            elif request.POST['type'] == "save":
                data = request.POST['data']
                if post_data_type not in data_type.keys():
                    return render(request, 'users/tgc_response_page.html', {'response_string':'no such type'})
                setattr(usr_obj, data_type[post_data_type], data)
                print(usr_obj)
                print(data_type[post_data_type])
                print(data)
                usr_obj.save()
                return render(request, 'users/tgc_response_page.html', {'response_string':'save success'})
            else:
                return render(request, 'users/tgc_response_page.html', {'response_string':'no_type'})
        else:
            return render(request, 'users/tgc_response_page.html', {'response_string':'wrong password'})
    return render(request, 'users/access_data.html', {'user_data': usr_obj})

'''
def profile_save(request):
    usr_obj = None
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        try:
            usr = User.objects.get(username__iexac=username)
            print(usr.username)
        except:
            return render(request, 'users/wrong_username.html', {})
        success = usr.check_password(password)
        if success:
            usr_obj = UserProfile.objects.filter(user=usr)[:1].get()
            return render(request, 'users/save_success.html', {})
        else:
            return render(request, 'users/wrong_pass.html', {})
    return render(request, 'users/access_data.html', {'user_data': usr_obj })


from rest_framework.viewsets import ModelViewSet

from tgc_solar_users.serializers import PlayerDataSerializer

class PlayerDataView(ModelViewSet):
    queryset = PlayerData.objects.all()
    serializer_class = PlayerDataSerializer'''

