import json
from . import parser_urls
from django.core.cache import cache

def read_json(path):
    with open(path, 'r', encoding='utf8') as f:
        return json.load(f)

json_sections = read_json(parser_urls.GIFTS_CATEGORIES_JSON)
json_gifts = read_json(parser_urls.GIFTS_ALL_JSON)

def get_all_sections_list():
    print('----- Получаем список всех секций --------')
    print('Проверяем кэш..')
    cache_key = "all-sections"
    all_sections = cache.get(cache_key)
    if all_sections is None:
        all_sections = {}
        print('Значение в кэше не найдено')
        for section in json_sections['section']:
            if section['active'] is True:
                id = section['id']
                name = section['name']
                if section['parent'] is None:
                    all_sections[id] = {'name' : name, 'childs' : {} }
                else:
                    parent = section['parent']
                    if parent in all_sections:
                        all_sections[parent]['childs'][id] = name
        cache.set(cache_key, all_sections, 60 * 60)  # 60 secs * 60 mins
    print('--------- Список всех секций получен -----------')
    return all_sections

def get_all_photos_by_category_id(section_id):
    print('----- Получаем список всех фоток для секции --------')
    print('Проверяем кэш..')
    cache_key = "all-photos-" + str(section_id)
    ret_list = cache.get(cache_key)
    if ret_list is None:
        ret_list = {}
        print('Значение в кэше не найдено')
        all_gifts = json_gifts['gifts']
        file_extention = json_gifts['filetype']
        for gift in all_gifts:
            if gift['section'] == int(section_id):
                url = parser_urls.GIFTS_IMAGE_LOCATION_SHORT + str(gift['section']) + '/' + str(gift['filename']) + '.' + file_extention
                ret_list[gift['id']] = {'url': url, 'price' : gift['price'], 'name' : gift['name']}
        print(ret_list)
        cache.set(cache_key, ret_list, 60 * 60)  # 60 secs * 60 mins
    print('--------- Список всех фоток получен -----------')
    return ret_list