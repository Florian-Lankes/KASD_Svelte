import { c as create_ssr_component, d as each, b as add_attribute, e as escape, o as onDestroy, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
import { l as latestChartType } from "../../../chunks/stores.js";
import "frappe-charts";
const ChartTypeForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let charttypes = ["bar", "line", "percentage", "pie"];
  return `<form><div class="columns"><div class="column has-text-centered"><label for="charttype" class="title is-5">Charttype:</label>
            <div class="select"><select id="charttype">${each(charttypes, (chart) => {
    return `<option${add_attribute("value", chart, 0)}>${escape(chart)}</option>`;
  })}</select></div></div>

        <div class="column"><div class="field"><div class="control"><button class="button is-link is-light">Submit</button></div></div></div></div></form>`;
});
const Base = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = {
    labels: [],
    datasets: [{ values: [] }],
    yMarkers: {},
    yRegions: []
  } } = $$props;
  let { title = "" } = $$props;
  let { type = "line" } = $$props;
  let { height = 300 } = $$props;
  let { animate = true } = $$props;
  let { axisOptions = {} } = $$props;
  let { barOptions = {} } = $$props;
  let { lineOptions = {} } = $$props;
  let { tooltipOptions = {} } = $$props;
  let { colors = [] } = $$props;
  let { valuesOverPoints = 0 } = $$props;
  let { isNavigable = false } = $$props;
  let { maxSlices = 3 } = $$props;
  let chart = null;
  let chartRef;
  function ifChartThen(fn) {
    return function ifChart(...args) {
      if (chart) {
        return fn(...args);
      }
    };
  }
  const addDataPoint = ifChartThen((label, valueFromEachDataset, index) => chart.addDataPoint(label, valueFromEachDataset, index));
  const removeDataPoint = ifChartThen((index) => chart.removeDataPoint(index));
  const exportChart = ifChartThen(() => chart.export());
  const updateChart = ifChartThen((newData) => chart.update(newData));
  onDestroy(() => {
    chart = null;
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.animate === void 0 && $$bindings.animate && animate !== void 0)
    $$bindings.animate(animate);
  if ($$props.axisOptions === void 0 && $$bindings.axisOptions && axisOptions !== void 0)
    $$bindings.axisOptions(axisOptions);
  if ($$props.barOptions === void 0 && $$bindings.barOptions && barOptions !== void 0)
    $$bindings.barOptions(barOptions);
  if ($$props.lineOptions === void 0 && $$bindings.lineOptions && lineOptions !== void 0)
    $$bindings.lineOptions(lineOptions);
  if ($$props.tooltipOptions === void 0 && $$bindings.tooltipOptions && tooltipOptions !== void 0)
    $$bindings.tooltipOptions(tooltipOptions);
  if ($$props.colors === void 0 && $$bindings.colors && colors !== void 0)
    $$bindings.colors(colors);
  if ($$props.valuesOverPoints === void 0 && $$bindings.valuesOverPoints && valuesOverPoints !== void 0)
    $$bindings.valuesOverPoints(valuesOverPoints);
  if ($$props.isNavigable === void 0 && $$bindings.isNavigable && isNavigable !== void 0)
    $$bindings.isNavigable(isNavigable);
  if ($$props.maxSlices === void 0 && $$bindings.maxSlices && maxSlices !== void 0)
    $$bindings.maxSlices(maxSlices);
  if ($$props.addDataPoint === void 0 && $$bindings.addDataPoint && addDataPoint !== void 0)
    $$bindings.addDataPoint(addDataPoint);
  if ($$props.removeDataPoint === void 0 && $$bindings.removeDataPoint && removeDataPoint !== void 0)
    $$bindings.removeDataPoint(removeDataPoint);
  if ($$props.exportChart === void 0 && $$bindings.exportChart && exportChart !== void 0)
    $$bindings.exportChart(exportChart);
  {
    updateChart(data);
  }
  return `<div${add_attribute("this", chartRef, 0)}></div>`;
});
const Base$1 = Base;
const UserChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data = {
    labels: ["Users", "Placemarks"],
    datasets: [{ values: [0, 0] }]
  };
  let data2 = {
    labels: [
      "Soccer-field",
      "World-wonder",
      "River",
      "Bridge",
      "Town",
      "City",
      "Forest",
      "Landscape-feature",
      "National-monument",
      "Walking-Trail",
      "Tree",
      "Entertainment-Venue",
      "Island",
      "Archaeological-Feature",
      "Others"
    ],
    datasets: [
      {
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };
  let { charttype } = $$props;
  if ($$props.charttype === void 0 && $$bindings.charttype && charttype !== void 0)
    $$bindings.charttype(charttype);
  return `<div><div class="column box m-4"><h1 class="title is-4">Users to date | Placemarks to date</h1>
        ${validate_component(Base$1, "Chart").$$render($$result, { data, type: charttype }, {}, {})}</div>
    <div class="column box m-4"><h1 class="title is-4">Placemarks Types to date</h1>
        ${validate_component(Base$1, "Chart").$$render($$result, { data: data2, type: charttype }, {}, {})}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chartType;
  latestChartType.subscribe((value) => {
    chartType = value;
  });
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns"><div class="column box has-text-centered"><h1 class="title is-4">Analytics</h1>
        ${validate_component(ChartTypeForm, "ChartTypeForm").$$render($$result, {}, {}, {})}
        ${validate_component(UserChart, "UserChart").$$render($$result, { charttype: chartType }, {}, {})}</div></div>`;
});
export {
  Page as default
};
