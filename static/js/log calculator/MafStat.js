var PlayerName = "Desipere in loco";
var dateInputStart;
var dateInputEnd;
var	PlayerStatsArray = [];
var	analyzeMoves = true;

async function get_logs_from_list()
{
	$('#checkboxContainer').hide();
	PlayerName = document.getElementById("nickNameInput").value;
	dateInputStart = document.getElementById("dateInputStart").value.replace(/-/g, '');
	dateInputEnd = document.getElementById("dateInputEnd").value.replace(/-/g, '');
	start_Date = get_date_from_string(dateInputStart);
	end_Date = get_date_from_string(dateInputEnd);
	let diffDays = check_input();
	console.log(start_Date);
	console.log(end_Date);
	PlayerStatsArray = [];
	if(diffDays > 0 && diffDays <31)
	{
		let start_time = new Date();
		let counter = 0;
		let total_days = diffDays+1;
		end_Date.setDate(end_Date.getDate() + 1);
		for (var d = start_Date; d <= end_Date; d.setDate(d.getDate() + 1))
		{
			sliderUpdate(counter, total_days, 'Обработано '+counter + '/' + total_days + ' дней.');
			await delay(300);
			var date_string = d.getFullYear()+(d.getMonth()+1 < 10 ? '0' : '') + (d.getMonth()+1)+(d.getDate() < 10 ? '0' : '') + d.getDate();
			var date_string_for_user = d.getFullYear() + ' - ' + (d.getMonth()+1 < 10 ? '0' : '') + (d.getMonth()+1)+ ' - ' + (d.getDate() < 10 ? '0' : '') + d.getDate();
			var url = "https://www.mafiaonline.ru/api/api.php?action=log&param=list&date="+date_string;
			await ProcessLogList(url, date_string_for_user);
			console.log("PlayerStatsArray length : " + PlayerStatsArray.length);
			counter++;
		}
		let end_time = new Date();
		elapsed_time = (end_time - start_time)/1000;
		document.getElementById("Stage").innerHTML = 'Времени затрачено '+ (elapsed_time/60>>0) + ' мин. ' + (elapsed_time%60) + ' сек. ';
		display_table();
	}
}

function get_date_from_string(dateInputString)
{
	let dt = new Date(dateInputString.substring(0,4), dateInputString.substring(4,6) -1, dateInputString.substring(6,8));
	return dt;
}

function check_input()
{
	const date1 = start_Date;
	const date2 = end_Date;
	const diffTime = date2 - date1;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	if(diffDays < 0)
		alert("Начальная дата больше даты окончания");
	else if(diffDays > 31)
		alert("Разница между датами больше 31 дня");
	return diffDays;
}

async function ProcessLogList(url, date){
	let data = await (await fetch(url)).json();
	for(var key in data.games)
	{
		let cur_val = (parseInt(key)+1);
		sliderUpdate(cur_val, data.games.length, 'Обработываю лог № '+ data.games[key].id + ' (' + cur_val + '/' + data.games.length +')');
		ProcessLogId(data.games[key].id, data.games[key].constructor, date);
	}
	return;
	//await delay(500);
}

async function ProcessLogId(id, isConstr, date){
console.log(analyzeMoves);
	if(analyzeMoves)
		var url = "https://www.mafiaonline.ru/api/api.php?action=log&param=log&id="+id;
	else
		var url = "https://www.mafiaonline.ru/api/api.php?action=log&param=info&id="+id;
	let data = await (await fetch(url)).json();
	let inf0;
	if(analyzeMoves)
		inf0 = data.log;
	else
		inf0 = data.loginfo;
    var playersCount = Object.keys(inf0.players).length;
	//data is the JSON string
	for(var i =0; i< playersCount; i++)
	{
		if(isStringEqual(inf0.players[i].nick, PlayerName))
		{
            var ul = inf0.ul;
            var isVIP = inf0.vip;
            var result = inf0.result;
            var playerNicks = inf0.players.map(value => value.nick);
			var role = inf0.players[i].role;
			var status = inf0.players[i].state;
			var win = isWin(role,result);
			var gameStat = [date,
			id_to_ulr(id),
			ul_to_string(ul),
			bool_to_str(isVIP),
			bool_to_str(isConstr),
			result_to_string(result),
			role_to_string(role),
			status_to_string(status),
			bool_to_str(win),
			playersCount,playerNicks];
			if(analyzeMoves)
			{
				let moves = parse_moves(inf0.summary, inf0.players);
				gameStat.push(moves[0]);
				gameStat.push(moves[1]);
				gameStat.push(moves[2]);
			}
			PlayerStatsArray.push(gameStat);
		}
	}
	return;
}

function sliderUpdate(current, total, stage) {
	var elem = document.getElementById("myBar");
	var Stage = document.getElementById("Stage");
	var width = 1;
	frame();
	function frame() {
		width = (current)/(total)*100;
		if(width>=100)
			Stage.innerHTML = "Выполнено!";
		else	
			Stage.innerHTML = stage;
		elem.style.width = width + '%'; 
		elem.innerHTML = width.toFixed(2) + '%';
  }
}

function write_to_csv()
{
let csvContent = "data:text/csv;charset=utf-8,"
    + PlayerStatsArray.map(e => e.join(",")).join("\n");
var encodedUri = encodeURI(csvContent);
window.open(encodedUri);
}

function delay(delayTime)
{
	return new Promise(resolve => setTimeout(resolve,delayTime));
}
function isStringEqual(a, b) {
    return typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
        : a === b;
}