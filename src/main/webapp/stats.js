google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawPopulationChart);

google.charts.setOnLoadCallback(drawStatsChart);

function drawPopulationChart() {

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Race');
    data.addColumn('number', 'Percentage');
    data.addRows([
        ['White', 60],
        ['Black', 13],
        ['Hispanic', 12],
        ['Other', 15]
    ]);

    const options = {
        'title': 'Racial Demographic of US Population',
        'width':500,
        'height':400
    };

    var chart = new google.visualization.PieChart(document.getElementById('population_chart'));
    chart.draw(data, options);
}

function drawStatsChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Race');
    data.addColumn('number', 'Death per million');
    data.addRows([
        ['Black', 31],
        ['Hispanic', 23],
        ['White', 13],
        ['Other', 4]
    ]);

    var options = {title:'Number of People Killed by Police since 2015',
    width:400,
    height:500};

    var chart = new google.visualization.ColumnChart(document.getElementById('stats_chart'));
    chart.draw(data, options);
}
