import React from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid2';

const AdministrativeDetails = ({ data = {}, updateData }) => {

  const formatDateForInput = (date) => {
    if (!date) return '';
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const formatDateForState = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Convert date value to dd/mm/yyyy format if it's a date field
    if (name === 'submissionDate' || name === 'protocolDate') {
      updatedValue = formatDateForState(value);
    }

    updateData('administrativeDetails', { ...data, [name]: updatedValue });
  };

  return (
    <Grid container spacing={2}>
      <Grid item size={3}>
        <TextField fullWidth required label="Principal Investigator Name " variant="outlined" name="principalInvestigatorName" value={data.principalInvestigatorName || "" } onChange={handleChange}/>
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth required label="Department" variant="outlined" name="department" value={data.department || ""} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField
          fullWidth
          label="Date of Submission to NIEC "
          type="date"
          InputLabelProps={{ shrink: true }}
          name='submissionDate'
          variant="outlined"
          required
          value={formatDateForInput(data.submissionDate)} onChange={handleChange}
        />
      </Grid>
      <Grid item size={3}>
        <FormControl fullWidth>
          <InputLabel >Type of Review</InputLabel>
          <Select label="Type of Review" required  value={data.reviewType} onChange={handleChange} name='reviewType' >
            <MenuItem value="Expedited Review">Expedited Review</MenuItem>
            <MenuItem value="Full Committee Review">Full Committee Review</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth required label="Title of Study" variant="outlined" name='studyTitle' value={data.studyTitle} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth required label="Protocol Number" variant="outlined" name='protocolNumber' value={data.protocolNumber} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField fullWidth required label="Version Number" variant="outlined" name='versionNumber' value={data.versionNumber} onChange={handleChange} />
      </Grid>
      <Grid item size={3}>
        <TextField
          fullWidth
          label="Dated"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={formatDateForInput(data.protocolDate)} onChange={handleChange}
          name='protocolDate'
        />
      </Grid>
    </Grid>
  );
};

export default AdministrativeDetails;