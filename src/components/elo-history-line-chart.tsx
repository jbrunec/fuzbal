import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type EloHistoryLineChartProps = {
  data: { _creationTime: string; rating: number }[];
};
export default function EloHistoryLineChart({
  data,
}: EloHistoryLineChartProps) {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_creationTime" />
        <YAxis
          domain={["dataMin - 10", "dataMax + 10"]}
          allowDecimals={false}
        />
        <Tooltip />
        <Line type="monotone" dataKey="rating" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
