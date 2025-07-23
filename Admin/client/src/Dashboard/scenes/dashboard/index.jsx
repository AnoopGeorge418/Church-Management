import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { tokens } from '../../../theme';
import ChurchIcon from '@mui/icons-material/Church';
import HailIcon from '@mui/icons-material/Hail';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import Axios from 'axios';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Cookies from 'js-cookie';
import axios from 'axios';
import GetAppIcon from '@mui/icons-material/GetApp';
import { CSVLink } from 'react-csv';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [mockTransactions, setMockTransactions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
 
    const [open, setOpen] = useState(false);
    const [transactionIdToDelete, setTransactionIdToDelete] = useState('');
    const [password, setPassword] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:5000/api/admimregister/admindata')
      .then((res) => {
        console.log(res.data.users, 1111111111);
        setMockTransactions(res.data.users);
      })
      .catch((err) => {
        console.log(err, );
      });
  }, []);
  

  const [familyStatistics, setFamilyStatistics] = useState({
    totalFamilies: 0,
    totalActiveFamilies: 0,
    totalInactiveFamilies: 0,
    totalChildren: 0,
    totalMarriages: 0,
  });

  const [previousStatistics, setPreviousStatistics] = useState({
    totalFamilies: 0,
    totalActiveFamilies: 0,
    totalInactiveFamilies: 0,
    totalChildren: 0,
    totalMarriages: 0,
  });

  const [increase, setIncrease] = useState('');

  useEffect(() => {
    const fetchFamilyStatistics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/familyStatistics');
        const data = await response.json();
        // console.log('Response data:', data);
        setFamilyStatistics(data.currentStatistics);
        setPreviousStatistics(data.previousStatistics || {});
        
      } catch (error) {
        console.error('Error fetching family statistics:', error);
      }
    };

    fetchFamilyStatistics();
  }, []);

  useEffect(() => {
    const calculateIncrease = () => {
      const constantIncreasePercentage = 90; // Set the desired constant increase percentage

      if (
        familyStatistics.totalFamilies !== undefined &&
        previousStatistics.totalFamilies !== undefined
      ) {
        const currentTotal = familyStatistics.totalFamilies;
        const previousTotal = previousStatistics.totalFamilies;

        // Calculate the percentage increase
        const increasePercentage = ((currentTotal - previousTotal) / previousTotal) * 100;

        // Check if the increase percentage is positive
        if (increasePercentage > 0) {
          return `+${constantIncreasePercentage}%`;
        } else if (increasePercentage === 0) {
          return `0%`; // No increase, return 0%
        } else {
          return `${increasePercentage}%`;
        }
      }

      return '';
    };

    const calculatedIncrease = calculateIncrease();
    setIncrease(calculatedIncrease);
  }, [familyStatistics, previousStatistics]);

  const handleDeleteTransaction = (transactionId) => {
    // Show the password prompt dialog
    setOpen(true);
    setTransactionIdToDelete(transactionId);
  };

  const handleSubmitPassword = () => {
    // Perform the deletion logic here using the transactionIdToDelete and password
    console.log('Deleting transaction with ID:', transactionIdToDelete);
    console.log('Entered password:', password);

    // Clear the password input field
    setPassword('');

    // Close the password prompt dialog
    setOpen(false);

    // Send the transactionIdToDelete and password to the backend for verification
    Axios.post('http://localhost:5000/api/deleteAdmindata', {
      transactionId: transactionIdToDelete,
      password: password,
    },{
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('admin_token')}`, 
      }
    })
      .then((res) => {
        console.log('Deletion successful:', res.data);
        setSnackbarMessage('Transaction deleted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // Perform any necessary actions after successful deletion
      })
      .catch((err) => {
        console.log('Deletion failed:', err.response.data);
        setSnackbarMessage('Failed to delete transaction');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        // Handle the deletion failure
      });
  };

 

 
  const [statisticsBaptism, setStatisticsBaptism] = useState(null);

  useEffect(() => {
    const fetchBaptismStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Statistics');
        setStatisticsBaptism(response.data);
      } catch (error) {
        console.error('Error fetching baptism statistics:', error);
      }
    };

    fetchBaptismStats();
  }, []);

  const [statisticsMarriage, setStatistsMArriage] = useState(null);

  useEffect(() => {
    const fetchMarriage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ma/statistics');
        setStatistsMArriage(response.data,);
      } catch (error) {
        console.error('Error fetching baptism statistics:', error);
      }
    };

    fetchMarriage();
  }, []);

  const [statisticsDeath, setStatisticsDeath] = useState(null);

  useEffect(() => {
    const fetchDeathStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dth/statistics');
        setStatisticsDeath(response.data);
      } catch (error) {
        console.error('Error fetching death statistics:', error);
      }
    };

    fetchDeathStats();
  }, []);

 

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
  ];
  const csvData = mockTransactions.map((transaction) => ({
    name: transaction?.name || '',
    email: transaction?.email || '',
    role: transaction?.role || '',
  }));

  

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <ChurchIcon sx={{ mr: '10px' }} />
            St.Antony's Church
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={familyStatistics.totalFamilies}
            subtitle="Family Statistics"
            // progress={familyStatistics.progress}
            // increase={increase}
            icon={<HailIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
       <StatBox
        title={statisticsBaptism?.currentStatistics?.totalBaptisms || 0}
        subtitle="Baptism Statistics"
        // progress={statisticsBaptism?.increasePercentage / 100 || 0} // Divide by 100 to get a decimal value
        // increase={statisticsBaptism?.increasePercentage || 0}
        icon={<BabyChangingStationIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
      />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statisticsMarriage?.currentStatistics?.totalMarriages || 0}
            subtitle="Marriage Statistics"
            // progress={statisticsBaptism?.increasePercentage/ 100 || 0} 
            // increase={statisticsBaptism?.increasePercentage || 0}
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
                 <StatBox
            title={statisticsDeath?.currentStatistics?.totalDeaths || 0} // Format the number with commas
          subtitle="Death Statistics"
          // progress={statisticsDeath.increasePercentage / 100 || 0} // Divide by 100 to get a decimal value
          // increase={`+${statisticsDeath.increasePercentage}%`}
          icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
        />

        </Box>
        
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Admin List
              
            </Typography>
            <CSVLink
        data={csvData}
        headers={csvHeaders}
        filename={`admin_list_${new Date().toISOString()}.csv`}
        target="_blank"
        style={{ textDecoration: 'none' }}
        
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<GetAppIcon />}
          size="small"
       
        >
          Download as CSV
        </Button>
      </CSVLink>
          </Box>
         

          {mockTransactions.map((transaction, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
          sx={{ margin: "10px 0px" }}
            >
              <Box>
                <Typography
              
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600" display="flex"
                
                >
                  {transaction?.name}
                </Typography>
                <Typography color={colors.grey[100]} sx={{ padding: "5px" }} >
                  {transaction?.email}
                </Typography>
              </Box>
              <Box
  width="15%"
  p="5px 10px"
  display="flex"
  alignItems="center"
  justifyContent="center"
  backgroundColor={
    transaction?.role === 'admin'
      ? colors.greenAccent[600]
      : transaction?.role === 'manager'
      ? colors.greenAccent[700]
      : colors.greenAccent[700]
  }
  borderRadius="4px"
>
                {transaction?.role === 'admin' && <AdminPanelSettingsOutlinedIcon />}
                {transaction?.role === 'manager' && <SecurityOutlinedIcon />}
                {transaction?.role === 'user' && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                  {transaction?.role}
                </Typography>
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                <Button onClick={() => handleDeleteTransaction(transaction._id)}>
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Password prompt dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter Admin Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitPassword} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
