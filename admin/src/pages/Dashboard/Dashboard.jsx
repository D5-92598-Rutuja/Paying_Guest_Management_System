import React, { useEffect, useState } from "react";
import axios from "../../service/axiosInstance";
import "./Dashboard.css";

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationLegend,
  AccumulationTooltip
} from "@syncfusion/ej2-react-charts";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/dashboard")
      .then(res => {
        setStats(res.data.stats || {});
        setActivities(res.data.activities || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading...</h3>;

  const pieData = [
    { x: "Booked Rooms", y: stats.bookedRooms || 0 },
    { x: "Available Rooms", y: (stats.totalRooms || 0) - (stats.bookedRooms || 0) }
  ];

  

  return (
    <div className="dashboard">

      {/* TOP STATS */}
      <div className="stats-grid">
        <div className="card">Total Rooms<br /><b>{stats.totalRooms || 0}</b></div>
        <div className="card">Booked Rooms<br /><b>{stats.bookedRooms || 0}</b></div>
        <div className="card">Pending Dues<br /><b>₹{stats.pendingDues || 0}</b></div>
        <div className="card">Open Tickets<br /><b>{stats.unresolvedTickets || 0}</b></div>
      </div>

      <div className="dashboard-main">

        {/* DONUT CHART */}
        <div className="chart-card">
          <h3>Room Occupancy</h3>

          <AccumulationChartComponent
            id="roomChart"
            legendSettings={{ visible: true }}
            tooltip={{ enable: true }}
          >
            <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={pieData}
                xName="x"
                yName="y"
                innerRadius="60%"
                radius="80%"
                type="Pie"
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>

        {/* RECENT ACTIVITIES */}
        {/* RECENT ACTIVITIES */}
{/* RECENT ACTIVITIES */}
<div className="activity-card">
  <h3>Recent Activities</h3>

  <div className="activity-list">
    {activities.length === 0 && <p>No recent activity</p>}

    {activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map((act, index) => (
        <div key={index} className="activity-item">
          
          {/* colored dot */}
          <div className={`activity-dot ${act.type.toLowerCase()}`}></div>

          <div className="activity-content">
            <div className="activity-top">
              <p>{act.message}</p>
              <span className={`badge ${act.type.toLowerCase()}`}>
                {act.type}
              </span>
            </div>
            <small>
              {new Date(act.timestamp).toLocaleString()}
            </small>
          </div>
        </div>
      ))}
  </div>
</div>


      </div>
    </div>
  );
}