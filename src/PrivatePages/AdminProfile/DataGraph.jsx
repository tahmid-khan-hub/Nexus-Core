import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const DataGraph = ({ courses }) => {
  // Group courses by category
  const categoryCounts = courses.reduce((acc, course) => {
    acc[course.categories] = (acc[course.categories] || 0) + 1;
    return acc;
  }, {});

  // Convert to Recharts-compatible format
  const data = Object.entries(categoryCounts).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DataGraph;
