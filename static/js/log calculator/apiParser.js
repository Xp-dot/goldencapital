function bool_to_str(bool)
{
	if(bool)
		return 'Да';
	else
		return 'Нет';
}

function isWin(role,result){
	if(role == 0 || role == 2 || role == 3 || role == 4 || role == 5 || role == 9 || role == 10)
	    return (result==2) ? true : false;
	else if(role == 1 || role == 7 || role == 8 || role == 11)
	    return (result==3) ? true : false;
	else if(role == 6 && result == 4)
		return true;
	else
		return false;
}

function result_to_string(result)
{
	switch(result)
	{
		case 0 : return 'партия остановлена';
		case 1 : return 'ничья';
		case 2 : return 'победа города';
		case 3 : return 'победа мафии';
		case 4 : return 'победа маньяка';
		default: return 'Неизвестный исход';
	}
}

function id_to_ulr(id)
{
	return "<a href = "+ "https://www.mafiaonline.ru/log/" + id + "  target='_blank'>" + id + " </a> ";
}

function ul_to_string(ul)
{
	switch(ul)
	{
		case 'ul1' : return 'Улица Крещения';
		case 'ul2' : return 'Улица Ожидания';
		case 'ul3' : return 'Сумеречный переулок';
		case 'ul4' : return 'Улица Правосудия';
		case 'ulv' : return 'VIP-клуб';
		default: return 'Неизвестная локация';
	}
}

function ul_to_int(ul)
{
	switch(ul)
	{
		case 'ul1' : return 0;
		case 'ul2' : return 1;
		case 'ul3' : return 2;
		case 'ul4' : return 3;
		case 'ulv' : return 4;
		default: return -1;
	}
}

function status_to_string(status)
{
	switch(status)
	{
		case 0 : return 'жив';
		case 1 : return 'убит мафией';
		case 2 : return 'посажен в тюрьму';
		case 3 : return 'вышел по тайму';
		case 4 : return 'убит маньяком';
		case 5 : return 'заморожен боссом';
		case 6 : return 'убит шерифом';
		default: return 'Неизвестный исход';
	}
}

function role_to_string(role_id)
{
	switch(role_id)
	{
		case 0 : return 'Честный';
		case 1 : return 'Мафия';
		case 2 : return 'Комиссар';
		case 3 : return 'Внебрачное дитя босса';
		case 4 : return 'Сержант';
		case 5 : return 'Доктор';
		case 6 : return 'Маньяк';
		case 7 : return 'Босс';
		case 8 : return 'Хулиган';
		case 9 : return 'Шериф';
		case 10 : return 'Телохранитель';
		case 11 : return 'Адвокат';
		default: return 'Неизвестная роль';
	}
}
function parse_moves(summary, players)
{
    let creator = $(summary).filter(function() { return $(this).text().indexOf('Создатель партии — ') > -1});
    creator = (creator.length > 0) ? creator[0].innerText.replace('Создатель партии — ','')  : '---';
    let comment = $(summary).filter(function() { return $(this).text().indexOf('Комментарий к заявке:') > -1});
    comment = (comment.length > 0) ? comment[0].innerText.replace('Комментарий к заявке:','') : '---';
	let vPool = $(summary).filter(function() {return ($(this).text().indexOf(PlayerName) > -1 || $(this).text().indexOf('Ход') > -1) || $(this).text().indexOf('Игра окончена') > -1 || $(this).text().indexOf('убит') > -1 || $(this).text().indexOf('отправлен') > -1});
	//var parsedDataPlayers = JSON.parse(players);
	let finalString = "";
	$(vPool).each(function() {
		var text = $(this).text();
		$.each( players, function( index, val ){
			text = text.replace(val.nick, val.nick + ' (' + role_to_string(val.role) + ')' );
		});
		finalString += text + "\n";

	});
	return [creator, comment, finalString];
}