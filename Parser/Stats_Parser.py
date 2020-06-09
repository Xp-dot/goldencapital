import re
from lxml import html
import parser
import parser_urls


def get_tree_from_url(url):
    tree = None
    try:
        page = parser.get_url(url)
        tree = html.fromstring(page.content)
    except Exception as e:
        print(e)
    return tree


def get_player_list_from_tree(tree):
    player_lists = {}
    if tree is not None:
        player_table = tree.xpath('//ul[@class="media-list media-list-linked"]//li//div[@class="media-title"]')
        for player in player_table:
            try:
                nick_unform = player.xpath('a//text()')[0]
                nick = re.sub(r'[\n\r\t]', '', nick_unform)
                url = 'https://mafiastat.ru'+player.xpath('a/@href')[0]
                player_lists[nick] = url
                if nick == 'The Golden Capital':
                    break
            except Exception as e:
                print(e)
    return player_lists

def get_player_stats(url, player_nick):
    player_tree = get_tree_from_url(url)
    if player_tree is not None:
        player_table = player_tree.xpath('//table[@class="table text-nowrap"]//tbody//tr')
        total_stat_list = []
        mafia_stat_list = []
        com_stat_list = []
        chiz_stat_list = []
        man_stat_list = []
        for player in player_table[:32]:
            total_stat = format_string(player.xpath('td[2]/text()')[0])
            if total_stat is not None:
                mafia_stat = format_string(player.xpath('td[2]/text()')[1])
                com_stat = format_string(player.xpath('td[2]/text()')[2])
                chiz_stat = format_string(player.xpath('td[2]/text()')[3])
                man_stat = format_string(player.xpath('td[2]/text()')[4])
                if total_stat is not None: total_stat_list.append(total_stat)
                if mafia_stat is not None: mafia_stat_list.append(mafia_stat)
                if com_stat is not None: com_stat_list.append(com_stat)
                if chiz_stat is not None: chiz_stat_list.append(chiz_stat)
                if man_stat is not None: man_stat_list.append(man_stat)
        tot_win_lose = list_to_int(total_stat_list)
        maf_win_lose = list_to_int(mafia_stat_list)
        com_win_lose = list_to_int(com_stat_list)
        chiz_win_lose = list_to_int(chiz_stat_list)
        man_win_lose = list_to_int(man_stat_list)
    return {'total' : tot_win_lose, 'maf' : maf_win_lose, 'com' : com_win_lose, 'chiz' : chiz_win_lose, 'man' : man_win_lose}

def format_string(string):
    regex = re.compile(r'[\n\r\t]')
    string = string[string.find("(") + 1:string.find(")")]
    string = regex.sub(" ", string)
    if ' ' in string:
        return None
    else:
        return string

def list_to_int(list):
    win = 0
    lose = 0
    if len(list) > 0:
        for string in list:
            win_lose = string.split('/')
            win += int(win_lose[0])
            lose += int(win_lose[1])
    return [win, lose, win+lose]

def collect_data():
    print("Start to collect the data")
    player_list_tree = get_tree_from_url(parser_urls.MAF_STAT_URL)
    print("Tree was loaded...")
    json_stats = {}
    players_list = get_player_list_from_tree(player_list_tree)
    print("Player list found. Parsing...")
    for player in players_list:
        print("Player "+player+" proceeding...")
        player_stat = get_player_stats(players_list[player], player)
        json_stats[player] = player_stat
    print('Players info collecting finished. Result is :')
    print(json_stats)
    print('saving to file..')
    parser.write_to_file(json_stats,parser_urls.STAT_JSON_PATH)
    print("File was saved")
