"use client"
import Box from '@mui/material/Box';
import React from 'react'
import Sidebar from '../../Components/Sidebar';
import { Breadcrumbs, Button, Card, IconButton, Link, Stack, Typography } from '@mui/material';
import Navbar from '@/Components/Navbar';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useRouter } from 'next/navigation';
import DetailIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useGetProduct } from '@/services/useGetProduct';

export default function Dashboard() {
  const router = useRouter()
  const inputData = JSON.parse(localStorage.getItem('inputData'));
  const { data, isLoading, mutate } = useGetProduct()

  const qrApi = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/menu"

  if (isLoading) {
    return <div>Loading</div>
  }
  if (!data) {
    return null
  }

  const sliceData = data.slice(0, 5)
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
        <Box zIndex={1} ml={35} >
          <Box p={10} mt={6}>

            <Typography fontSize={40} fontWeight={600}>Hoşgeldin, {inputData.firstName} {inputData.lastName}</Typography>
            <Stack flexDirection="row" alignItems="center" mt={3}>
              <QrCodeIcon sx={{
                width: "150px",
                height: "150px",
                ml: "-20px"
              }}></QrCodeIcon>
              <Stack>
                <Typography fontSize={30} fontWeight={600}>Kendi Qr Menünüzü</Typography>
                <Typography fontSize={30} fontWeight={600}>Hızlı Ve Kolay </Typography>
                <Typography fontSize={30} fontWeight={600}>Bir Şekilde Oluşturun</Typography>
              </Stack>
            </Stack>
            <Box mt={3}>
              <Button onClick={() => router.push("/product")} variant='text' sx={{ color: "black", marginLeft: "-15px" }}>
                <Typography fontSize={25} fontWeight={600}>Ürün Yönetimi</Typography>
              </Button>
              <Box sx={{ display: "flex" }}>
                {sliceData.length === 0 ? (
                  <Typography>Maalesef herhangi bir ürün bulunmamakta.</Typography>
                ) : (
                  sliceData.map((product) => (
                    <Box key={product._id}>
                      <Card
                        sx={{
                          marginLeft: "15px",
                          padding: 2,
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          "&:hover": {
                            cursor: "pointer"
                          },
                        }}
                        onClick={() => router.push("/product")}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "3px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography fontSize="18px" fontWeight="600">{product.title}</Typography>
                          </Box>
                          <Box
                            sx={{
                              borderRadius: "3px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              textAlign: "start"
                            }}
                          >
                            <Typography>{product.content}</Typography>
                          </Box>
                          <Box
                            sx={{
                              borderRadius: "3px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography>{product.category}</Typography>
                          </Box>
                          <Box
                            sx={{
                              borderRadius: "3px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography color="error">{product.price} ₺</Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
            <Box mt={3}>
              <Button onClick={() => router.push("/qrcode")} variant='text' sx={{ color: "black", marginLeft: "-15px" }}>
                <Typography fontSize={25} fontWeight={600}>Qr Kodum</Typography>
              </Button>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
              }}>
                <Box sx={{
                  "&:hover": {
                    cursor: "pointer"
                  }
                }}>
                  <img onClick={() => router.push("/qrcode")} style={{ width: "100px", height: "100px" }} src={qrApi}></img>
                </Box>
                <Typography width="400px">Qr kod hakkında daha fazla detay için Qr Kodum menüsüne gidin veya qr koda tıklayın</Typography>
              </Box>
            </Box>
            <Box mt={3}>
              <Button onClick={() => router.push("/account")} variant='text' sx={{ color: "black", marginLeft: "-15px" }}>
                <Typography fontSize={25} fontWeight={600}>Hesap</Typography>
              </Button>
              <Box>
                {
                  inputData.firstName ? <Typography>{`Hoşgeldin ${inputData.firstName}, daha fazla detay için hesap menüsüne gidin.`}</Typography> : <Typography>Profil bilgileri henüz güncellenmemiş</Typography>
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}
