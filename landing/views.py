from django.shortcuts import render, get_object_or_404
from .models import Article
from django.views.decorators.cache import cache_page
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from Parser import Gifts_html_builder

#utils.clear_cache()


def landing(request):
    articles = Article.objects.all().order_by('-post_date')
    paginator = Paginator(articles, 12)
    page = request.GET.get('page')
    try:
        articles = paginator.page(page)
    except PageNotAnInteger:
        articles = paginator.page(1)
    except EmptyPage:
        articles = paginator.page(paginator.num_pages)
    context = {'articles': articles}
    return render(request, "landing/main.html", context)

def show_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    return render(request, 'landing/article.html', {'article': article})

def history(request):
    return render(request, "landing/history.html", locals())

def tgc_solar(request):
    return render(request, "landing/tgc_solar.html", locals())

def ustav(request):
    return render(request, "landing/ustav.html", locals())

def log_viewer(request):
    return render(request, "landing/log_viewer.html", locals())

def sostav(request):
    return render(request, "landing/sostav.html", locals())

def tutorial(request):
    print(request.get_full_path())
    url = 'https://goldencapital.pythonanywhere.com/media/pdf/Tutorial.pdf'
    filepath = 'https://docs.google.com/gview?url='+url+"&embedded=true"
    return render(request, "landing/tutorial.html", {'pdf_location': filepath})


def calc(request):
    return render(request, "Calcs/calc.html", locals())

def stats_calc(request):
    return render(request, "Calcs/stats_calc.html", locals())

def log_calc(request):
    return render(request, "Calcs/log_calc.html", locals())

def gifts_calc(request):
    categories = Gifts_html_builder.get_all_sections_list()
    photos = {}
    selected_item = None
    if 'Categories' in request.GET:
        print('Categories in get request with id : ' + request.GET.get('Categories'))
        selected_item = int(request.GET.get('Categories'))
    '''if request.method == 'POST':'''
    #selected_item = int(request.POST.get('Categories'))
    if selected_item:
        photos = Gifts_html_builder.get_all_photos_by_category_id(selected_item)
    return render(request, "Calcs/Gifts_calc.html", {'categories' : categories, 'photos' : photos, 'select_val' : selected_item})
