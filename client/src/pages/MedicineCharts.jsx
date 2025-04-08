import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import moment from "moment";

const MedicineChart = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'rangeBar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const label = opts.w.globals.labels[opts.dataPointIndex];
        const a = moment(val[0]);
        const b = moment(val[1]);
        const diff = b.diff(a, 'days');
        return label + ': ' + diff + (diff > 1 ? ' days' : ' day');
      },
      style: {
        colors: ['#f3f4f5', '#fff']
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      show: false
    },
    grid: {
      row: {
        colors: ['#f3f4f5', '#fff'],
        opacity: 1
      }
    }
  });

  useEffect(() => {
    axios.get("http://localhost:8800/medicine")
      .then(response => {
        const data = response.data;

        // Transform data for the chart
        const transformedData = data.map(item => {
          const start = new Date(item.startDate).getTime();
          const end = new Date(item.endDate).getTime();

          return {
            x: item.medicine,
            y: [start, end],
            fillColor: "#89CFF0"  // Set the bar color to light blue
          };
        });

        setSeries([{ data: transformedData }]);
      })
      .catch(error => {
        console.error("Failed to load medicine intervals:", error);
      });
  }, []);

  return (
    <div>
      <Chart options={options} series={series} type="rangeBar" height={350} />
    </div>
  );
};

export default MedicineChart;