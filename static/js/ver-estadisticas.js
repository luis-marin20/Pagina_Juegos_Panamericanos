// Configuración del primer gráfico de torta
var hinchas = Highcharts.chart('container-hinchas', {
    chart: {
        type: 'pie',
        backgroundColor: 'rgba(0, 0, 0, 0)' // Fondo transparente
    },
    title: {
        text: 'Hinchas por deporte'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                style: {
                    color: 'black', // Color del texto
                    fontSize: '16px', // Tamaño de la fuente
                    fontWeight: 'bold' // Peso de la fuente
                },
                formatter: function () {
                    // Puedes personalizar el texto de las etiquetas aquí si es necesario
                    return this.point.name;
                }
            }
        }
    },
    series: [{
        name: 'Datos',
        data: []
    }]
});

// Configuración del segundo gráfico de torta
var artesanos = Highcharts.chart('container-artesanos', {
    chart: {
        type: 'pie',
        backgroundColor: 'rgba(0, 0, 0, 0)' // Fondo transparente
    },
    title: {
        text: 'Artesanos por tipo de artesania'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                style: {
                    color: 'black', // Color del texto
                    fontSize: '16px', // Tamaño de la fuente
                    fontWeight: 'bold' // Peso de la fuente
                },
                formatter: function () {
                    // Puedes personalizar el texto de las etiquetas aquí si es necesario
                    return this.point.name;
                }
            }
        }
    },
    series: [{
        name: 'Datos',
        data: []
    }]
});

fetch(`${window.origin}/obtener-datos-hinchas`)
    .then((response) => response.json())
    .then(datos => {

    // Get the chart by ID
    const chart = Highcharts.charts.find(
        (chart) => chart && chart.renderTo.id === "container-hinchas"
    );

    // Update the chart with new data
    chart.update({
        series: [
        {
            data: datos,
        },
        ],
    });
    })
    .catch((error) => console.error("Error:", error));

fetch(`${window.origin}/obtener-datos-artesanos`)
    .then((response) => response.json())
    .then(datos => {

    // Get the chart by ID
    const chart = Highcharts.charts.find(
        (chart) => chart && chart.renderTo.id === "container-artesanos"
    );

    // Update the chart with new data
    chart.update({
        series: [
        {
            data: datos,
        },
        ],
    });
    })
    .catch((error) => console.error("Error:", error));

//Vemos los hipervinculos
const redirigir = () => {
    window.location.href = "/";
}