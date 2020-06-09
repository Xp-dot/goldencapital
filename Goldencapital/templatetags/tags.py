from django import template
from landing import utils

register = template.Library()
#utils.clear_cache()

@register.inclusion_tag('tags/actual_news_template.html')
def show_actual_news():
    return {'act_news': utils.get_last_actual_news(7)}

@register.inclusion_tag('tags/show_mafstat.html')
def show_mafstats():
    return {'player_stats': utils.get_best_for_all_roles()}

@register.inclusion_tag('tags/forum_last_topics.html')
def show_forum_last():
    return {'forum_stats': utils.load_json_stats('forum-last','/cache/forum.json')}

@register.inclusion_tag('tags/navbar.html')
def show_navbar():
    return {}