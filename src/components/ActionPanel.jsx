import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import {
  CalciteShellPanel,
  CalciteActionBar,
  CalciteAction,
  CalcitePanel,
} from "@esri/calcite-components-react";
import { useEffect, useState } from "react";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-legend";
import { treeCuttingLayer } from "../layers";

function ActionPanel() {
  const [activeWidget, setActiveWidget] = useState(null);
  const [nextWidget, setNextWidget] = useState(null);
  const arcgisMap = document.querySelector("arcgis-map");
  const legend = document.querySelector("arcgis-legend");

  useEffect(() => {
    if (activeWidget) {
      const actionActiveWidget = document.querySelector(
        `[data-panel-id=${activeWidget}]`
      );
      actionActiveWidget.hidden = true;
    }

    if (nextWidget !== activeWidget) {
      const actionNextWidget = document.querySelector(
        `[data-panel-id=${nextWidget}]`
      );
      actionNextWidget.hidden = false;
    }
  });

  return (
    <>
      <CalciteShellPanel
        width="1"
        slot="panel-start"
        position="start"
        id="left-shell-panel"
        displayMode="dock"
      >
        <CalciteActionBar
          slot="action-bar"
          style={{
            borderStyle: "solid",
            borderRightWidth: 3.5,
            borderLeftWidth: 3.5,
            borderBottomWidth: 4.5,
            borderColor: "#555555",
          }}
        >
          <CalciteAction
            data-action-id="layers"
            icon="layers"
            text="layers"
            id="layers"
            //textEnabled={true}
            onClick={(event) => {
              setNextWidget(event.target.id);
              setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
            }}
          ></CalciteAction>

          <CalciteAction
            data-action-id="basemaps"
            icon="basemap"
            text="basemaps"
            id="basemaps"
            onClick={(event) => {
              setNextWidget(event.target.id);
              setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
            }}
          ></CalciteAction>

          <CalciteAction
            data-action-id="information"
            icon="information"
            text="Information"
            id="information"
            onClick={(event) => {
              setNextWidget(event.target.id);
              setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
            }}
          ></CalciteAction>
        </CalciteActionBar>

        <CalcitePanel
          heading="Layers"
          height="l"
          width="l"
          data-panel-id="layers"
          style={{ width: "18vw" }}
          hidden
        >
          <arcgis-layer-list
            referenceElement="arcgis-map"
            selectionMode="multiple"
            visibilityAppearance="checkbox"
            // show-collapse-button
            show-filter
            filter-placeholder="Filter layers"
            listItemCreatedFunction={(event) => {
              const { item } = event;
              if (item.layer.type !== "group") {
                item.panel = {
                  content: "legend",
                  open: true,
                  visible: true,
                };
              }

              item.title === "Chainage" ||
              item.title === "Tree Compensation" ||
              item.title === "Tree Conservation"
                ? (item.visible = false)
                : (item.visible = true);
            }}
          ></arcgis-layer-list>
        </CalcitePanel>

        <CalcitePanel
          heading="Basemaps"
          height="l"
          data-panel-id="basemaps"
          style={{ width: "18vw" }}
          hidden
        >
          <arcgis-basemap-gallery referenceElement="arcgis-map"></arcgis-basemap-gallery>
        </CalcitePanel>

        <CalcitePanel heading="Description" data-panel-id="information" hidden>
          {nextWidget === "information" ? (
            <div className="informationDiv">
              <ul>
                <div>
                  <b style={{ color: "white", fontWeight: "bold" }}>
                    --- How to Use Dropdown List ---
                  </b>
                </div>
                <li>
                  You can <b>filter the data</b> by City and Barangy using
                  dropdown lists.
                </li>
                <li>
                  <b>Click a tab</b> below the dropdown lists to view progress
                  on land, structure, or NLO in charts.
                </li>

                <div>
                  <b style={{ color: "white", fontWeight: "bold" }}>
                    --- How to Use Chart ---
                  </b>
                </div>
                <li>
                  <b>Click series in pie charts</b> to view progress on the
                  corresponding lots/structures/NLO on the map.
                </li>
                <li>
                  <b>Lots under expropriation</b> are available in the 'Expro
                  List' tab.
                </li>
                <li>
                  <b>Pie chart for lands</b> represent <b>private lands only</b>
                  .
                </li>
                <li>
                  Values in the bracket of Land legend represent the total
                  affected areas in square meters corresponeding to milestone
                  status.
                </li>
                <li>
                  <b>Permit-to-Enter</b> represents both public and private
                  lands{" "}
                </li>
                <li>
                  <b>Progress Chart</b> indicates the number of handed-over lots
                  for both public and private lands{" "}
                </li>
                <li>
                  <b>Handed-Over</b> represents both public and privalte lands.
                </li>
              </ul>
            </div>
          ) : (
            <div className="informationDiv" hidden></div>
          )}
        </CalcitePanel>
      </CalciteShellPanel>
    </>
  );
}

export default ActionPanel;
