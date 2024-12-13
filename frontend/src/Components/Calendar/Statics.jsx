import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import PropTypes from 'prop-types';

function getWeekNumber(date) {
    // Clona a data para não mutar
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

const Statistics = ({ eventsData }) => {
    // Agrupamento Diário
    const dailyCounts = {};
    eventsData.forEach((event) => {
        const day = event.start.slice(0, 10); // 'YYYY-MM-DD'
        dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    });
    const dailyLabels = Object.keys(dailyCounts).sort();
    const dailyData = dailyLabels.map((date) => dailyCounts[date]);

    const dailyChartData = {
        labels: dailyLabels,
        datasets: [
            {
                label: 'Consultas por Dia',
                data: dailyData,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    // Agrupamento Semanal
    const weeklyCounts = {};
    eventsData.forEach((event) => {
        const eventDate = new Date(event.start);
        const week = getWeekNumber(eventDate);
        weeklyCounts[week] = (weeklyCounts[week] || 0) + 1;
    });
    const weeklyLabels = Object.keys(weeklyCounts).sort();
    const weeklyData = weeklyLabels.map((week) => weeklyCounts[week]);

    const weeklyChartData = {
        labels: weeklyLabels,
        datasets: [
            {
                label: 'Consultas por Semana',
                data: weeklyData,
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
            },
        ],
    };

    // Agrupamento Mensal
    const monthlyCounts = {};
    eventsData.forEach((event) => {
        const month = event.start.slice(0, 7); // 'YYYY-MM'
        monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });
    const monthlyLabels = Object.keys(monthlyCounts).sort();
    const monthlyData = monthlyLabels.map((m) => monthlyCounts[m]);

    const monthlyChartData = {
        labels: monthlyLabels,
        datasets: [
            {
                label: 'Consultas por Mês',
                data: monthlyData,
                backgroundColor: 'rgba(255,159,64,0.4)',
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className=" items-center justify-around">
            <div style={{ padding: '20px' }}>
                <h2>Estatísticas de Consultas</h2>

                <h3>Diário</h3>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <Bar data={dailyChartData} />
                </div>

                <h3>Semanal</h3>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <Bar data={weeklyChartData} />
                </div>

                <h3>Mensal</h3>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <Bar data={monthlyChartData} />
                </div>
            </div>
        </div>
    );
};

Statistics.propTypes = {
    eventsData: PropTypes.array.isRequired,
};
export default Statistics;
