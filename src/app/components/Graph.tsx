import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  populationData: {
    prefName: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
};

const Graph: React.FC<Props> = ({ populationData }) => {
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories = [];

  for (let p of populationData) {
    let data = [];

    for (let pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }
    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    });
  }
  const options: Highcharts.Options = {
    title: {
      text: "人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };
  return (
    <>
      <div className="graph">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default Graph;
