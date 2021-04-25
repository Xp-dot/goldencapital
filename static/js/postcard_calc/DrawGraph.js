var chart;
var colors = ['#FF8000', '#FFC040',"#00FF00", "#C0FF00", '#800080', '#FF4040', '#00C0FF', '#FFF700', '#0000CC', '#FF66B2', '#66FF66'];

function drawGraph(label_names, dataset_array)
{
var ctx = document.getElementById('postcard_Chart').getContext('2d');

if(typeof chart !== "undefined" || chart != null)
    chart.destroy();
var config = {
    type: "doughnut",
    data: {
        labels: label_names,
        datasets: [{
            label: "",
            data: dataset_array,
            backgroundColor: colors,
            hoverOffset : 4
        }]
    },
    options:
    {
        plugins: {
            legend: {
                display: true,
                position : 'top'
            }
        }
    }
}
chart = new Chart(ctx, config);

}