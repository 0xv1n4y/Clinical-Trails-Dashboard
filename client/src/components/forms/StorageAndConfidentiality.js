import React from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid2';

const StorageAndConfidentiality = ({ data = {}, updateData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData('storageConfidentiality', { ...data, [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item size={6}>
        <FormControl fullWidth>
          <InputLabel >Study Documents Access Control</InputLabel>
          <Select label="Study Documents Access Control" name='documentControl' value={data.documentControl} onChange={handleChange} >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item size={6}>
        <FormControl fullWidth>
          <InputLabel >Study Drugs/Devices Access Control</InputLabel>
          <Select label="Study Drugs/Devices Access Control" name='drugDeviceControl' value={data.drugDeviceControl} onChange={handleChange} >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
     </Grid>
    </Grid>
  );
};

export default StorageAndConfidentiality;