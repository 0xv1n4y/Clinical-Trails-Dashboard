import React from 'react';
import { TextField, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';


const Checklist = ({ data, updateData }) => {

  const handleChange = (e, id, field) => {
    const { value } = e.target;

    // Update the checklist items in the state
    const updatedItems = data.items.map((item) => 
      item.id === id ? { ...item, [field]: value } : item
    );

    updateData('checklist', { items: updatedItems });
  };
  
  return (
    <Grid container spacing={4}>  
      { data && data.items.map((item) => (
        <Grid container spacing={4} key={item.id}  sx={{ width: '100%' }}>
          {/* Name field */}
          <Grid item size={3} sx={{ alignItems:"center"}}>  {/* Changed size to size */}
            <Typography>{`${item.id}. ${item.name}`}</Typography>
          </Grid>
          <Grid item size={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select defaultValue="" label= "Status" value={item.status || ''} onChange={(e) => handleChange(e, item.id, 'status')}>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="NA">NA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item size={3}>
            <TextField
              fullWidth
              label="EnclosureNo"
              variant="outlined"
              value={item.enclosureNo || ''}
              onChange={(e) => handleChange(e, item.id, 'enclosureNo')}

            />
          </Grid>

          {/* Remarks field */}
          <Grid item size={3}>
            <TextField
              fullWidth
              label="Remarks"
              variant="outlined"
              value={item.remarks || ''}
              onChange={(e) => handleChange(e, item.id, 'remarks')}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Checklist;