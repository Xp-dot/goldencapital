import requests
import random
import json
import proxies

ip_addresses = proxies.ip_addresses
proxy = None

#region CONNECTION FUNCTIONS
def find_proxy(url):
    global proxy
    connected = False
    while not connected:
        proxy_index = random.randint(0, len(ip_addresses) - 1)
        print('trying ip : ' + ip_addresses[proxy_index])
        try:
            if proxy is None:
                proxy = {"http": ip_addresses[proxy_index], "https": ip_addresses[proxy_index]}
            response = requests.get(url, proxies=proxy)
            if response.status_code == 200:
                connected = True
                print('Successefull')
                return {'proxy': proxy, 'response': response}
            else:
                proxy = None
                print('IP blocked. Trying next. Remove this one from the list')
                ip_addresses.pop(proxy_index)
        except Exception as e:
            print(e)
            proxy = None
            ip_addresses.pop(proxy_index)
            print('IP failed. Trying next. Remove this one from the list')

def get_url(url):
    global proxy
    response = requests.get(url)
    print('Trying without proxy...')
    if response.status_code == 200:
        print('Response successeful!')
        return response
    else:
        print('Response failed, trying with proxy...')
        find_proxy_result = find_proxy(url)
        proxy = find_proxy_result['proxy']
        return find_proxy_result['response']
#endregion



#region SAVE/LOAD
def write_to_file(json_file, path):
    with open(path, 'w', encoding='utf8') as f:
        json.dump(json_file, f, indent=4, separators=(',', ': '), ensure_ascii=False)
#endregion

