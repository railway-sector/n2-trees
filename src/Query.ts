import {
  treeCuttingLayer,
  treeCompensationLayer,
  treeConservationLayer,
  colorsConservation,
  colorsCutting,
  colorsCompen,
  dateTable,
} from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import * as am5 from "@amcharts/amcharts5";

// For segmented list
export const contractPackage = ["All", "N-01", "N-02", "N-03", "N-04"];

// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where = "project = 'N2'" + " AND " + "category = 'Trees'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      console.log(date);
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

// For Tree Cutting Pie Chart
const statusTreeCutting: string[] = [
  "Cut/Earthballed",
  "Permit Acquired",
  "Submitted to DENR",
  "Ongoing Acquisition of Application Documents",
];

export const statusTreeCuttingChartQuery = [
  {
    category: statusTreeCutting[0],
    value: 1,
  },
  {
    category: statusTreeCutting[1],
    value: 2,
  },
  {
    category: statusTreeCutting[2],
    value: 3,
  },
  {
    category: statusTreeCutting[3],
    value: 4,
  },
];

// For Tree Compensation Chart
const statusTreeCompensation: string[] = [
  "Non-Compensable",
  "For Processing",
  "Compensated",
];

export const statusTreeCompensationChartQuery = [
  {
    category: statusTreeCompensation[0],
    value: 1,
  },
  {
    category: statusTreeCompensation[1],
    value: 2,
  },
  {
    category: statusTreeCompensation[2],
    value: 3,
  },
];

// For Tree Conservation Chart
const treeConserveStatus = [
  "Ex",
  "Ew",
  "CR",
  "E",
  "VU",
  "NT",
  "LC",
  "DD",
  "NE",
  "OTS",
  "NL",
  "EN",
];

export const statusTreeConservationChartQuery = treeConserveStatus.map(
  (status: any, index: any) => {
    return Object.assign({
      category: status,
      value: index + 1,
    });
  }
);

//

export async function generateTreeCuttingData(contractp: any) {
  var total_cut = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_cut",
    statisticType: "sum",
  });

  var total_permit = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 2 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_permit",
    statisticType: "sum",
  });

  var total_denr = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 3 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_denr",
    statisticType: "sum",
  });

  var total_ongoing = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_ongoing",
    statisticType: "sum",
  });

  var query = treeCuttingLayer.createQuery();
  query.outStatistics = [total_cut, total_permit, total_denr, total_ongoing];
  query.returnGeometry = true;

  const queryExpression = "CP = '" + contractp + "'";
  query.where = contractp === "All" ? "1=1" : queryExpression;

  return treeCuttingLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const cut = stats.total_cut;
    const permit = stats.total_permit;
    const denr = stats.total_denr;
    const ongoing = stats.total_ongoing;

    const data = [
      {
        category: statusTreeCutting[0],
        value: cut,
        sliceSettings: {
          fill: am5.color(colorsCutting[0]),
        },
      },
      {
        category: statusTreeCutting[1],
        value: permit,
        sliceSettings: {
          fill: am5.color(colorsCutting[1]),
        },
      },
      {
        category: statusTreeCutting[2],
        value: denr,
        sliceSettings: {
          fill: am5.color(colorsCutting[2]),
        },
      },
      {
        category: statusTreeCutting[3],
        value: ongoing,
        sliceSettings: {
          fill: am5.color(colorsCutting[3]),
        },
      },
    ];
    return data;
  });
}

export async function generateTreeCompensationData(contractp: any) {
  var total_noncomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Compensation = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_noncomp",
    statisticType: "sum",
  });

  var total_process = new StatisticDefinition({
    onStatisticField: "CASE WHEN Compensation = 2 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_process",
    statisticType: "sum",
  });

  var total_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Compensation = 3 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_comp",
    statisticType: "sum",
  });

  var query = treeCompensationLayer.createQuery();
  query.outStatistics = [total_noncomp, total_process, total_comp];
  query.returnGeometry = true;
  const queryExpression = "CP = '" + contractp + "'";
  query.where = contractp === "All" ? "1=1" : queryExpression;

  return treeCompensationLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const nocompen = stats.total_noncomp;
    const processing = stats.total_process;
    const compen = stats.total_comp;

    const data = [
      {
        category: statusTreeCompensation[0],
        value: nocompen,
        sliceSettings: {
          fill: am5.color(colorsCompen[0]),
        },
      },
      {
        category: statusTreeCompensation[1],
        value: processing,
        sliceSettings: {
          fill: am5.color(colorsCompen[1]),
        },
      },
      {
        category: statusTreeCompensation[2],
        value: compen,
        sliceSettings: {
          fill: am5.color(colorsCompen[2]),
        },
      },
    ];
    return data;
  });
}

export async function generateTreeConservationData(contractp: any) {
  var total_ex = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_ex",
    statisticType: "sum",
  });

  var total_ew = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 2 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_ew",
    statisticType: "sum",
  });

  var total_cr = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 3 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_cr",
    statisticType: "sum",
  });

  var total_e = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_e",
    statisticType: "sum",
  });

  var total_vu = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 5 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_vu",
    statisticType: "sum",
  });

  var total_nt = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 6 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_nt",
    statisticType: "sum",
  });

  var total_lc = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 7 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_lc",
    statisticType: "sum",
  });

  var total_dd = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 8 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_dd",
    statisticType: "sum",
  });

  var total_ne = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 9 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_ne",
    statisticType: "sum",
  });

  var total_ots = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 10 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_ots",
    statisticType: "sum",
  });

  var total_nl = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 11 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_nl",
    statisticType: "sum",
  });

  var total_en = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation = 12 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_en",
    statisticType: "sum",
  });

  var query = treeConservationLayer.createQuery();
  query.outStatistics = [
    total_ex,
    total_ew,
    total_cr,
    total_e,
    total_vu,
    total_nt,
    total_lc,
    total_dd,
    total_ne,
    total_ots,
    total_nl,
    total_en,
  ];
  query.returnGeometry = true;
  const queryExpression = "CP = '" + contractp + "'";
  query.where = contractp === "All" ? "1=1" : queryExpression;

  return treeConservationLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const cons_ex = stats.total_ex;
    const cons_ew = stats.total_ew;
    const cons_cr = stats.total_cr;
    const cons_e = stats.total_e;
    const cons_vu = stats.total_vu;
    const cons_nt = stats.total_nt;
    const cons_lc = stats.total_lc;
    const cons_dd = stats.total_dd;
    const cons_ne = stats.total_ne;
    const cons_ots = stats.total_ots;
    const cons_nl = stats.total_nl;
    const cons_en = stats.total_en;

    const data = [
      {
        category: treeConserveStatus[0],
        value: cons_ex,
        sliceSettings: {
          fill: am5.color(colorsConservation[0]),
        },
      },
      {
        category: treeConserveStatus[1],
        value: cons_ew,
        sliceSettings: {
          fill: am5.color(colorsConservation[1]),
        },
      },
      {
        category: treeConserveStatus[2],
        value: cons_cr,
        sliceSettings: {
          fill: am5.color(colorsConservation[2]),
        },
      },
      {
        category: treeConserveStatus[3],
        value: cons_e,
        sliceSettings: {
          fill: am5.color(colorsConservation[3]),
        },
      },
      {
        category: treeConserveStatus[4],
        value: cons_vu,
        sliceSettings: {
          fill: am5.color(colorsConservation[4]),
        },
      },
      {
        category: treeConserveStatus[5],
        value: cons_nt,
        sliceSettings: {
          fill: am5.color(colorsConservation[5]),
        },
      },
      {
        category: treeConserveStatus[6],
        value: cons_lc,
        sliceSettings: {
          fill: am5.color(colorsConservation[6]),
        },
      },
      {
        category: treeConserveStatus[7],
        value: cons_dd,
        sliceSettings: {
          fill: am5.color(colorsConservation[7]),
        },
      },
      {
        category: treeConserveStatus[8],
        value: cons_ne,
        sliceSettings: {
          fill: am5.color(colorsConservation[8]),
        },
      },
      {
        category: treeConserveStatus[9],
        value: cons_ots,
        sliceSettings: {
          fill: am5.color(colorsConservation[9]),
        },
      },
      {
        category: treeConserveStatus[10],
        value: cons_nl,
        sliceSettings: {
          fill: am5.color(colorsConservation[10]),
        },
      },
      {
        category: treeConserveStatus[11],
        value: cons_en,
        sliceSettings: {
          fill: am5.color(colorsConservation[11]),
        },
      },
    ];
    return data;
  });
}

export async function generateTreesNumber(contractp: any) {
  var total_cut_tree = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status >= 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_cut_tree",
    statisticType: "sum",
  });

  var total_compensation_tree = new StatisticDefinition({
    onStatisticField: "CASE WHEN Compensation >= 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_compensation_tree",
    statisticType: "sum",
  });

  var total_conservation_tree = new StatisticDefinition({
    onStatisticField: "CASE WHEN Conservation >= 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_conservation_tree",
    statisticType: "sum",
  });

  var query = treeCuttingLayer.createQuery();
  query.outStatistics = [
    total_cut_tree,
    total_compensation_tree,
    total_conservation_tree,
  ];
  query.returnGeometry = true;

  const queryExpression = "CP = '" + contractp + "'";
  query.where = contractp === "All" ? "1=1" : queryExpression;

  return treeCuttingLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const cut = stats.total_cut_tree;
    const compen = stats.total_compensation_tree;
    const conserv = stats.total_conservation_tree;
    return [cut, compen, conserv];
  });
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        //speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}

export function processParams(graphic: any, layerView: any) {
  if (!graphic || !layerView) {
    throw new Error("Graphic or layerView not provided.");
  }

  if (!graphic.isAggregate) {
    throw new Error("Graphic must represent a cluster.");
  }
}
