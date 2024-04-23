import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Typography } from '@mui/material';

function ActionPlanRiverStretches() {
  const rows = [
    { id: 1, river: 'Bhela', stretch: 'Kashipur to Rajpura Tanda', priority: 'I', actionPlan: 'Bhela-Action-Plan-July-2019_CPCB approved (2.4 MB)', link: '/files/1-Bhela-Action-Plan-July-2019[1].pdf' },
    { id: 2, river: 'Dhela', stretch: 'Kashipur to Garhuwala, Thakurdwara', priority: 'I', actionPlan: 'Dhela River-Action-Plan-January-2019-CPCB approved (2.2 MB)', link: '/files/2-Dhela_River-Action-Plan-July-2019[1].pdf' },
    { id: 3, river: 'Suswa', stretch: 'Mothrawala to Raiwala', priority: 'I', actionPlan: 'Suswa River-Action-Plan-January-2019- CPCB approved (2.7 MB)', link: '/files/3-Suswa_River-Action-Plan-July-2019[1].pdf' },
    { id: 4, river: 'Kichha', stretch: 'Along Kichha', priority: 'II', actionPlan: 'Kichha River-Action-Plan-January-2019- CPCB approved (1.8 MB)', link: '/files/4-Kichha_River-Action-Plan-July-2019[1].pdf' },
    { id: 5, river: 'Kalyani', stretch: 'Downstream of Pantnagar', priority: 'III', actionPlan: 'Revised Action Plan for River Kalyani', link: '/files/Revised_Action_Plan_River_Kalyani.pdf' },
    { id: 6, river: 'Ganga', stretch: 'Haridwar to Sultanpur', priority: 'IV', actionPlan: 'Revised Action Plan for River Ganga', link: '/files/Revised_Action_Plan_River_Ganga.pdf' },
    { id: 7, river: 'Kosi', stretch: 'Sultanpur to Pattikalan', priority: 'IV', actionPlan: 'Revised Action Plan for River Kosi', link: '/files/Revised_Action_Plan_River_Kosi.pdf' },
    { id: 8, river: 'Nandhor', stretch: 'Along Sitarganj', priority: 'IV', actionPlan: 'Revised Action Plan for River Nandhor', link: '/files/Revised_Action_Plan_River_Nandhor.pdf' },
    { id: 9, river: 'Pilakhar', stretch: 'Downstream of Bazpur', priority: 'IV', actionPlan: 'Revised Action Plan for River Pilakhar', link: '/files/Revised_Action_Plan_River_Pilakhar.pdf' }
  ];

  return (
    <>
      <Typography variant="h5" sx={{ my:3, fontWeight:'600', fontSize:{ lg:'1.8rem', xs:'1rem'}, color:'primary.main' }}>
        Action Plan for Rejuvenation of Polluted River Stretches
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>River</TableCell>
              <TableCell>River Stretch</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Action Plan as approved by RRC on 31.01.2019</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}.</TableCell>
                <TableCell>{row.river}</TableCell>
                <TableCell>{row.stretch}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>
                  <Link href={row.link} onClick={(e) => {
                    e.preventDefault();
                    window.open(row.link, 'win');
                  }}>
                    {row.actionPlan}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ActionPlanRiverStretches;
