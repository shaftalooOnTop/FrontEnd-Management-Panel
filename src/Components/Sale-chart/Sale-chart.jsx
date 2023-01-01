import React from 'react';
import { MDBChart, MDBCol } from 'mdb-react-ui-kit';

export const Sale_chart = () => {
  return (
    <MDBCol lg='7'>
      <MDBChart
        type='bar'
        data={{
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [
            {
              label: 'Traffic',
              data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
            },
          ],
        }}
      />
    </MDBCol>
  );
};