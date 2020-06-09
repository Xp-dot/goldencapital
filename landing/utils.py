from landing.models import Actual_News
from Goldencapital import settings
from django.core.cache import cache
import json

def get_last_actual_news(num):
    cache_key = "last-news-cache"
    news = cache.get(cache_key)
    if news is None:
        news = Actual_News.objects.all()
        if len(news) > num:
            news = news[-7:]
        else:
            news = news[::-1]
        cache.set(cache_key, news, 60 * 60)  # 60 secs * 60 mins
    return news

def load_json_stats(cache_key, path):
    json_mafstat = cache.get(cache_key)
    if json_mafstat is None:
        json_file_path = settings.STATICFILES_DIRS[0] + path
        with open(json_file_path, 'r', encoding='utf-8') as file:
            json_mafstat = json.load(file)
        cache.set(cache_key, json_mafstat, 24 *60 * 60)  # 60 secs * 60 mins
    return json_mafstat


def get_winrate(wins,loses):
    if wins+loses > 10 :
        return wins/(wins+loses)
    else:
        return 0

def get_best(param, dict):
    cache_key = "mafstat-json-%s" % param
    arr = cache.get(cache_key)
    if arr is None:
        arr = sorted(dict, key=lambda x : get_winrate(dict[x][param][0],dict[x][param][1]), reverse=True)
        print("getting best from calculations")
        cache.set(cache_key, arr, 24* 60*60)
    else:
        print('loaded from cache')
    best3 = arr[:3]
    d = {el:dict[el][param] for el in best3}
    return d

def get_best_for_all_roles():
    total = get_best('total', load_json_stats("mafstat-json",'/cache/mafstat.json'))
    maf = get_best('maf', load_json_stats("mafstat-json",'/cache/mafstat.json'))
    chiz = get_best('chiz', load_json_stats("mafstat-json",'/cache/mafstat.json'))
    com = get_best('com', load_json_stats("mafstat-json",'/cache/mafstat.json'))
    total_dict = {'В целом':total, 'За мафию':maf, 'За честного':chiz, 'За комиссара':com}
    return total_dict

def clear_cache():
    cache.clear()