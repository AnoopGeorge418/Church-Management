import React,{useEffect,useState} from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import Axios from "axios"

const PieChart = () => {
  const [familyPieChartData, setFamilyPieChartData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to calculate the total value for each age group
    function calculateTotalValue(data, label) {
      return data
        .filter(item => item.label === label)
        .reduce((sum, item) => sum + item.value, 0);
    }

    console.log("Fetching data...");

    Axios.get('http://localhost:5000/api/piechart')
      .then(response => {
        const data = response.data;
        setData(data);

        const totalAge0_19 = calculateTotalValue(data, "age 0-19");
        const totalAge19_39 = calculateTotalValue(data, "19-39");
        const totalAge40_50 = calculateTotalValue(data, "40-50");
        const totalAge50_60 = calculateTotalValue(data, "50-60");
        const totalAge60Above = calculateTotalValue(data, "60-above");

        // console.log("Family Pie Chart Data:", 999999);
        // console.log("Age 0-19:", data.filter(item => item.label === "age 0-19"), "Total:", totalAge0_19);
        // console.log("Age 19-39:", data.filter(item => item.label === "19-39"), "Total:", totalAge19_39);
        // console.log("Age 40-50:", data.filter(item => item.label === "40-50"), "Total:", totalAge40_50);
        // console.log("Age 50-60:", data.filter(item => item.label === "50-60"), "Total:", totalAge50_60);
        // console.log("Age 60-above:", data.filter(item => item.label === "60-above"), "Total:", totalAge60Above);

        // Define the familyPieChartData using the calculated total values
        const familyPieChartData = [
          {
            id: "age 0-19",
            label: "age0-19",
            value: totalAge0_19,
            color: "hsl(104, 70%, 50%)",
          },
          {
            id: "19-39",
            label: "19-39",
            value: totalAge19_39,
            color: "hsl(162, 70%, 50%)",
          },
          {
            id: "40-50",
            label: "40-50",
            value: totalAge40_50,
            color: "hsl(291, 70%, 50%)",
          },
          {
            id: "50-60",
            label: "50-60",
            value: totalAge50_60,
            color: "hsl(229, 70%, 50%)",
          },
          {
            id: "60-above",
            label: "60-above",
            value: totalAge60Above,
            color: "hsl(344, 70%, 50%)",
          },
        ];

        setFamilyPieChartData(familyPieChartData); // Set the state with the calculated data
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
        data={familyPieChartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={true}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
      
    />
  );
};

export default PieChart;