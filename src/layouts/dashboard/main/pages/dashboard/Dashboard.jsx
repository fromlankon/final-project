import React from 'react';
import "./Dashboard.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Dashboard() {

  const data = [
    {
      name: 'July',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'August',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'September',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'October',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'November',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'December',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'January',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <div className='dashboard'>
        <div className="ordersInformation">
          <div className="ordersInformationBlock1">
            <img src="../../../../src/images/Layer.png" />
            <p className='dashboardText1'> Today Orders </p>
            <p className='dashboardText2'> $314.00 </p>
            <div className='ordersInformationBottom'>
              <div>
                <p className='dashboardText3'> Cash: </p>
                <p className='dashboardText3'> $256.00 </p>
              </div>
              <div>
                <p className='dashboardText3'> Card: </p>
                <p className='dashboardText3'> $58.00 </p>
              </div>
              <div>
                <p className='dashboardText3'> Credit: </p>
                <p className='dashboardText3'> $0.00 </p>
              </div>
            </div>
          </div>
          <div className="ordersInformationBlock2">
            <img src="../../../../src/images/Layer.png" />
            <p className='dashboardText1'> Yesterday Orders </p>
            <p className='dashboardText2'> $754.00 </p>
            <div className='ordersInformationBottom'>
              <div>
                <p className='dashboardText3'> Cash: </p>
                <p className='dashboardText3'> $312.00 </p>
              </div>
              <div>
                <p className='dashboardText3'> Card: </p>
                <p className='dashboardText3'> $408.00 </p>
              </div>
              <div>
                <p className='dashboardText3'> Credit: </p>
                <p className='dashboardText3'> $36.00 </p>
              </div>
            </div>
          </div>
          <div className="ordersInformationBlock3">
            <img src="../../../../src/images/Cart White.png" />
            <p className='dashboardText1'> This Month </p>
            <p className='dashboardText2'> $37826.00 </p>
          </div>
          <div className="ordersInformationBlock4">
            <img src="../../../../src/images/Credit Card.png" />
            <p className='dashboardText1'> Last Month </p>
            <p className='dashboardText2'> $52421.00 </p>
          </div>
          <div className="ordersInformationBlock5">
            <img src="../../../../src/images/Credit Card.png" />
            <p className='dashboardText1'> All Times Sales </p>
            <p className='dashboardText2'> $916422.00 </p>
          </div>
        </div>
        <div className="dashboardOrderStatistics">
          <div className="dashboardOrderStatisticsBlock1">
            <div className='dashboardOrderStatisticsBlockImage1'>
              <img src="../../../../../src/images/Cart Orange.png" />
            </div>
            <div>
              <p className='dashboardText4'> Total Order </p>
              <p className='dashboardText5'> 712 </p>
            </div>
          </div>
          <div className="dashboardOrderStatisticsBlock2">
            <div className='dashboardOrderStatisticsBlockImage2'>
              <img src="../../../../../src/images/Refresh.png" />
            </div>
            <div>
              <p className='dashboardText4'> Orders Pending </p>
              <p className='dashboardText5'> 124 </p>
            </div>
          </div>
          <div className="dashboardOrderStatisticsBlock3">
            <div className='dashboardOrderStatisticsBlockImage3'>
              <img src="../../../../../src/images/Truck Green.png" />
            </div>
            <div>
              <p className='dashboardText4'> Orders Processing </p>
              <p className='dashboardText5'> 341 </p>
            </div>
          </div>
          <div className="dashboardOrderStatisticsBlock4">
            <div className='dashboardOrderStatisticsBlockImage4'>
              <img src="../../../../../src/images/Check.png" />
            </div>
            <div>
              <p className='dashboardText4'> Orders Delivered </p>
              <p className='dashboardText5'> 412 </p>
            </div>
          </div>
        </div>
        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}