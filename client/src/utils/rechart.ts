import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ResponsiveContainerImpl: typeof ResponsiveContainer = require("recharts/es6/component/ResponsiveContainer").ResponsiveContainer;
const LineChartImpl: typeof LineChart = require("recharts/es6/chart/LineChart")
  .LineChart;
const LineImpl: typeof Line = require("recharts/es6/cartesian/Line").Line;
const XAxisImpl: typeof XAxis = require("recharts/es6/cartesian/XAxis").XAxis;
const YAxisImpl: typeof YAxis = require("recharts/es6/cartesian/YAxis").YAxis;
const TooltipImpl: typeof Tooltip = require("recharts/es6/component/Tooltip")
  .Tooltip;
const CartesianGridImpl: typeof CartesianGrid = require("recharts/es6/cartesian/CartesianGrid").CartesianGrid;
const LegendImpl: typeof Legend = require("recharts/es6/component/Legend").Legend;

export {
  ResponsiveContainerImpl as ResponsiveContainer,
  LineChartImpl as LineChart,
  LineImpl as Line,
  XAxisImpl as XAxis,
  YAxisImpl as YAxis,
  TooltipImpl as Tooltip,
  CartesianGridImpl as CartesianGrid,
  LegendImpl as Legend,
};
