"use client"
import Navbar from '@/Components/Navbar'
import Appbar from '@/Components/Navbar'
import Sidebar from '@/Components/Sidebar'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

function Page() {
  const qrApi = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://qr-create-menu-panel.vercel.app/menu"

  const handleDownload = () => {
    if (qrApi) {
      fetch(qrApi)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'yourQrMenu.png';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error("QR code download error: ", error);
        });
    }
  }

  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row"
        }}>
        <Box zIndex={2}>
          <Sidebar />
        </Box>
        <Box zIndex={1} ml={35} width={1}>
          <Box p={10} mt={6} sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Card sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 10,
              gap: 4
            }}>
              <img style={{ width: "250px", height: "250px" }} src={qrApi}></img>
              <Button onClick={handleDownload} variant='outlined' color='primary'>Qr Kodunuzu İndirin</Button>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default Page