
const express = require('express');
const router = express.Router();
const { Application, AdministrativeDetails, Investigator, Participant, BenefitsRisks, Payment, Storage, Checklist } = require('../models/models');

// Single POST request to save the entire form data
router.post('/applications', async (req, res) => {
  try {
    // Create a new applicationa
    const application = await Application.create({});

    const { 
      administrativeDetails, 
      investigators, 
      participants, 
      benefitsRisks, 
      paymentCompensation, 
      storageConfidentiality, 
      checklist 
    } = req.body;

    // Save Administrative Details
    if (administrativeDetails) {
      await AdministrativeDetails.create({
        ...administrativeDetails,
        applicationId: application._id
      });
    }

    // Save Investigators
    if (investigators) {
      await Investigator.create({ ...investigators, applicationId: application._id });
    }
    
    // Save Participants
    if (participants) {
      await Participant.create({
        ...participants,
        applicationId: application._id
      });
    }

    // Save Benefits & Risks
    if (benefitsRisks) {
      await BenefitsRisks.create({
        ...benefitsRisks,
        applicationId: application._id
      });
    }

    // Save Payment & Compensation
    if (paymentCompensation) {

      // Validate required fields
      if (!['Yes', 'No', 'NA'].includes(paymentCompensation.injuryTreatment)) {
        paymentCompensation.injuryTreatment = 'NA'; // Set default value
      }
      if (!['Yes', 'No', 'NA'].includes(paymentCompensation.saeCompensation)) {
        paymentCompensation.saeCompensation = 'NA'; // Set default value
      }

      await Payment.create({
        ...paymentCompensation,
        applicationId: application._id
      });
    }

    // Save Storage & Confidentiality
    if (storageConfidentiality) {

        // Validate required fields
        if (!['Yes', 'No'].includes(storageConfidentiality.documentControl)) {
          storageConfidentiality.documentControl = 'No'; // Set default value
        }
        if (!['Yes', 'No'].includes(storageConfidentiality.drugDeviceControl)) {
          storageConfidentiality.drugDeviceControl = 'No'; // Set default value
        }

      await Storage.create({
        ...storageConfidentiality,
        applicationId: application._id
      });
    }

  if (checklist && checklist.items) {
    checklist.items = checklist.items.map(item => ({
      ...item,
      status: ['Yes', 'No', 'NA'].includes(item.status) ? item.status : 'NA' // Ensure valid status
    }));

    await Checklist.create({
      ...checklist,
      applicationId: application._id
    });
  }

    res.status(201).json({ message: "Form saved successfully!", applicationId: application._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to GET all applications with combined data
router.get('/applications', async (req, res) => {
  try {
    // Step 1: Fetch all Application records
    const applications = await Application.find();

    // Step 2: For each Application, fetch related data from other tables
    const combinedDataPromises = applications.map(async (application) => {
      const applicationId = application._id;

      // Fetch related data using the applicationId from each collection
      const [
        administrativeDetails,
        investigators,
        participants,
        benefitsRisks,
        paymentCompensation,
        storageConfidentiality,
        checklist
      ] = await Promise.all([
        AdministrativeDetails.findOne({ applicationId }),
        Investigator.find({ applicationId }), 
        Participant.findOne({ applicationId }),
        BenefitsRisks.findOne({ applicationId }),
        Payment.findOne({ applicationId }),
        Storage.findOne({ applicationId }),
        Checklist.findOne({ applicationId })
      ]);

      // Combine all data into a single object
      return {
        application,
        administrativeDetails,
        investigators,
        participants,
        benefitsRisks,
        paymentCompensation,
        storageConfidentiality,
        checklist
      };
    });

    // Wait for all combined data to resolve
    const combinedData = await Promise.all(combinedDataPromises);

    // Step 3: Return the combined data for all applications
    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching application data:', error);
    res.status(500).json({ error: error.message });
  }
});


router.delete('/applications/:appId', async (req, res) => {
  try {
    const { appId } = req.params;

    // Find the application by ID
    const application = await Application.findById(appId);

    // Check if the application exists
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Delete related documents in other collections
    await Promise.all([
      AdministrativeDetails.deleteOne({ applicationId: appId }),
      Investigator.deleteOne({ applicationId: appId }), // In case there are multiple investigators
      Participant.deleteOne({ applicationId: appId }),
      BenefitsRisks.deleteOne({ applicationId: appId }),
      Payment.deleteOne({ applicationId: appId }),
      Storage.deleteOne({ applicationId: appId }),
      Checklist.deleteOne({ applicationId: appId })
    ]);

    // Finally, delete the application itself
    await Application.findByIdAndDelete(appId);

    res.status(200).json({ message: `Application and related data for id ${appId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

