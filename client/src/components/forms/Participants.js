import React from 'react';
import { TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
const Participants = ({ data = {}, updateData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData('participants', { ...data, [name]: value });
  };
  return (
    <Grid container spacing={2}>
      <Grid item size={3}>
        <FormControl fullWidth>
          <InputLabel >Type of Participants</InputLabel>
          <Select label="Type of Participants" required name='participantType' value={data.participantType || ""} onChange={handleChange} >
            <MenuItem value="Healthy volunteer">Healthy Volunteer</MenuItem>
            <MenuItem value="Patient">Patient</MenuItem>
            <MenuItem value="Vulnerable person">Vulnerable Person</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth label="Vulnerable Population Justification" variant="outlined" name='vulnerableJustification' value={data.vulnerableJustification} onChange={handleChange}/>
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth label="Additional Safeguards" variant="outlined" name='safeguards' value={data.safeguards} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth label="Reimbursement Details" variant="outlined" name='reimbursementDetails' value={data.reimbursementDetails} onChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default Participants;