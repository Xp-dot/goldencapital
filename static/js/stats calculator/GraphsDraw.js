//var isStreetStat = false;
//var currentDrawFunction;
var chart;
var gr_type = 'bar';
var cur_opt = '1';
var colors = ['#FF8000', '#FFC040',"#00FF00", "#C0FF00", '#800080', '#FF4040', '#00C0FF', '#FFF700', '#0000CC', '#FF66B2', '#66FF66'];

function drawBasicGraph(option)
{
var ctx = document.getElementById('myChart').getContext('2d');
console.log(option);
cur_opt = option;
getArray(option);
console.log('Original Array : ');
console.log(DisplayArray);
if(typeof chart !== "undefined" || chart != null)
    chart.destroy();
let data_array = split_DisplayArray();
console.log('Final Array : ');
console.log(data_array[1]);
console.log('Labels_x : ');
console.log(data_array[0]);
let label_x = data_array[0][0];
let values_x = data_array[0].slice(1);
var config = {
    type: gr_type,
    data: {
        labels: values_x,
        datasets: data_array[1]
    },
    options: {
				responsive: true,
				scales: {
					xAxes: [{display: true, scaleLabel: {display: true, labelString: label_x}}],
					yAxes: [{display: true, scaleLabel: {display: false}, ticks: {beginAtZero: true}}]
				}
			}
}
chart = new Chart(ctx, config);

}
function split_DisplayArray()
{
    let need_transpose = DisplayArray[0].length > 2;
    console.log('need transpose : ' + need_transpose);
    let DisplayArray_checked = need_transpose ? DisplayArray[0].map((col, i) => DisplayArray.map(row => row[i])) : DisplayArray;
    console.log('Checked Array : ');
    console.log(DisplayArray_checked);
    let labels_x_array = DisplayArray_checked[0];
    let DAT_rows = DisplayArray_checked.length;
    let DAT_cols = labels_x_array.length;
    let DataArray = [];
    if(!need_transpose) labels_x_array = [DisplayArray_checked[0][0],''];
    for(var i = 1; i < DAT_rows; i++)
    {
        let label_y = DisplayArray_checked[i][0];
        let new_color = colors[i-1];
        DataArray.push(
        {
            label: label_y,
            fill: false,
            backgroundColor: new_color,
            borderColor: new_color,
            data: DisplayArray_checked[i].slice(1)
        }
        );
    }
    return [labels_x_array, DataArray];
}

function get_graphic_color(rows, cols)
{
    var ret_colors = [];
    if(rows <=2 && cur_opt != '1')
        for(var col = 0; col < cols-1; col++)
            ret_colors.push(colors.splice(Math.floor(Math.random() * Math.floor(colors.length)),1));
    else
        ret_colors = colors[Math.floor(Math.random() * Math.floor(colors.length))];
    return ret_colors;
}

function change_type(graph_type)
{
    gr_type = graph_type;
    drawBasicGraph(cur_opt);
}