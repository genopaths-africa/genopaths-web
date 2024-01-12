import React from 'react';
import { SimpleGrid, Title } from '@mantine/core';
import {PieChart, Pie, LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

let data = [
  {
    name: 'Nakasero',
    location: 400,
  },
  {
    name: 'Bunga',
    location: 217,
  },
  {
    name: 'Naguru',
    location: 233,
  },
  {
    name: 'Kisaasi',
    location: 20,
  },
  {
    name: 'Kyanja',
    location: 120,
  },
  {
    name: 'Munyonyo',
    location: 60,
  },
  {
    name: 'Najjera',
    location: 40,
  },
  {
    name: 'Bukoto',
    location: 410,
  },
  {
    name: 'Entebbe',
    location: 350,
  },
];



const data01 = [
  { name: 'Entebbe', value: 400 },
  { name: 'Nakasero', value: 300 },
  { name: 'Munyonyo', value: 300 },
  { name: 'Naguru', value: 200 },
];
const data02 = [
  { name: 'surface', value: 100 },
  { name: 'chickens', value: 300 },
  { name: 'hh_env', value: 100 },
  { name: 'human', value: 80 },
  { name: 'avian', value: 40 },
  { name: 'primate', value: 30 },
  { name: 'rodent', value: 50 },
  { name: 'cows_milk', value: 100 },
  { name: 'doorknob', value: 200 },
  { name: 'rabbit', value: 150 },
  { name: 'indigenous egg', value: 50 }
];


const Chart =  () =>  {
  const demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

    return (
      <SimpleGrid cols={2}>
        <div>
        <Title order={4}>Data collection distribution</Title>
      <ResponsiveContainer width="95%" height={400}>
        {
        // <LineChart
        //   width={500}
        //   height={300}
        //   data={data}
        //   margin={{
        //     top: 5,
        //     right: 30,
        //     left: 20,
        //     bottom: 5,
        //   }}
        // >
        //   <CartesianGrid strokeDasharray="3 3" />
        //     <XAxis dataKey="name" />
        //     <YAxis />
        //   <Tooltip />
        //   <Legend />
          //<Line type="monotone" dataKey="location" stroke="#8884d8" activeDot={{ r: 8 }} />
         // </LineChart>
          }
          <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

            <Bar dataKey="location" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
        </div>

        <div>
        <Title order={4}>Source Level2 distribution</Title>
          <ResponsiveContainer width="95%" height={400}>
          <PieChart width={400} height={400}>
            <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
            <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        </div>
        </SimpleGrid>
    
    );
}


export default Chart;