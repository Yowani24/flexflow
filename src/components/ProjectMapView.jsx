import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import { TbListDetails } from "react-icons/tb";
import ProjectSpecification from "./ProjectSpecification";
import { useLang } from "../../hook/LangContext";

if (typeof Highcharts === "object") {
  HighchartsGantt(Highcharts);
}

const ProjectMapView = ({ projectData, projectName }) => {
  const { translations } = useLang();
  const projectProgress = projectData.map((item) => {
    if (item.tasks) {
      const relevantTasks = item.tasks.filter(
        (task) => task.responsibles.length > 0
      );
      if (relevantTasks.length > 0) {
        const totalProgress = relevantTasks.reduce(
          (accumulator, currentItem) => accumulator + currentItem.progress,
          0
        );
        const averageProgress = Math.ceil(totalProgress / relevantTasks.length);
        return averageProgress;
      } else {
        return 0;
      }
    } else {
      return null;
    }
  });

  const day = 24 * 36e5;
  // const today = Math.floor(Date.now() / day) * day;
  const today = Math.floor(Date.now());
  // const today = new Date();
  // console.log("DATA:", today);

  const startD = "2024-01-22T15:00:58.580Z";
  const projendD = "2024-06-30T15:00:58.580Z";
  const endD = "2024-05-30T15:00:58.580Z";

  const options = {
    chart: {
      plotBackgroundColor: "rgba(128,128,128,0.02)",
      plotBorderColor: "rgba(128,128,128,0.1)",
      plotBorderWidth: 1,
    },
    credits: { enabled: false },
    plotOptions: {
      series: {
        borderRadius: "50%",
        connectors: {
          dashStyle: "ShortDot",
          lineWidth: 2,
          radius: 5,
          startMarker: {
            enabled: false,
          },
        },
        groupPadding: 0,

        dataLabels: [
          {
            enabled: true,
            align: "left",
            format: "{point.name}",
            padding: 10,
            style: {
              fontWeight: "normal",
              textOutline: "none",
            },
          },
          {
            enabled: true,
            align: "right",
            format:
              "{#if point.completed}{(multiply point.completed.amount 100):.0f}%{/if}",
            padding: 10,
            style: {
              fontWeight: "normal",
              textOutline: "none",
              opacity: 0.6,
            },
          },
        ],
      },
    },

    series: [
      {
        name: translations.project,
        data: [
          {
            name: "Projeto", //translations.development,
            id: "new_project",
            owner: "Peter",
            start: Math.floor(
              Date.parse(projectData.map((item) => item.created_at))
            ),
            end: Math.floor(Date.parse(projendD)),
          },
          {
            name: translations.development,
            id: "development",
            parent: "new_project",
            start: Math.floor(Date.parse(null)),
            end: Math.floor(Date.parse(endD)),
            completed: {
              amount: projectProgress ? projectProgress / 100 : 0,
              fill: "#e80",
            },
            owner: "Susan",
          },
          {
            name: "Beta",
            id: "beta",
            dependency: "development",
            parent: "new_project",
            start: Math.floor(Date.parse(null)),
            milestone: true,
            owner: "Peter",
          },
          {
            name: translations.final_development,
            id: "finalize",
            dependency: "beta",
            parent: "new_project",
            start: Math.floor(Date.parse(null)),
            // end: today + 17 * day,
          },
          {
            name: translations.launch,
            dependency: "finalize",
            parent: "new_project",
            start: Math.floor(Date.parse(null)),
            milestone: true,
            owner: "Peter",
          },
        ],
      },
    ],
    tooltip: {
      pointFormat:
        '<span style="font-weight: bold">{point.name}</span><br>' +
        "{point.start:%e %b}" +
        "{#unless point.milestone} → {point.end:%e %b}{/unless}" +
        "<br>" +
        "{#if point.completed}" +
        "Completed: {multiply point.completed.amount 100}%<br>" +
        "{/if}" +
        "Owner: {#if point.owner}{point.owner}{else}unassigned{/if}",
    },
    title: {
      text: projectName,
    },
    xAxis: [
      {
        currentDateIndicator: {
          color: "#2caffe",
          dashStyle: "ShortDot",
          width: 2,
          label: {
            format: "",
          },
        },
        dateTimeLabelFormats: {
          day: '%e<br><span style="opacity: 0.5; font-size: 0.7em">%a</span>',
        },
        grid: {
          borderWidth: 0,
        },
        gridLineWidth: 1,
        // min: today - 3 * day,
        // max: today + 18 * day,
        custom: {
          today,
          weekendPlotBands: true,
        },
        tickInterval: 30 * day, // Set tick interval to approximate one month
        // tickPositions: (() => {
        //   const positions = [];
        //   const currentDate = new Date(today - 3 * day); // Adjusting start date
        //   const endDate = new Date(today + 18 * day); // Adjusting end date

        //   // Loop through each month and push the start of the month timestamp
        //   while (currentDate <= endDate) {
        //     positions.push(currentDate.getTime());
        //     currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
        //   }

        //   return positions;
        // })(),
      },
    ],
    yAxis: {
      grid: {
        borderWidth: 0,
      },
      gridLineWidth: 0,
      labels: {
        symbol: {
          width: 8,
          height: 6,
          x: -4,
          y: -2,
        },
      },
      staticScale: 30,
    },
    accessibility: {
      enabled: false,
      keyboardNavigation: {
        seriesNavigation: {
          mode: "serialize",
        },
      },
      point: {
        descriptionFormatter: function (point) {
          const completedValue = point.completed
              ? point.completed.amount || point.completed
              : null,
            completed = completedValue
              ? " Task " +
                Math.round(completedValue * 1000) / 10 +
                "% completed."
              : "",
            dependency =
              point.dependency && point.series.chart.get(point.dependency).name,
            dependsOn = dependency ? " Depends on " + dependency + "." : "";

          return Highcharts.format(
            point.milestone
              ? "{point.yCategory}. Milestone at {point.x:%Y-%m-%d}. Owner: {point.owner}.{dependsOn}"
              : "{point.yCategory}.{completed} Start {point.x:%Y-%m-%d}, end {point.x2:%Y-%m-%d}. Owner: {point.owner}.{dependsOn}",
            { point, completed, dependsOn }
          );
        },
      },
    },
    lang: {
      accessibility: {
        axis: {
          xAxisDescriptionPlural:
            "The chart has a two-part X axis showing time in both week numbers and days.",
        },
      },
    },
  };

  useEffect(() => {
    const chart = Highcharts.ganttChart("container", options);
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [options, projectName]);

  return (
    <Card className="w-full p-4 mb-5">
      <div className="w-full flex justify-end">
        <ProjectSpecification
          projectName={projectName}
          buttonProps={
            <Button className="bg-gray-900 flex items-center gap-2 rounded-lg px-2 py-1">
              <span className="text-white text-xs normal-case">
                {translations.specification}
              </span>
              <TbListDetails color="white" size={16} />
            </Button>
          }
        />
      </div>
      <CardBody>
        <div id="container" style={{ width: "100%" }} />
      </CardBody>
    </Card>
  );
};

export default ProjectMapView;
