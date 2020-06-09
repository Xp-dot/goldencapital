// Кто спиздит этот Джава Скрипт себе на сайт - знай, что я тебя не осуждаю...
// Но если автора(меня) не упомянут - ты мудила. (С) Evil Bob
// P.S. И пёс.

var cur_games_url = "https://www.mafiaonline.ru/api/api.php?action=log&param=current";
var logsArray = [];

function getCurrentGames(url){
		$.getJSON(url, function(data)
		{
			for(var key in data.games)
			{
			    var id = data.games[key].id;
			    var street = data.games[key].ul;
			    var players = data.games[key].users;
				create_tab("#log-list", id);
				logsArray.push([id,street, players]);
				playersTableCreate("log-content",id);
			}
		});
}

function createTab(div_id, log_id)
{
var htmlTemplate = '<li class="nav-item"> <a class="nav-link" id="info-tab" data-toggle="tab" href="#log'+log_id+'" role="tab" aria-controls="log'+log_id+'" aria-selected="true">'+log_id+'</a></li>';
$(div_id).append(htmlTemplate);
}

function get_player_list_html(div_id, log_id, players)
{
var players_table_header = `
<thead>
<tr>
    <th>Игрок</th>
    <th>Статус/Роль</th>
    <th>Статы/Здоровье</th>
</tr>
</thead>`
var players_table_body = `<tbody>
            <tr>
                <th>Вася</th>
                <th>Жив</th>
                <th>Бла бла бла/13</th>
            </tr>
            </tbody>
        </table>
        <div class="log-chat">
        </div>
    </div>`
$(div_id).append(html);
}

function playersTableCreate(div_id,log_id, players) {
    //Find container
    var playerTableContainer = document.getElementsById(div_id);
    //Create tab div container for tabs, and setting attributes
    var tabdiv = document.createElement('div');
    tabdiv.setAttribute('class', 'tab-pane fade');
    tabdiv.setAttribute('id', 'log'+log_id);
    tabdiv.setAttribute('role', 'tabpanel');
    tabdiv.setAttribute('aria-labelledby', 'log'+log_id+'-tab');
    //Creating table, setting bootstrap table style
    var tbl = document.createElement('table');
    tbl.setAttribute('class', 'table');
    //Creating header
    var thd = document.createElement('thead');
    var tr_head = document.createElement('thead');
    var th1 = document.createElement('th'); th1.appendChild(document.createTextNode('Игрок'))
    var th2 = document.createElement('th'); th2.appendChild(document.createTextNode('Статус/Роль'))
    var th3 = document.createElement('th'); th3.appendChild(document.createTextNode('Статы/Здоровье'))
    tr_head.appendChild(th1); thd.appendChild(th2); thd.appendChild(th3);
    thd.appendChild(tr_head);
    //Creating body
    var tbdy = document.createElement('tbody');
    for (var player in players)
    {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++)
        {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode('\u0020'))
                i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(thd);
    tbl.appendChild(tbdy);
    tabdiv.appendChild(tbl);
    playerTableContainer.appendChild(tbl)
}

function playerStatusToString(status_code)
{
    if(status_code == 0)
        ziv++;
    else if(status_code == 1 || status_code == 4)
        mertv++;
    else if(status_code == 2)
        v_turme++;
    else
        time++;
}