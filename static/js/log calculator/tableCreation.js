function display_table()
{
	var table = document.createElement("table");
	table.setAttribute("class", "table table-dark w-auto");
	table.setAttribute("id", "sortableTable");
	console.log(PlayerStatsArray);
	for(var rw of PlayerStatsArray)
	{
		var row = table.insertRow();
		let moves =  rw.pop();
		for(var stat of rw)
		{
			console.log(stat);
			var cell = row.insertCell();
			cell.innerHTML = stat;
		}
		var cell = row.insertCell();
		cell.outerHTML = "<td title='" + moves + "'>Наведите</td>";
	}
	var header = table.createTHead();
	var row = header.insertRow(0);
	createHeader(row);
	$('#Container').empty().append(table);
	
	$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('#sortableTable thead tr').clone(true).appendTo( '#sortableTable thead' );
    $('#sortableTable thead tr:eq(1) th').each( function (i) {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder=" '+title+'" />' );
 
        $( 'input', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .draw();
            }
        } );
    } );
 
    var table = $('#sortableTable').DataTable( {
        orderCellsTop: true,
         "scrollX": true,
		language: 
		{
			"processing": "Подождите...",
			"search": "Поиск:",
			"lengthMenu": "Показать _MENU_ записей",
			"info": "Записи с _START_ до _END_ из _TOTAL_ записей",
			"infoEmpty": "Записи с 0 до 0 из 0 записей",
			"infoFiltered": "(отфильтровано из _MAX_ записей)",
			"infoPostFix": "",
			"loadingRecords": "Загрузка записей...",
			"zeroRecords": "Записи отсутствуют.",
			"emptyTable": "В таблице отсутствуют данные",
			"paginate": 
			{
				"first": "Первая",
				"previous": "Предыдущая",
				"next": "Следующая",
				"last": "Последняя"
			},
			"aria": 
			{
				"sortAscending": ": активировать для сортировки столбца по возрастанию",
				"sortDescending": ": активировать для сортировки столбца по убыванию"
			},
			"select": 
			{
				"rows": 
				{
					"_": "Выбрано записей: %d",
					"0": "Кликните по записи для выбора",
					"1": "Выбрана одна запись"
				}
			}
		}
    } );
    $('#checkboxContainer').show();
	$('input.custom-control-input').on( 'click', function (e) {
        //e.preventDefault();

        // Get the column API object
        var column = table.column( $(this).attr('data-column') );

        // Toggle the visibility
        column.visible( ! column.visible() );
		$(this).attr("checked", column.visible());
    } );
	$('#sortableTable thead tr:eq(1) th').each( function (i) {
		table.column(i).visible( $('#Inline'+i).attr("checked") == 'checked');
	 });
} );
}
function createHeader(row)
{
	row.insertCell().outerHTML = "<th>Дата</th>";
	row.insertCell().outerHTML = "<th>Лог</th>";
	row.insertCell().outerHTML = "<th>Улица</th>";
	row.insertCell().outerHTML = "<th>Вип</th>";
	row.insertCell().outerHTML = "<th>Конструктор</th>";
	row.insertCell().outerHTML = "<th>Исход партии</th>";
	row.insertCell().outerHTML = "<th>Роль игрока</th>";
	row.insertCell().outerHTML = "<th>Статус в конце игры</th>";
	row.insertCell().outerHTML = "<th>Победа игрока</th>";
	row.insertCell().outerHTML = "<th>К-во игроков</th>";
	row.insertCell().outerHTML = "<th>Игроки</th>";
	if(analyzeMoves)
	{
		row.insertCell().outerHTML = "<th>Создатель</th>";
		row.insertCell().outerHTML = "<th>Комментарий</th>";
		row.insertCell().outerHTML = "<th>Ходы</th>";
	}
}