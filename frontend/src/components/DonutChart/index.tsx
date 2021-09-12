import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[],
    series: number[]
}

const DonutChart = () => {

    // Forma Errada
    // let chartData: ChartData = {
    //     labels: [],
    //     series: []
    // };

    // Forma Errada - Pois a requisição é feita mais de uma vez. UseEffect corrigi esse problema.
    // Além de não popular o gráfico(chartData não recebe os valores), pois é uma funcão assincrona. setChartData resolve esse problema.
    // axios.get(`${BASE_URL}/sales/amount-by-seller`)
    //     .then(response => {
    //         const data = response.data as SaleSum[];
    //         const myLabels = data.map(x => x.sellerName);
    //         const mySeries = data.map(x => x.sum);

    //         chartData = { labels: myLabels, series: mySeries };
    //         console.log(chartData);
    //     });

    // Forma Correta
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(response => {
                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);

                // Agora a const chartData recebe os valores, pois é alterado o estado dela
                setChartData({ labels: myLabels, series: mySeries });
                console.log(chartData);
            });
    }, []);

    // const mockData = {
    //     series: [477138, 499928, 444867, 220426, 473088],
    //     labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    // }

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;