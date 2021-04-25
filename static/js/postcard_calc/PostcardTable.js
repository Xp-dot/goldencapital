function display_table(postcards_arr)
{
	var table = document.createElement("table");
	table.setAttribute("class", "table table-dark w-auto");
	table.setAttribute("id", "sortableTable");
	for(var rw of postcards_arr)
	{
		var row = table.insertRow();
		for(var stat of rw)
		{
			var cell = row.insertCell();
			cell.innerHTML = stat;
		}
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
    /*$('#checkboxContainer').show();
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
	 });*/
} );
}
function createHeader(row)
{
	row.insertCell().outerHTML = "<th>Ник</th>";
	row.insertCell().outerHTML = "<th>Дата</th>";
	row.insertCell().outerHTML = "<th>ID игрока</th>";
	row.insertCell().outerHTML = "<th>ID подарка</th>";
	row.insertCell().outerHTML = "<th>Подпись</th>";
}