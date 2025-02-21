import React from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid2';

const PaymentCompensation = ({ data = {}, updateData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData('paymentCompensation', { ...data, [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item size={4}>
        <FormControl fullWidth>
          <InputLabel >Treatment for Injuries</InputLabel>
          <Select label="Treatment for Injuries" name = "injuryTreatment" value={data.injuryTreatment} onChange={handleChange}  >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="NA">NA</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item size={4}>
        <FormControl fullWidth>
          <InputLabel >Compensation for SAE</InputLabel>
          <Select label="Compensation for SAE"  name = "saeCompensation" value={data.saeCompensation} onChange={handleChange} >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="NA">NA</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item size={4}>
        <TextField fullWidth label="Regulatory Approval Details" variant="outlined" name = "regulatoryApprovals" value={data.regulatoryApprovals} onChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default PaymentCompensation;