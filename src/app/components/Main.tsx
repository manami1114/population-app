"use client";

import React, { useEffect, useState } from "react";
import CheckFiled from "./CheckFiled";
import Graph from "./Graph";
import axios from "axios";

function Main() {
  const [prefectures, setPrefectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);
  const [prefPopulation, setPrefPopulation] = useState<
    {
      prefName: string;
      data: {
        year: number;
        value: number;
      }[];
    }[]
  >([]);
  const [dataType, setDataType] = useState("0");
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY },
      })
      .then((res) => {
        setPrefectures(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClickCheck = (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    let c_prefPopulation = prefPopulation.slice();

    if (check) {
      setCheckedPrefCodes((prev) => [...prev, prefCode]);
      if (
        c_prefPopulation.findIndex((value) => value.prefName === prefName) !==
        -1
      )
        return;
      axios
        .get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${String(
            prefCode
          )}`,
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        )
        .then((res) => {
          let dataIndex = parseInt(dataType, 10);
          c_prefPopulation.push({
            prefName: prefName,
            data: res.data.result.data[dataIndex].data,
          });
          setPrefPopulation(c_prefPopulation);
        })
        .catch((error) => console.error(error));
    } else {
      setCheckedPrefCodes((prev) => prev.filter((code) => code !== prefCode));
      const deleteIndex = c_prefPopulation.filter(
        (value) => value.prefName !== prefName
      );
      setPrefPopulation(deleteIndex);
    }
  };
  return (
    <>
      <h2 className="sub-title">人口データの種類</h2>
      <select
        id="selectType"
        onChange={(e) => {
          setDataType(e.target.value);
          setPrefPopulation([]);
          setCheckedPrefCodes([]);
        }}
      >
        <option value="0">総人口</option>
        <option value="1">年少人口</option>
        <option value="2">生産年齢人口</option>
        <option value="3">老年人口</option>
      </select>
      <h2 className="sub-title">都道府県</h2>
      {prefectures && (
        <CheckFiled
          prefectures={prefectures.result}
          onChange={handleClickCheck}
          checkedPrefCodes={checkedPrefCodes}
        />
      )}
      <h2 className="sub-title">人口推移グラフ</h2>
      <Graph populationData={prefPopulation} />
    </>
  );
}

export default Main;
