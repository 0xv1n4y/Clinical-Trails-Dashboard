import React, { useState } from 'react';
import { Alert, Button, Snackbar, Typography } from '@mui/material';
import AdministrativeDetails from '../components/forms/AdministrativeDetails';
import Investigators from '../components/forms/Investigators';
import Participants from '../components/forms/Participants';
import BenefitsAndRisks from '../components/forms/BenefitsAndRisks';
import PaymentCompensation from '../components/forms/PaymentCompensation';
import StorageAndConfidentiality from '../components/forms/StorageAndConfidentiality';
import Checklist from '../components/forms/Checklist';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import formDataTemplate from '../components/json/defaultFormData .json';

const MainContent = ({ drawerOpen  }) => {
  // Combined state for the entire form
  const [formData, setFormData] = useState(formDataTemplate );

  // State for handling form submission feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const updateFormData = (section, data) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: data,
    }));
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    console.log(formData)
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:4000/api/applications', formData);
      if (response.status === 201) {
        setSnackbarMessage('Form submitted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setFormData(formDataTemplate);
      }
    } catch (error) {
      setSnackbarMessage('Failed to submit form. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error submitting form:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <main className={`mainContent ${drawerOpen ? 'mainContentOpen' : 'mainContentClosed'}`}>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item size={12} className="content-box" id="AdministrativeDetails">
            <Typography variant="h6">Administrative Details</Typography>
            <AdministrativeDetails data={formData.administrativeDetails} updateData={updateFormData} />
          </Grid>
          <Grid item size={12} className="content-box" id="Investigators">
            <Typography variant="h6">Investigators</Typography>
            <Investigators data={formData.investigators} updateData={updateFormData} />
          </Grid>
          <Grid item size={12} className="content-box" id="Participants">
            <Typography variant="h6">Participants</Typography>
            <Participants data={formData.participants} updateData={updateFormData} />
          </Grid>
          <Grid item size={12} className="content-box" id="BenefitsAndRisks">
            <Typography variant="h6">Benefits And Risks</Typography>
            <BenefitsAndRisks data={formData.benefitsRisks} updateData={updateFormData} />
          </Grid>
          <Grid item size={12} className="content-box" id="PaymentCompensation">
            <Typography variant="h6">Payment Compensation</Typography>
            <PaymentCompensation data={formData.paymentCompensation} updateData={updateFormData} />
          </Grid>
          <Grid item size={12} className="content-box" id="StorageAndConfidentiality">
            <Typography variant="h6">Storage And Confidentiality</Typography>
            <StorageAndConfidentiality data={formData.storageConfidentiality} updateData={updateFormData} />
          </Grid>
          <Grid item size={12} className="content-box" id="Checklist">
            <Typography variant="h6">Checklist</Typography>
            <Checklist data={formData.checklist} updateData={updateFormData} />
          </Grid>
          <Grid item size={12} sx={{ display: "flex", justifyContent:"center", gap:"40px"}}>
            <Button type="submit" variant="contained" color="primary" sx={{ alignItems: 'center' }}>
              Submit
            </Button>
            <Button variant='outlined' onClick={() => setFormData(formDataTemplate)}>Cancel</Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default MainContent;
