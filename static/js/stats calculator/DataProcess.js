var DisplayArray =[];
var API_rolesCount = 11;
var API_ulCount = 5;


function getWinLosesArray(data_array){
	var wins = 0;
	for(var i =0; i<data_array.length;i++)
	{
		if(data_array[i][4])
			wins++;
	}
	return [
	  ['Победы/поражения', 'Количество игр'],
	  ['Победы',     wins],
	  ['Поражения',      PlayerStatsArray.length-wins]
	];
}

function getRolesArray(data_array){
	let rolesArr = new Array(API_rolesCount).fill(0);
	for(var i =0; i<data_array.length;i++)
	    rolesArr[data_array[i][2]]++;
	let temp_retArr = [['Роли', 'Количество игр']];
	for(var i =0; i < API_rolesCount; i++)
	    temp_retArr.push([role_to_string(i), rolesArr[i]]);
	return temp_retArr;
}

function getRolesWinRateArray(data_array){
	let rolesArr = new Array(API_rolesCount).fill(0);
	let rolesWinArr = new Array(API_rolesCount).fill(0);
	for(var i =0; i<data_array.length;i++)
	{
		let role = data_array[i][2];
		rolesArr[role]++;
		if (data_array[i][4]) rolesWinArr[role]++;
	}
	var temp_retArr = [['Роли', 'Победы', 'Поражений']];
	for(var i =0; i < API_rolesCount; i++)
	    if(rolesArr[i] > 0 ) temp_retArr.push([role_to_string(i), rolesWinArr[i], rolesArr[i] - rolesWinArr[i]]);
	return temp_retArr;
}

function getStreetsWinRateArray(data_array){
	// Создаем 2д массив с к-вом строк = API_ulCount; К-во столбиков = API_rolesCount; Заполняем его 0;
	let rolesArr = Array(API_ulCount).fill().map(() => Array(API_rolesCount).fill(0));
	let rolesWinArr = Array(API_ulCount).fill().map(() => Array(API_rolesCount).fill(0));
	for(var i =0; i<data_array.length;i++)
	{
		try
		{
			let street_index = ul_to_int(data_array[i][0]);
			let role = data_array[i][2];
			let isWin = data_array[i][4];
			rolesArr[street_index][role]++;
			if(isWin) rolesWinArr[street_index][role]++;
		}
		catch(e)
		{
			console.log(e);
		}
	}	
	var temp_retArr = [['Роли','Победы:Крещение', 'Победы:Ожидания','Победы:Сумрак', 'Победы:Правосудия', 'Поражения:Крещения','Поражения:Ожидания', 'Поражения:Сумрак', 'Поражения:Правосудия']];
	for(var i =0; i < API_rolesCount; i++)
	{
		let Crest_wins = 0, Crest_lose = 0 , Oja_wins = 0, Oja_lose = 0, Sumrak_wins = 0, Sumrak_lose = 0, Justice_wins = 0, Justice_lose = 0;
	    if(rolesArr[0][i] > 0 ) 
		{
			Crest_wins = rolesWinArr[0][i];
			Crest_lose = rolesArr[0][i] - rolesWinArr[0][i];
		}
		if(rolesArr[1][i] > 0 ) 
		{
			Oja_wins = rolesWinArr[1][i];
			Oja_lose = rolesArr[1][i] - rolesWinArr[1][i];
		}
		if(rolesArr[2][i] > 0 ) 
		{
			Sumrak_wins = rolesWinArr[2][i];
			Sumrak_lose = rolesArr[2][i] - rolesWinArr[2][i];
		}
		if(rolesArr[3][i] > 0 ) 
		{
			Justice_wins = rolesWinArr[3][i];
			Justice_lose = rolesArr[3][i] - rolesWinArr[3][i];
		}
		temp_retArr.push([role_to_string(i), Crest_wins, Oja_wins, Sumrak_wins, Justice_wins, Crest_lose, Oja_lose, Sumrak_lose, Justice_lose]);	
	}
	return temp_retArr;
}

function getSurviveStat(data_array){
	var ziv = 0, mertv = 0, v_turme = 0, time = 0;
	for(var i =0; i<data_array.length;i++)
	{
		if(data_array[i][3] == 0)
			ziv++;
		else if(data_array[i][3] == 1 || data_array[i][3] == 4)
			mertv++;
		else if(data_array[i][3] == 2)
			v_turme++;
		else
			time++;
	}
	return [
	  ['Выживаемость', 'Количество игр'],
	  ['Дожил до конца партии',     ziv],
	  ['Убит(маньяком или мафией)',     mertv],
	  ['В тюрьме',     v_turme],
	  ['Ушел в тайм',      time]
	];
}

function getStreetStats(data_array){
	var kresti = 0, oja = 0, sumrak = 0, justice = 0;
	for(var i =0; i<data_array.length;i++)
	{
		if(data_array[i][0] == "ul1")
			kresti++;
		else if(data_array[i][0] == "ul2")
			oja++;
		else if(data_array[i][0] == "ul3")
			sumrak++;
		else if(data_array[i][0] == "ul3")
			sumrak++;
		else if(data_array[i][0] == "ul4")
			justice++;
		else
		{}
	}
	return [
	  ['Улица', 'Количество игр'],
	  ['Улица крещения',     kresti],
	  ['Улица ожидания',     oja],
	  ['Улица сумрака',     sumrak],
	  ['Улица Правосудия',     justice]
	];
}

function getStatsPerDay(data_array)
{
	var DateArray = [['День','Победы','Всего игр']];
	for(var i =0; i<data_array.length;i++)
	{
		var date = DateArray[DateArray.length - 1][0];
		if(date != data_array[i][6])
			DateArray.push([data_array[i][6], 0, 1]);
		else
			DateArray[DateArray.length - 1][2] += 1;
		if(data_array[i][4])
			DateArray[DateArray.length - 1][1] += 1;
	}
	return DateArray;
}

function getStreetStatsPerDay(data_array)
{
	var DateArray = [['День','7ки','9ки','13ки','17ки']];
	for(var i =0; i<data_array.length;i++)
	{
		var date = DateArray[DateArray.length - 1][0];
		if(date != data_array[i][6])
			DateArray.push([data_array[i][6], 0, 0, 0, 0]);
		if(data_array[i][7]==7)
			DateArray[DateArray.length - 1][1] += 1;
		else if(data_array[i][7]==9)
			DateArray[DateArray.length - 1][2] += 1;
		else if(data_array[i][7]==13)
			DateArray[DateArray.length - 1][3] += 1;
		else if(data_array[i][7]==17)
			DateArray[DateArray.length - 1][4] += 1;
	}
	return DateArray;
}

async function getArray(option){
	switch(option)
	{
		case "1":
		DisplayArray = getWinLosesArray(PlayerStatsArray);
		break;
		case "2":
		DisplayArray = getRolesArray(PlayerStatsArray);
		break;
		case "3":
		DisplayArray = getSurviveStat(PlayerStatsArray);
		break;
		case "4":
		DisplayArray = getStreetStats(PlayerStatsArray);
		break;
		case "5":
		DisplayArray = getRolesWinRateArray(PlayerStatsArray);
		break;
		case "6":
		DisplayArray = getStreetsWinRateArray(PlayerStatsArray);
		break;
		case "7":
		DisplayArray = getStatsPerDay(PlayerStatsArray);
		break;
		case "8":
		DisplayArray = getStreetStatsPerDay(PlayerStatsArray);
		break;
	}
	await delay(300);
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