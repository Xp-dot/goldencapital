var chart;
var colors = ['#FF8000', '#FFC040',"#00FF00", "#C0FF00", '#800080', '#FF4040', '#00C0FF', '#FFF700', '#0000CC', '#FF66B2', '#66FF66',
           '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function drawGraph(label_names, dataset_array, total_amount)
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
            tooltip: {
                callbacks: {
                    label: function(context) {
                        var label = context.dataset.label || '';
                        var index = context.dataIndex;
                        var percent = ((dataset_array[index] * 100)/ total_amount).toFixed(2);
                        label += label_names[index] + ": " + dataset_array[index] + " (" + percent + "%)";
                        return label;
                    }
                }
            },
            legend: {
                display: true,
                position : 'top'
            }
        }
    },
    plugins : [
    {
        beforeDraw: function(chart) {
        const ctx = chart.ctx;
        const {top, left, width, height} = chart.chartArea;

        var fontSize = (height / 500).toFixed(2);
        ctx.font = fontSize + "em bold serif";
        ctx.textBaseline = "middle";

        var text0 = "Всего : ";
        var text2 = "открытки.";
        var text =  total_amount,
            textX = width / 2 - ctx.measureText(text).width/2,
            textY = top + height / 2;

        //ctx.fillStyle = "#fd7e14";
        ctx.fillStyle = "#fd7e14";
        ctx.fillText(text, textX, textY);
        ctx.fillStyle = "#F5D18E";
        ctx.fillText(text0, textX-fontSize*10, textY - fontSize*30);
        ctx.fillStyle = "#F5D18E";
        ctx.fillText(text2, textX-fontSize*20, textY + fontSize*30);
        ctx.save();
      }
    }]

}
chart = new Chart(ctx, config);

}

Chart.register({

});