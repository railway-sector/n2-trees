import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteTab,
  CalciteTabs,
  CalciteTabNav,
  CalciteTabTitle,
} from "@esri/calcite-components-react";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import { useState, useEffect } from "react";
import "../index.css";
import "../App.css";
import TreeCuttingChart from "./TreeCuttingChart";
import TreeCompensationChart from "./TreeCompensationChart";
import TreeConservationChart from "./TreeConservationChart";
import {
  treeCompensationLayer,
  treeConservationLayer,
  treeCuttingLayer,
} from "../layers";

function MainChart() {
  const [chartTabName, setChartTabName] = useState("TreeCutting");

  useEffect(() => {
    if (chartTabName === "TreeCutting") {
      treeCuttingLayer.visible = true;
      treeCompensationLayer.visible = false;
      treeConservationLayer.visible = false;
    } else if (chartTabName === "Compensation") {
      treeCuttingLayer.visible = false;
      treeCompensationLayer.visible = true;
      treeConservationLayer.visible = false;
    } else if (chartTabName === "Conservation") {
      treeCuttingLayer.visible = false;
      treeCompensationLayer.visible = false;
      treeConservationLayer.visible = true;
    }
  }, [chartTabName]);
  return (
    <>
      <CalciteTabs
        style={{
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          // borderTopWidth: 5,
          borderColor: "#555555",
        }}
        slot="panel-end"
        layout="center"
        // scale="m"
      >
        <CalciteTabNav
          slot="title-group"
          id="thetabs"
          onCalciteTabChange={(event: any) =>
            setChartTabName(event.srcElement.selectedTitle.className)
          }
        >
          <CalciteTabTitle className="TreeCutting">TreeCutting</CalciteTabTitle>
          <CalciteTabTitle className="Compensation">
            Compensation
          </CalciteTabTitle>
          <CalciteTabTitle className="Conservation">
            Conservation
          </CalciteTabTitle>
        </CalciteTabNav>

        {/* CalciteTab: Lot */}
        <CalciteTab>
          {chartTabName === "TreeCutting" && <TreeCuttingChart />}
        </CalciteTab>

        {/* CalciteTab: Structure */}
        <CalciteTab>
          {chartTabName === "Compensation" && <TreeCompensationChart />}
        </CalciteTab>

        {/* CalciteTab: Non-Land Owner */}
        <CalciteTab>
          {chartTabName === "Conservation" && <TreeConservationChart />}
        </CalciteTab>
      </CalciteTabs>
    </>
  );
}

export default MainChart;
