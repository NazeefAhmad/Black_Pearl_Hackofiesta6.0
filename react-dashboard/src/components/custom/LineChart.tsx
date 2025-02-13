import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const dummyData = {
    dates: [
        "2024-03-01", "2024-03-02", "2024-03-03", "2024-03-04", "2024-03-05",
        "2024-03-06", "2024-03-07", "2024-03-08", "2024-03-09", "2024-03-10"
    ],
    incidents: [520, 580, 610, 545, 590, 570, 612, 588, 605, 590]
};

const LineChart = () => {
    const seriesData = [{
        name: 'Total Incidents',
        data: dummyData.dates.map((date, index) => [
            new Date(date).getTime(),
            dummyData.incidents[index]
        ])
    }];

    const chartOptions: ApexOptions = {
        chart: {
            type: 'area',
            height: '100%',
            width: '100%',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
                type: 'x',
            },
            background: 'transparent'
        },
        colors: ['#ef4444'],
        grid: {
            padding: {
                left: 10,
                right: 10
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#dc2626'],
        },
        markers: {
            size: 4,
            colors: ['#dc2626'],
            strokeColors: '#fff',
            strokeWidth: 2,
        },
        title: {
            text: 'Daily Crime Incidents',
            align: 'left',
            style: {
                fontSize: '16px'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#ef4444',
                        opacity: 0.4
                    },
                    {
                        offset: 100,
                        color: '#ef4444',
                        opacity: 0.1
                    }
                ]
            },
        },
        yaxis: {
            title: {
                text: 'Number of Incidents'
            }
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            theme: 'dark',
            x: {
                format: 'dd MMM yyyy'
            }
        }
    };

    return (
        <div className="w-[500px] h-[300px]">
            <ReactApexChart 
                options={chartOptions}
                series={seriesData}
                type="area"
                height="100%"
                width="100%"
            />
        </div>
    );
}

export default LineChart;