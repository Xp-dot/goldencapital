var PlayerStatsArray = [];
var PlayerName = "Desipere in loco";
var dateInput;
var isCountConstr = false;


async function get_logs_from_list(){
	DisplayArray =[];
	PlayerStatsArray = [];
	PlayerName = document.getElementById("nickNameInput").value;
	dateInput = document.getElementById("dateInput").value.replace(/-/g, '');
	start_Date = get_date(dateInput, true);
	end_Date = get_date(dateInput, false);
	let diffDays = check_input();
	let start_time = new Date();
    let counter = 0;
    let total_days = diffDays+1;
    end_Date.setDate(end_Date.getDate() + 1);
	for (var d = start_Date; d <= end_Date; d.setDate(d.getDate() + 1))
    {
        sliderUpdate(counter, total_days, 'Обработано '+counter + '/' + (total_days-1) + ' дней.');
        await delay(300);
        var date_string = d.getFullYear()+(d.getMonth()+1 < 10 ? '0' : '') + (d.getMonth()+1)+(d.getDate() < 10 ? '0' : '') + d.getDate();
        var date_string_for_user = (d.getMonth()+1 < 10 ? '0' : '') + (d.getMonth()+1)+ ' - ' + (d.getDate() < 10 ? '0' : '') + d.getDate();
        var url = "https://www.mafiaonline.ru/api/api.php?action=log&param=list&date="+date_string;
        await ProcessLogList(url, date_string_for_user);
        counter++;
    }
    await delay(300);
    let end_time = new Date();
    elapsed_time = (end_time - start_time)/1000;
    document.getElementById("Stage").innerHTML = 'Обработка закончена.Времени затрачено '+ (elapsed_time/60>>0) + ' мин. ' + (elapsed_time%60) + ' сек. ';
    drawBasicGraph('1');
}

function get_date(dateInputString, isStart)
{
    let dt;
    if(isStart)
	    dt = new Date(dateInputString.substring(0,4), dateInputString.substring(4,6) -1, 1);
    else
	    dt = new Date(dateInputString.substring(0,4), dateInputString.substring(4,6), 0);
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
//Function pushes all log ID's to array.
async function ProcessLogList(url, date){
    let data = await (await fetch(url)).json();
    for(var key in data.games)
    {
        let cur_val = (parseInt(key)+1);
        sliderUpdate(cur_val, data.games.length, 'Обработываю лог № '+ data.games[key].id + ' (' + cur_val + '/' + data.games.length +')');
        ProcessLogId(data.games[key].id, date);
    }
    return;
}

//Function pushes all log details to array, if this log contain playerNickname.
async function ProcessLogId(id, date){
	var url = "https://www.mafiaonline.ru/api/api.php?action=log&param=log&id="+id;
	let data = await (await fetch(url)).json();
    var ul = data.log.ul;
    var result = data.log.result;
    var playersCount = Object.keys(data.log.players).length;
    for(var i =0; i< playersCount; i++)
    {
        if(ul != "ul1" && ul != "ul2" && ul != "ul3" && ul != "ul4")
            continue;
        if(!isCountConstr && data.log.constructor)
            continue;
        if(isStringEqual(data.log.players[i].nick,PlayerName))
        {
            var role = data.log.players[i].role;
            var status = data.log.players[i].state;
            var win = isWin(role,result);
            var gameStat = [ul,result,role,status,win,id,date,playersCount];
            PlayerStatsArray.push(gameStat);
            break;
        }
    }
	return;
}

function isWin(role,result){
	if(role == 0 || role == 2 || role == 3 || role == 4 || role == 5 || role == 6 || role == 9 || role == 10)
	{
		if(result == 2)
			return true;
		else
			return false;
	}
	else if(role == 1 || role == 7 || role == 8 || role == 11)
	{
		if(result == 3)
			return true;
		else
			return false;
	}
	else if(role == 6 && result == 4)
	{
		return true;
	}
	else
		return false;
}

function changeIsCountConstr()
{
    isCountConstr = !isCountConstr;
}


function sliderUpdate(current, total, stage) {
	var Stage = document.getElementById("Stage");  
	var width = 1;
	frame();
	function frame() {
		width = (current)/(total)*100;
		if(width>=100)
			Stage.innerHTML = 'Обработка почти закончена! Осталось лишь выгнать лоста из города...';
		else	
			Stage.innerHTML = stage;
  }
}
function delay(delayTime)
{
	return new Promise(resolve => setTimeout(resolve,delayTime));
}
function contains(a, obj) {
	
    var i = a.length;
    while (i--) {
       if (a[i][0] === obj) {
           return true;
       }
    }
    return false;
}
function isStringEqual(a, b) {
    return typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
        : a === b;
}