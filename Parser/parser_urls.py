import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
MEDIAFILES_DIRS = [os.path.join(BASE_DIR, "media")]

OFFICIAL_TOURNAMENT_URL = 'https://www.mafiaonline.ru/forum/viewforum.php?id=53'
NONOFFICIAL_TOURNAMENT_URL = 'https://www.mafiaonline.ru/forum/viewforum.php?id=58'
OFFICIAL_CONCURS_URL = 'https://www.mafiaonline.ru/forum/viewforum.php?id=25'
NONOFFICIAL_CONCURS_URL = 'https://www.mafiaonline.ru/forum/viewforum.php?id=12'

CURRENT_GAMES_URL = "https://www.mafiaonline.ru/api/api.php?action=log&param=current"
LOG_URL = "https://www.mafiaonline.ru/log/"

MAF_STAT_URL = 'https://mafiastat.ru/clan/view/25440'

STAT_JSON_PATH = STATICFILES_DIRS[0] + '/cache/mafstat.json'
FORUM_JSON_PATH = STATICFILES_DIRS[0] + '/cache/forum.json'

GIFTS_ALL_JSON = STATICFILES_DIRS[0] + '/json/gifts_all.json'
GIFTS_CATEGORIES_JSON = STATICFILES_DIRS[0] + '/json/gifts_categories.json'

GIFTS_IMAGE_LOCATION = MEDIAFILES_DIRS[0] + '/Gift_Images/'
GIFTS_IMAGE_LOCATION_SHORT = '/media/Gift_Images/'
