import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

export default function DashboardPage() {
  const users = [
    { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14 },
    { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31 },
    { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 31 },
    { id: 4, firstName: 'Arya', lastName: 'Stark', age: 11 },
    { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: 20 },
  ];
  const averageAge = (users.reduce((acc, u) => acc + (u.age || 0), 0) / users.length).toFixed(1);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2.5}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2">Total Users</Typography>
            <Typography variant="h4">{users.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.5}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2">Average Age</Typography>
            <Typography variant="h4">{averageAge}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChart
            series={[{ data: [40, 30, 20, 27] }, { data: [25, 20, 40, 32] }]}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieChart
            series={[{
              data: [
                { id: 0, value: 10, label: 'A' },
                { id: 1, value: 15, label: 'B' },
                { id: 2, value: 20, label: 'C' },
              ],
            }]}
            height={300}
          />
        </Grid>
      </Grid>
    </Box>
  );
}