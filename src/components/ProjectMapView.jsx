// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsGantt from "highcharts/modules/gantt";
// import {
//   Card,
//   CardBody,
//   Select,
//   Option,
//   Avatar,
//   Typography,
// } from "@material-tailwind/react";
// import { TbProgress } from "react-icons/tb";
// import { MdOutlineMotionPhotosPaused } from "react-icons/md";
// import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

// // Initialize Highcharts Gantt
// if (typeof Highcharts === "object") {
//   HighchartsGantt(Highcharts);
// }

// const ProjectMapView = ({ projectData, projectName }) => {
//   const projectProgress = projectData.map((item) => (
//     <React.Fragment key={item.id}>
//       {Math.ceil(
//         Object.values(item.tasks || {}).reduce(
//           (accumulator, currentItem) => accumulator + currentItem.progress,
//           0
//         ) / Math.max(Object.keys(item.tasks || {}).length, 1)
//       )}
//     </React.Fragment>
//   ));

//   const day = 24 * 36e5;
//   const today = Math.floor(Date.now() / day) * day;

//   const options = {
//     chart: {
//       plotBackgroundColor: "rgba(128,128,128,0.02)",
//       plotBorderColor: "rgba(128,128,128,0.1)",
//       plotBorderWidth: 1,
//     },
//     plotOptions: {
//       series: {
//         borderRadius: "50%",
//         connectors: {
//           dashStyle: "ShortDot",
//           lineWidth: 2,
//           radius: 5,
//           startMarker: {
//             enabled: false,
//           },
//         },
//         groupPadding: 0,
//         dataLabels: [
//           {
//             enabled: true,
//             align: "left",
//             format: "{point.name}",
//             padding: 10,
//             style: {
//               fontWeight: "normal",
//               textOutline: "none",
//             },
//           },
//           {
//             enabled: true,
//             align: "right",
//             format:
//               "{#if point.completed}{(multiply point.completed.amount 100):.0f}%{/if}",
//             padding: 10,
//             style: {
//               fontWeight: "normal",
//               textOutline: "none",
//               opacity: 0.6,
//             },
//           },
//         ],
//       },
//     },

//     series: [
//       {
//         name: "Product",
//         data: [
//           {
//             name: "Produto",
//             id: "product_ref",
//             owner: "Gerente",
//           },
//           {
//             name: "Especificação",
//             id: "specification_ref",
//             parent: "product_ref",
//             start: today - 0 * day,
//             end: today + 6 * day,
//             completed: {
//               amount: 1,
//             },
//             owner: "Linda",
//           },
//           {
//             name: "Inspeção",
//             id: "inspection_ref",
//             dependency: "specification_ref",
//             parent: "product_ref",
//             start: today + 6 * day,
//             end: today + 8 * day,
//             owner: "Ivy",
//           },
//           {
//             name: "Passed inspection",
//             id: "passed_inspection",
//             dependency: "inspection_ref",
//             parent: "product_ref",
//             start: today + 9.5 * day,
//             milestone: true,
//             owner: "Peter",
//           },
//           {
//             name: "Relocate",
//             id: "relocate",
//             dependency: "passed_inspection",
//             parent: "product_ref",
//             owner: "Josh",
//           },
//           {
//             name: "Relocate staff",
//             id: "relocate_staff",
//             parent: "relocate",
//             start: today + 10 * day,
//             end: today + 11 * day,
//             owner: "Mark",
//           },
//           {
//             name: "Relocate test facility",
//             dependency: "relocate_staff",
//             parent: "relocate",
//             start: today + 11 * day,
//             end: today + 13 * day,
//             owner: "Anne",
//           },
//           {
//             name: "Relocate cantina",
//             dependency: "relocate_staff",
//             parent: "relocate",
//             start: today + 11 * day,
//             end: today + 14 * day,
//           },
//         ],
//       },
//       {
//         name: "Product",
//         data: [
//           {
//             name: "Desenvolvimento",
//             id: "new_product",
//             owner: "Peter",
//           },
//           {
//             name: "Development",
//             id: "development",
//             parent: "new_product",
//             start: today - day,
//             end: today + 11 * day,
//             completed: {
//               amount: projectProgress
//                 ? projectProgress[0].props.children / 100
//                 : 0,
//               fill: "#e80",
//             },
//             owner: "Susan",
//           },
//           {
//             name: "Beta",
//             id: "beta",
//             dependency: "development",
//             parent: "new_product",
//             start: today + 12.5 * day,
//             milestone: true,
//             owner: "Peter",
//           },
//           {
//             name: "Final development",
//             id: "finalize",
//             dependency: "beta",
//             parent: "new_product",
//             start: today + 13 * day,
//             end: today + 17 * day,
//           },
//           {
//             name: "Launch",
//             dependency: "finalize",
//             parent: "new_product",
//             start: today + 17.5 * day,
//             milestone: true,
//             owner: "Peter",
//           },
//         ],
//       },
//     ],
//     tooltip: {
//       pointFormat:
//         '<span style="font-weight: bold">{point.name}</span><br>' +
//         "{point.start:%e %b}" +
//         "{#unless point.milestone} → {point.end:%e %b}{/unless}" +
//         "<br>" +
//         "{#if point.completed}" +
//         "Completed: {multiply point.completed.amount 100}%<br>" +
//         "{/if}" +
//         "Owner: {#if point.owner}{point.owner}{else}unassigned{/if}",
//     },
//     title: {
//       text: projectName,
//     },
//     xAxis: [
//       {
//         currentDateIndicator: {
//           color: "#2caffe",
//           dashStyle: "ShortDot",
//           width: 2,
//           label: {
//             format: "",
//           },
//         },
//         dateTimeLabelFormats: {
//           day: '%e<br><span style="opacity: 0.5; font-size: 0.7em">%a</span>',
//         },
//         grid: {
//           borderWidth: 0,
//         },
//         gridLineWidth: 1,
//         min: today - 3 * day,
//         max: today + 18 * day,
//         custom: {
//           today,
//           weekendPlotBands: true,
//         },
//       },
//     ],
//     yAxis: {
//       grid: {
//         borderWidth: 0,
//       },
//       gridLineWidth: 0,
//       labels: {
//         symbol: {
//           width: 8,
//           height: 6,
//           x: -4,
//           y: -2,
//         },
//       },
//       staticScale: 30,
//     },
//     accessibility: {
//       enabled: false,
//       keyboardNavigation: {
//         seriesNavigation: {
//           mode: "serialize",
//         },
//       },
//       point: {
//         descriptionFormatter: function (point) {
//           const completedValue = point.completed
//               ? point.completed.amount || point.completed
//               : null,
//             completed = completedValue
//               ? " Task " +
//                 Math.round(completedValue * 1000) / 10 +
//                 "% completed."
//               : "",
//             dependency =
//               point.dependency && point.series.chart.get(point.dependency).name,
//             dependsOn = dependency ? " Depends on " + dependency + "." : "";

//           return Highcharts.format(
//             point.milestone
//               ? "{point.yCategory}. Milestone at {point.x:%Y-%m-%d}. Owner: {point.owner}.{dependsOn}"
//               : "{point.yCategory}.{completed} Start {point.x:%Y-%m-%d}, end {point.x2:%Y-%m-%d}. Owner: {point.owner}.{dependsOn}",
//             { point, completed, dependsOn }
//           );
//         },
//       },
//     },
//     lang: {
//       accessibility: {
//         axis: {
//           xAxisDescriptionPlural:
//             "The chart has a two-part X axis showing time in both week numbers and days.",
//         },
//       },
//     },
//   };

//   useEffect(() => {
//     const chart = Highcharts.ganttChart("container", options);
//     return () => {
//       if (chart) {
//         chart.destroy();
//       }
//     };
//   }, [options, projectName]);

//   return (
//     <Card className="w-full p-4 mb-5">
//       <CardBody>
//         <div id="container" />
//       </CardBody>
//     </Card>
//   );
// };

// export default ProjectMapView;

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";
import { Card, CardBody } from "@material-tailwind/react";

// Initialize Highcharts Gantt
if (typeof Highcharts === "object") {
  HighchartsGantt(Highcharts);
}

const ProjectMapView = ({ projectData, projectName }) => {
  const projectProgress = projectData.map((item) => (
    <React.Fragment key={item.id}>
      {Math.ceil(
        Object.values(item.tasks || {}).reduce(
          (accumulator, currentItem) => accumulator + currentItem.progress,
          0
        ) / Math.max(Object.keys(item.tasks || {}).length, 1)
      )}
    </React.Fragment>
  ));

  const day = 24 * 36e5;
  const today = Math.floor(Date.now() / day) * day;

  const options = {
    chart: {
      plotBackgroundColor: "rgba(128,128,128,0.02)",
      plotBorderColor: "rgba(128,128,128,0.1)",
      plotBorderWidth: 1,
    },
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
        name: "Product",
        data: [
          {
            name: "Produto",
            id: "product_ref",
            owner: "Gerente",
          },
          {
            name: "Especificação",
            id: "specification_ref",
            parent: "product_ref",
            start: today - 0 * day,
            end: today + 6 * day,
            completed: {
              amount: 1,
            },
            owner: "Linda",
          },
          {
            name: "Inspeção",
            id: "inspection_ref",
            dependency: "specification_ref",
            parent: "product_ref",
            start: today + 6 * day,
            end: today + 8 * day,
            owner: "Ivy",
          },
          {
            name: "Passed inspection",
            id: "passed_inspection",
            dependency: "inspection_ref",
            parent: "product_ref",
            start: today + 9.5 * day,
            milestone: true,
            owner: "Peter",
          },
          {
            name: "Relocate",
            id: "relocate",
            dependency: "passed_inspection",
            parent: "product_ref",
            owner: "Josh",
          },
          {
            name: "Relocate staff",
            id: "relocate_staff",
            parent: "relocate",
            start: today + 10 * day,
            end: today + 11 * day,
            owner: "Mark",
          },
          {
            name: "Relocate test facility",
            dependency: "relocate_staff",
            parent: "relocate",
            start: today + 11 * day,
            end: today + 13 * day,
            owner: "Anne",
          },
          {
            name: "Relocate cantina",
            dependency: "relocate_staff",
            parent: "relocate",
            start: today + 11 * day,
            end: today + 14 * day,
          },
        ],
      },
      {
        name: "Product",
        data: [
          {
            name: "Desenvolvimento",
            id: "new_product",
            owner: "Peter",
          },
          {
            name: "Development",
            id: "development",
            parent: "new_product",
            start: today - day,
            end: today + 11 * day,
            completed: {
              amount: projectProgress
                ? projectProgress[0].props.children / 100
                : 0,
              fill: "#e80",
            },
            owner: "Susan",
          },
          {
            name: "Beta",
            id: "beta",
            dependency: "development",
            parent: "new_product",
            start: today + 12.5 * day,
            milestone: true,
            owner: "Peter",
          },
          {
            name: "Final development",
            id: "finalize",
            dependency: "beta",
            parent: "new_product",
            start: today + 13 * day,
            end: today + 17 * day,
          },
          {
            name: "Launch",
            dependency: "finalize",
            parent: "new_product",
            start: today + 17.5 * day,
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
        min: today - 3 * day,
        max: today + 18 * day,
        custom: {
          today,
          weekendPlotBands: true,
        },
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
      <CardBody>
        <div id="container" style={{ width: "100%" }} />
      </CardBody>
    </Card>
  );
};

export default ProjectMapView;
