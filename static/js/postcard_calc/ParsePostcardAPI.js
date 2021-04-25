var PlayerName = "Evil bob";
var API_url = "";
var sort_nubmer = 30;//К-во "дарителей" на графике


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
    //let total_gifts = gifts.length;
    let gifts_data = await count_gifts_per_player(gifts); // arr of type [gifts_dict, gifts_arr]
    let gifts_dict = gifts_data[0]; // dict of type {username : postcard_number_gifted}
    let gifts_arr = gifts_data[1]; // arr of type [Ник, Дата, ID игрока, ID подарка, Подпись]
    let sorted_gifts_dict = await sort_data(gifts_dict, sort_nubmer);
    let graph_data = get_graph_data(sorted_gifts_dict);
    drawGraph(graph_data[0], graph_data[1]);
    display_table(gifts_arr);
}

//Download data from API_URL into varibles
async function get_players_postcards_info()
{
    let data = await (await fetch(API_url)).json();
    let gifts = data.gifts;
    return gifts;
}

// Counts how many postcards specific player gifted to other player
async function count_gifts_per_player(gifts)
{
    let gifts_dict = {}; // Dictionary for graph
    let gifts_arr = []; // Array for table
    for(let gift of gifts)
    {
        gifts_arr.push([gift.from, gift.date, gift.from_id, gift.gid, gift.text]);

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
