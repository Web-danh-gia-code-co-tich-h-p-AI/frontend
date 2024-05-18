// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoreChart from "./ScoreChart";

const StatisticsScore = () => {
  const [data, setData] = useState([]);
  const [scoreStats, setScoreStats] = useState({});
  const [scoreAIStats, setScoreAIStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    // Fetch data from API
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bewbewbew-001-site1.ftempurl.com/api/demo/get-users-list"
        );
        const users = response.data;
        setData(users);
        calculateStatistics(users);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reload]);

  // Function to calculate statistics
  const calculateStatistics = (users) => {
    const scoreCounts = {};
    const scoreAICounts = {};

    users.forEach((user) => {
      scoreCounts[user.score] = (scoreCounts[user.score] || 0) + 1;
      scoreAICounts[user.scoreAI] = (scoreAICounts[user.scoreAI] || 0) + 1;
    });

    setScoreStats(scoreCounts);
    setScoreAIStats(scoreAICounts);
  };

  // Convert scoreStats to dataPoints for the chart
  const scoreDataPoints = Object.keys(scoreStats).map((key) => ({
    x: parseInt(key, 10),
    y: scoreStats[key]
  }));

  // Convert scoreAIStats to dataPoints for the chart
  const scoreAIDataPoints = Object.keys(scoreAIStats).map((key) => ({
    x: parseInt(key, 10),
    y: scoreAIStats[key]
  }));

  return (
    <div className="h-screen">
      <h1 className="flex justify-between p-4 text-3xl font-bold bg-zinc-300">
        Thống kê Điểm số học sinh
        <button
          onClick={() => setReload(!reload)}
          className={`${
            loading ? "opacity-50 cursor-not-allowed" : ""
          } p-2 mr-3 text-base font-normal text-white bg-blue-500 rounded-lg hover:bg-blue-600`}
          disabled={loading}
        >
          {loading ? "Reloading..." : "Reload"}
        </button>
      </h1>
      <div className="grid grid-cols-2">
        <div className="flex p-4 bg-slate-100">
          <div className="ml-4 p-2 border bg-zinc-500 text-white rounded-lg w-[200px] hidden laptop:block">
            <h2 className="">Score Statistics</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2">Điểm</th>
                  <th className="border-b-2">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(scoreStats).map((key) => (
                  <tr key={key}>
                    <td className="px-2 border-b">{key}</td>
                    <td className="px-2 border-b">{scoreStats[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <ScoreChart dataPoints={scoreDataPoints} title="Thống kê điểm số" />
          </div>
        </div>
        <div className="flex p-4 bg-slate-100">
          <div className="ml-4 p-2 border text-white bg-zinc-500 rounded-lg w-[200px] hidden laptop:block">
            <h2 className="">Score AI Statistics</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2">Điểm</th>
                  <th className="border-b-2">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(scoreAIStats).map((key) => (
                  <tr key={key}>
                    <td className="px-2 border-b">{key}</td>
                    <td className="px-2 border-b">{scoreAIStats[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <ScoreChart
              dataPoints={scoreAIDataPoints}
              title="Thống kê điểm số AI"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsScore;
