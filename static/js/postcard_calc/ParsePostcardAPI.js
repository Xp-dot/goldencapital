var PlayerName = "Evil bob";
var API_url = "";
var sort_nubmer = 30;//К-во "дарителей" на графике

var gifts_json_url = "https://www.mafiaonline.ru/api/api.php?action=gifts&param=gifts";
var users_json_url = "https://www.mafiaonline.ru/api/api.php?action=userlist";
var gifts_json_data;
var users_json_data;

//Get input from HTML page fields into script variables
function parse_input()
{
    PlayerName = document.getElementById("nickNameInput").value;
    API_url = "https://www.mafiaonline.ru/api/api.php?action=info&param=" + PlayerName +"&g=yes";
}

async function calculate()
{
    parse_input();
    let gifts = await get_players_postcards_info();
    let total_gifts = gifts.length;
    let gifts_data = await count_gifts_per_player(gifts, total_gifts); // arr of type [gifts_dict, gifts_arr]
    let gifts_dict = gifts_data[0]; // dict of type {username : postcard_number_gifted}
    let gifts_arr = gifts_data[1]; // arr of type [Ник, Дата, ID игрока, ID подарка, Подпись]
    let sorted_gifts_dict = await sort_data(gifts_dict, sort_nubmer, total_gifts);
    let graph_data = get_graph_data(sorted_gifts_dict);
    drawGraph(graph_data[0], graph_data[1], total_gifts);
    display_table(gifts_arr);
}

//Download data from API_URL into varibles
async function get_players_postcards_info()
{
    let data = await (await fetch(API_url)).json();
    gifts_json_data = await (await fetch(gifts_json_url)).json();
    users_json_data = await (await fetch(users_json_url)).json();
    let gifts = data.gifts;
    return gifts;
}

// Counts how many postcards specific player gifted to other player
async function count_gifts_per_player(gifts, total)
{
    let gifts_dict = {}; // Dictionary for graph
    let gifts_arr = []; // Array for table
    let index = total+1;
    for(let gift of gifts)
    {
        index--;
        let img_url = get_gift_url_by_id(gift.gid);
        let current_nick = users_json_data[gift.from_id];
        let sender_nick = gift.from;
        let output_nick = (current_nick == sender_nick) ? current_nick : (sender_nick + " (" + current_nick + ")");
        let nick_url = '<a href="https://www.mafiaonline.ru/info/'+ current_nick+'" target="_blank">'+ output_nick +'</a>';
        gifts_arr.push([nick_url, gift.date, gift.from_id, index, img_url, gift.text]);

        if(gift.from in gifts_dict)
            gifts_dict[gift.from] = gifts_dict[gift.from]+1;
        else
            gifts_dict[gift.from] = 1;
    }
    return [gifts_dict, gifts_arr];
}

// Sorts gifts from biggest value (number of gifts) to lowest
async function sort_data(gifts, cutoff_index)
{
    var items = Object.keys(gifts).map(function(key) {return [key, gifts[key]];});
    items.sort(function(first, second) {return second[1] - first[1];});
    let sorted_data = items.slice(0, cutoff_index);sorted_obj={}
    sorted_obj={};
    $.each(sorted_data, function(k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return(sorted_obj);
}

// Convert dictionary data to required charts.js format and
function get_graph_data(gifts)
{
    let label_names = [];
    let dataset_array = [];
    for (const [key, value] of Object.entries(gifts))
    {
        label_names.push(key);
        dataset_array.push(value);
    }
    return [label_names, dataset_array]
}

function get_gift_url_by_id(id)
{
    let img_url = "https://st.mafiaonline.ru/images/gifts/";
    let output = id;
    console.log("searching for id " + id);
    try
    {
        const [key, value] = Object.entries(gifts_json_data.gifts).find(([key, gift]) => gift.id === id);
        output = '<a href="' + img_url + value.filename + '.jpg" target="_blank">' + value.name + ' ('+ value.price + ' маф)</a>';
        console.log(output);
    }
    catch(e)
    {
    }
    return output;
}
