import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MdOutlineDelete } from 'react-icons/md';

const AllClinicalTrials = ({ drawerOpen }) => {
  const [clinicalTrials, setClinicalTrials] = useState([]);

  // Fetch clinical trials data when component mounts
  useEffect(() => {
    const fetchClinicalTrials = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/applications');
        setClinicalTrials(response.data);
      } catch (error) {
        console.error('Error fetching clinical trials:', error);
      }
    };

    fetchClinicalTrials();
  }, []);

  const handleDelete = async (items) => {
    const applicationId = items.administrativeDetails?.applicationId; // Ensure applicationId exists
  
    if (applicationId) {
      try {
        // Send DELETE request to the API
        const response = await axios.delete(`http://localhost:4000/api/applications/${applicationId}`);
        
        if (response.status === 200) {
          console.log(`Successfully deleted trial with id: ${applicationId}`);
  
          // Optionally, remove the deleted item from the state
          setClinicalTrials((prevTrials) =>
            prevTrials.filter((trial) => trial.administrativeDetails?.applicationId !== applicationId)
          );
        } else {
          console.error('Failed to delete the trial.');
        }
      } catch (error) {
        console.error('Error while deleting the trial:', error);
      }
    } else {
      console.error('applicationId is not available.');
    }
  };

  // Define columns for the Mantine table
  const columns = useMemo(
    () => [
      {
        header: 'Study Title',
        accessorFn: (row) => (
          <Typography className="data-column title">
            {row.administrativeDetails?.studyTitle || 'No Title'}
          </Typography>
        ),
      },
      {
        header: 'Protocol Number',
        accessorFn: (row) => (
          <Typography className="data-column">
            {row.administrativeDetails?.protocolNumber || 'N/A'}
          </Typography>
        ),
      },
      {
        header: 'Principal Investigator',
        accessorFn: (row) => (
          <Typography className="data-column">
            {row.administrativeDetails?.principalInvestigatorName || 'N/A'}
          </Typography>
        ),
      },
      {
        header: 'Submission Date',
        accessorFn: (row) => (
          <Typography className="data-column">
            {row.administrativeDetails?.submissionDate || 'N/A'}
          </Typography>
        ),
      },
      {
        header: 'Actions',
        accessorFn: (row) => (
          <Box className="action-column">
            <Typography className="action-icon delete">
              <MdOutlineDelete onClick={() => handleDelete(row)} />
            </Typography>
          </Box>
        ),
      },
    ],
    []
  );

  // Configure the Mantine table
  const table = useMantineReactTable({
    columns,
    data: clinicalTrials,
    renderTopToolbar: () => (
      <Box className="top-toolbar">
        <Box className="title">Clinical Trials</Box>
        <Box className="title">Total Trials: {clinicalTrials.length}</Box>
      </Box>
    ),
    mantineTableContainerProps: { sx: { maxHeight: 450, width: '100%' } },
    enableStickyHeader: true,
    initialState: { showColumnFilters: false, showGlobalFilter: false },
    manualPagination: true,
    enablePagination: true,
    enableFilters: false,
    manualFiltering: false,
    enableColumnActions: false,
    enableSorting: false,
    defaultColumn: { minSize: 20, maxSize: 100, size: 60 },
  });

  return (
    <div className={`mainContent ${drawerOpen ? 'mainContentOpen' : 'mainContentClosed'}`}>
      <h2>All Clinical Trials</h2>
      <Box className="table-mantine">
        <MantineReactTable table={table} />
      </Box>
    </div>
  );
};

export default AllClinicalTrials;
