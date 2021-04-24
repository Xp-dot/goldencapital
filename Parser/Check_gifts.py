import json
import parser
import os
import parser_urls

base_image_url = 'https://st.mafiaonline.ru/images/gifts/'
json_load_url = 'https://www.mafiaonline.ru/api/api.php?action=gifts&param=gifts'
json_categories_load_url = 'https://www.mafiaonline.ru/api/api.php?action=gifts&param=sections'


def save_image(base_url, path, filename, file_extention):
    url = base_url + filename + file_extention
    full_file_path = path + filename + file_extention
    if not os.path.exists(full_file_path):
        r = parser.get_url(url)
        if r.status_code == 200:
            print('Картинка загружена, сохраняем... ')
            if not os.path.exists(path):
                print('path ' + path + ' doesnt exist. Creating new one...')
                os.makedirs(path)
            with open(full_file_path, "wb") as f:
                f.write(r.content)
                print('Сохранение прошло успешно!')
        else:
            print('Не удалось загрузить картинку по ссылке ' + url)
    else:
        print("Файл уже существует")

def read_all_gifts(path):
    with open(path, 'r', encoding='utf8') as f:
        return json.load(f)

def write_to_file(json_file, path):
    with open(path, 'w', encoding='utf8') as f:
        json.dump(json_file, f, indent=4, separators=(',', ': '), ensure_ascii=False)

def load_json_from_ulr(url):
    r = parser.get_url(url)
    return r.json()

def check_update():
    print('---------- Проверяем наличие новых подарков. ---------------')
    json_cached = read_all_gifts(parser_urls.GIFTS_ALL_JSON)
    json_loaded = load_json_from_ulr(json_load_url)
    num_cached = len(json_cached['gifts'])
    num_loaded = len(json_loaded['gifts'])
    print(' К-во картинок в кешированном json : ' + str(num_cached))
    print(' К-во картинок в мафском json : ' + str(num_loaded))
    if num_loaded > num_cached:
        new_images = num_loaded - num_cached
        print('Есть новые картинки. К-во : ' + str(new_images) + ' шт.')
        start_index = num_loaded - new_images
        filetype = '.' + json_loaded['filetype']
        for id in range(start_index, num_loaded):
            print(' Загружаю картинку № ' + str(id))
            img_section = json_loaded['gifts'][id]['section']
            img_name = str(json_loaded['gifts'][id]['filename'])
            save_path = parser_urls.GIFTS_IMAGE_LOCATION + str(img_section) + '/'
            print('full save path = ' + save_path + img_name + filetype)
            save_image(base_image_url, save_path, img_name, filetype)
        write_to_file(json_loaded, parser_urls.GIFTS_ALL_JSON)
        print('Загруженный json сохранен!')
    else:
        print('Новых картинок нет!')
    print('---------- Проверка наличия новых подарков окончена. ---------------')

def load_categories():
    print('---------- Обновляем категории. ---------------')
    json_loaded = load_json_from_ulr(json_categories_load_url)
    write_to_file(json_loaded, parser_urls.GIFTS_CATEGORIES_JSON)
    print('---------- Обновление категорий завершено. ---------------')

def load_all_images():
    json_cached = read_all_gifts(parser_urls.GIFTS_ALL_JSON)
    num_loaded = len(json_cached['gifts'])
    filetype = '.' + json_cached['filetype']
    for id in range(0, num_loaded):
        print(' Загружаю картинку № ' + str(id))
        img_section = json_cached['gifts'][id]['section']
        img_name = str(json_cached['gifts'][id]['filename'])
        save_path = parser_urls.GIFTS_IMAGE_LOCATION + str(img_section) + '/'
        print('full save path = ' + save_path + img_name + filetype)
        save_image(base_image_url, save_path, img_name, filetype)
    print('Сохранение прошло успешно.')

check_update()
load_categories()