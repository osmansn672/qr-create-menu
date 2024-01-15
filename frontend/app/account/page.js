"use client"
import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Alert,
  AlertTitle,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Page() {
  // useRouter hook for navigation
  const router = useRouter();

  // State for feedback message
  const [feedback, setFeedback] = useState(null);

  // State for input data
  const [inputData, setInputData] = useState(() => {
    const storedData = localStorage ? JSON.parse(localStorage.getItem('inputData')) : null;

    return storedData || {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      companyName: '',
      companyAddress: '',
      companyWebsite: '',
    };
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Save input data to localStorage
    localStorage.setItem('inputData', JSON.stringify(inputData));
    // Provide feedback to the user
    setFeedback('Profil bilgileri güncellendi!');
    // Clear feedback after 3 seconds
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  return (
    <Box>
      {/* Navbar */}
      <Box>
        <Navbar />
      </Box>
      {/* Main content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Sidebar */}
        <Box zIndex={2}>
          <Sidebar />
        </Box>
        {/* Main content area */}
        <Box zIndex={1} ml={35} sx={{ width: 1 }}>
          <Box p={10} mt={6}>
            <Box
              sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Form container */}
              <Container
                sx={{
                  mt: '50px',
                }}
              >
                <Card
                  sx={{
                    p: 5,
                    borderRadius: 2,
                  }}
                >
                  {/* Personal Information */}
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      mb: 2,
                    }}
                  >
                    Kişisel Bilgiler
                  </Typography>
                  {/* First and Last Name */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      mb: 2,
                    }}
                  >
                    <TextField
                      value={inputData.firstName}
                      name='firstName'
                      onChange={(e) => handleChange(e)}
                      sx={{ flex: 1 }}
                      label="Adınız"
                      variant="standard"
                    />
                    <TextField
                      value={inputData.lastName}
                      name='lastName'
                      onChange={(e) => handleChange(e)}
                      sx={{ flex: 1 }}
                      label="Soyadınız"
                      variant='standard'
                    />
                  </Box>
                  {/* Phone Number and Email */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      mb: 5,
                    }}
                  >
                    <TextField
                      value={inputData.phoneNumber}
                      name='phoneNumber'
                      onChange={(e) => handleChange(e)}
                      sx={{ flex: 1 }}
                      label="Telefon Numarası"
                      variant='standard'
                    />
                    <TextField
                      value={inputData.email}
                      name='email'
                      onChange={(e) => handleChange(e)}
                      sx={{ flex: 1 }}
                      label="E Mail Adresi"
                      variant='standard'
                    />
                  </Box>
                  {/* Company Information */}
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      mb: 2,
                    }}
                  >
                    İşletme Bilgileri
                  </Typography>
                  {/* Company Name, Address, and Website */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <TextField
                      name='companyName'
                      value={inputData.companyName}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      label="İşletme Adı"
                      variant='standard'
                    />
                    <TextField
                      name='companyAddress'
                      value={inputData.companyAddress}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      label="İşletme Adresi"
                      variant='standard'
                    />
                    <TextField
                      name='companyWebsite'
                      value={inputData.companyWebsite}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      label="Website"
                      variant='standard'
                    />
                  </Box>
                  {/* Update Profile Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 3 }}
                      onClick={handleSubmit}
                    >
                      Profilini Güncelle
                    </Button>
                  </Box>
                </Card>
                <Stack sx={{
                  position: "absolute",
                  top: "85px",
                  left: "50%"
                }}>
                  {feedback && (
                    <Alert severity="success" onClose={() => setFeedback(null)}>
                      <AlertTitle>Bilgi</AlertTitle>
                      {feedback}
                    </Alert>
                  )}
                </Stack>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
