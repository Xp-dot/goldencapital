from django.shortcuts import render, get_object_or_404
from .models import Article
from django.views.decorators.cache import cache_page
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

#utils.clear_cache()

# Create your views here.
def landing(request):
    #articles = Article.objects.all()[::-1]
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
    return render(request, "Calcs/gifts_calc.html", locals())
