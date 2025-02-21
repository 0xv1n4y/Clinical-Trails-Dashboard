import React from 'react';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Investigators = ({ data = {}, updateData}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData('investigators', { ...data, [name]: value });
  };
  return (
    <Grid container spacing={2}>
      <Grid item size={3}>
        <TextField fullWidth required label="Name" variant="outlined" name='name' value={data.name || ""} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth required label="Designation" variant="outlined" name='designation' value={data.designation || ""} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth required label="Qualification" variant="outlined" name='qualification' value={data.qualification || ""} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth  required label="Department" variant="outlined" name='department' value={data.department || ""} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth required label="Address" variant="outlined" name='address' value={data.address || ""} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth required label="Contact Number" variant="outlined" name='contact' value={data.contact || ""} onChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default Investigators;