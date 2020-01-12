import AbstractSmartComponent from './abstract-smart-component';
import Chart from "chart.js";
import chartjsPluginDatalabes from "chartjs-plugin-datalabels";
import { differenceInHours } from 'date-fns';

import 'chart.js/dist/Chart.min.css';

const TitleName = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME: `TIME SPENT`
};

const LabelPrefix = {
  EURO: `€`,
  TIMES: `x`,
  HOURS: `h`
};

const generateChartsData = (points) => {
  const moneyStatistics = {};
  const transportStatistics = {
    taxi: 0,
    bus: 0,
    train: 0,
    ship: 0,
    transport: 0,
    drive: 0
  };
  const timeStatistics = {};

  points.forEach((point) => {
    if (point.type.id in moneyStatistics) {
      moneyStatistics[point.type.id] += Number(point.price);
    } else {
      moneyStatistics[point.type.id] = Number(point.price);
    }

    if (point.type.id in transportStatistics) {
      transportStatistics[point.type.id] += 1;
    }

    if (point.type.id in timeStatistics) {
      timeStatistics[point.type.id] += differenceInHours(point.endTime, point.startTime);
    } else {
      timeStatistics[point.type.id] = differenceInHours(point.endTime, point.startTime);
    }
  });

  const moneyData = Object.entries(moneyStatistics)
    .filter((item) => item[1] !== 0)
    .sort((a, b) => b[1] - a[1]);

  const transportData = Object.entries(transportStatistics)
    .filter((item) => item[1] !== 0)
    .sort((a, b) => b[1] - a[1]);

  const timeData = Object.entries(timeStatistics)
    .filter((item) => item[1] !== 0)
    .sort((a, b) => b[1] - a[1]);

  return {
    moneyData,
    transportData,
    timeData
  };
};

const renderChart = (ctx, data, label, title, isLabelPositionLeft = false) => {
  return new Chart(ctx, {
    type: `horizontalBar`,
    plugins: [chartjsPluginDatalabes],
    data: {
      labels: data.map((item) => item[0].toUpperCase()),
      datasets: [
        {
          data: data.map((item) => item[1]),
          backgroundColor: `#ffffff`,
          borderColor: `#ffffff`,
          borderWidth: 1,
          borderSkipped: false,
          barThickness: 30,
          barPercentage: 1.0
        }
      ]
    },
    options: {
      layout: {
        padding: {
          left: 40,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      responsive: false,
      aspectRatio: 2.2,
      legend: {
        display: false,
      },
      tooltips: {
        mode: `nearest`,
        titleAlign: `left`
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              display: false,
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontSize: 14
            }
          }
        ]
      },
      plugins: {
        datalabels: {
          labels: {
            title: {
              font: {
                weight: `bold`,
                size: 16
              }
            }
          },
          anchor: `end`,
          align: `left`,
          formatter(value) {
            return isLabelPositionLeft ? `${label}${value}` : `${value}${label}`;
          }
        }
      },
      title: {
        display: true,
        position: `left`,
        fontSize: 26,
        fontColor: `#424242`,
        fontStyle: `bold`,
        text: title.toUpperCase(),
      },
    }
  });
};

const getStatisticsTemplate = () => {
  return (`
  <section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money js-statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport js-statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time js-statistics__chart--time" width="900"></canvas>
    </div>
  </section>
  `);
};

class Statistics extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._renderCharts = this._renderCharts.bind(this);
  }

  getTemplate() {
    return getStatisticsTemplate();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.js-statistics__chart--money`);
    const transportCtx = element.querySelector(`.js-statistics__chart--transport`);
    const timeCtx = element.querySelector(`.js-statistics__chart--time`);

    this._resetCharts();

    const { moneyData, transportData, timeData } = generateChartsData(
        this._pointsModel.getPoints()
    );

    this._moneyChart = renderChart(
        moneyCtx,
        moneyData,
        LabelPrefix.EURO,
        TitleName.MONEY,
        true
    );
    this._transportChart = renderChart(
        transportCtx,
        transportData,
        LabelPrefix.TIMES,
        TitleName.TRANSPORT
    );
    this._timeChart = renderChart(
        timeCtx,
        timeData,
        LabelPrefix.HOURS,
        TitleName.TIME
    );
  }

  rerender() {
    super.rerender();
    this._renderCharts();
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._colorsChart) {
      this._colorsChart.destroy();
      this._colorsChart = null;
    }
  }

  show() {
    super.show();

    this.rerender();
  }

  recoveryListeners() {}

}

export { Statistics as default };
