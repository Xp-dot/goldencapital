from lxml import html
import parser
import parser_urls


def parse_function(tree, start_num, end_num):
    topic_dict = {}
    last_topics = tree.xpath(
        '//table[@class="table forum"]//tr[position() > ' + str(start_num) + ' and position() < ' + str(
            end_num) + ']')
    for topic in last_topics:
            topic_dict[topic.xpath('td[2]/a//text()')[0]] = 'https://www.mafiaonline.ru/forum/' + \
                                                        topic.xpath('td[2]/a/@href')[0]
    return topic_dict


def parse_forum(url, start_num=3, end_num=7):
    try:
        page = parser.get_url(url)
        tree = html.fromstring(page.content)
        topic_dict = parse_function(tree, start_num, end_num)
        return topic_dict
    except Exception as e:
        print("----\n\n\n")
        print(e)
        print("----\n\n\n")
        return {}


def get_all_topics():
    result = {'Официальные конкурсы' : parse_forum(parser_urls.OFFICIAL_CONCURS_URL, 3, 7),
              'Официальные турниры' : parse_forum(parser_urls.OFFICIAL_TOURNAMENT_URL, 6, 10),
              'Неофициальные конкурсы' : parse_forum(parser_urls.NONOFFICIAL_CONCURS_URL, 2, 6),
              'Неофициальные турниры' : parse_forum(parser_urls.NONOFFICIAL_TOURNAMENT_URL, 1, 5)}
    if len(result['Неофициальные конкурсы']) > 0:
        parser.write_to_file(result, parser_urls.FORUM_JSON_PATH)

