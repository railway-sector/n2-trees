import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import {
  TextSymbol,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
} from "@arcgis/core/symbols";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});

/* Chainage Layer  */
var labelChainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: {
      size: 15,
      weight: "bold",
    },
  },
});

var chainageRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: {
      width: 0.2,
      color: "black",
    },
  }),
});

export const chainageLayer = new FeatureLayer({
  portalItem: {
    id: "876de8483da9485aac5df737cbef2143",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 5,
  title: "Chainage",
  elevationInfo: {
    mode: "relative-to-ground",
  },
  labelingInfo: [labelChainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainageRenderer,

  popupEnabled: false,
});

/* ROW Layer */
var prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/N2_Alignment/FeatureServer/1",
  layerId: 1,
  title: "PROW",
  popupEnabled: false,
  renderer: prowRenderer,
});
prowLayer.listMode = "hide";

/* Station Layer */
var labelClass = new LabelClass({
  labelExpressionInfo: { expression: "$feature.Station" },
  symbol: new TextSymbol({
    color: "black",
    haloColor: "white",
    haloSize: 1,
    font: {
      family: "Arial",
      size: 9,
      //weight: "bold"
    },
  }),
  labelPlacement: "center-right",
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "876de8483da9485aac5df737cbef2143",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "N2 Stations",
  labelingInfo: [labelClass],
  elevationInfo: {
    mode: "relative-to-ground",
  },
});

/* Tree cutting layer */
export const colorsCutting = ["#71ab48", "#ffff00", "#ffaa00", "#ff0000"];

const outlineColor = "gray";

export const treeCuttingRenderer = new UniqueValueRenderer({
  field: "Status",
  uniqueValueInfos: [
    {
      value: 1,
      label: "Cut/Earthballed",
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[0], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 2,
      label: "Permit Acquired",
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[1], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 3,
      label: "Submitted to DENR",
      symbol: new SimpleMarkerSymbol({
        size: 4,
        color: colorsCutting[2], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 4,
      label: "Ongoing Acquisition of Application Documents",
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[3], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
  ],
});

export const treeCuttingLayer = new FeatureLayer({
  portalItem: {
    id: "05b19f50364243dbabf06605085b09ce",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  layerId: 2,

  title: "Tree Cutting",
  renderer: treeCuttingRenderer,
  popupTemplate: {
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ScientificName",
            label: "Scientific Name",
          },
          {
            fieldName: "CommonName",
            label: "Common Name",
          },
          {
            fieldName: "Province",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "TreeNo",
            label: "Tree No.",
          },
          {
            fieldName: "CP",
            label: "<h5>CP</h5>",
          },
          {
            fieldName: "Compensation",
            label: "Status of Tree Compensation",
          },
          {
            fieldName: "Conservation",
            label: "Conservation Status",
          },
        ],
      },
    ],
  },
});

/* Tree compensation layer */
export const colorsCompen = ["#0070ff", "#ffff00", "#71ab48"];

export const treeCompensationRenderer = new UniqueValueRenderer({
  field: "Compensation",
  uniqueValueInfos: [
    {
      value: 1,
      label: "Non-Compensable",
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[0], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 2,
      label: "For Processing",
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[1], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 3,
      label: "Compensated",
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[2], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
  ],
});

export const treeCompensationLayer = new FeatureLayer({
  portalItem: {
    id: "05b19f50364243dbabf06605085b09ce",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,

  title: "Tree Compensation",
  renderer: treeCompensationRenderer,
  popupTemplate: {
    title: "<h5>{Compensation}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ScientificName",
            label: "Scientific Name",
          },
          {
            fieldName: "CommonName",
            label: "Common Name",
          },
          {
            fieldName: "Province",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "TreeNo",
            label: "Tree No.",
          },
          {
            fieldName: "CP",
            label: "<h5>CP</h5>",
          },
          {
            fieldName: "Status",
            label: "Status of Tree Cutting",
          },
          {
            fieldName: "Conservation",
            label: "Conservation Status",
          },
        ],
      },
    ],
  },
});

/* Tree Conservation layer */
export const colorsConservation = [
  "#9e0142",
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#fee08b",
  "#e6f598",
  "#abdda4",
  "#66c2a5",
  "#3288bd",
  "#5e4fa2",
  "#ffffff",
  "#44555a",
];

const treeConservationUniqueValuesInfos = colorsConservation.map(
  (color: any, index: any) => {
    return Object.assign({
      value: index + 1,
      symbol: new SimpleMarkerSymbol({
        style: "triangle",
        size: 5,
        color: color, // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    });
  }
);

export const treeConservationRenderer = new UniqueValueRenderer({
  field: "Conservation",
  uniqueValueInfos: treeConservationUniqueValuesInfos,
});

export const treeConservationLayer = new FeatureLayer({
  portalItem: {
    id: "05b19f50364243dbabf06605085b09ce",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },

  title: "Tree Conservation",
  layerId: 2,
  renderer: treeConservationRenderer,
  popupTemplate: {
    title: "<h5>{Conservation}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ScientificName",
            label: "Scientific Name",
          },
          {
            fieldName: "CommonName",
            label: "Common Name",
          },
          {
            fieldName: "Province",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "TreeNo",
            label: "Tree No.",
          },
          {
            fieldName: "CP",
            label: "<h5>CP</h5>",
          },
          {
            fieldName: "Status",
            label: "Status of Tree Cutting",
          },
          {
            fieldName: "Compensation",
            label: "Status of Tree Compensation",
          },
        ],
      },
    ],
  },
});

export const treeGroupLayer = new GroupLayer({
  title: "Trees",
  visible: true,
  visibilityMode: "exclusive",
  layers: [treeConservationLayer, treeCompensationLayer, treeCuttingLayer],
});

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [chainageLayer, stationLayer, prowLayer],
});
