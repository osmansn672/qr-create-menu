"use client"
import { Box, Button, Card, Radio, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
// icon
import QrCodeIcon from '@mui/icons-material/QrCode';
// data
import userData from "../Database/userData.json"

export default function Home() {
  const router = useRouter()

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [currentId, setCurrentId] = useState("")

  const handleButton = () => {
    userData.users.map((user) => {
      if (user.userName === username && user.password === password) {
        setCurrentId(user.id)
        setPassword("")
        setUserName("")
        if (userData.users[0].firstName === "") {
          router.push("/detail")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Lütfen girdiğiniz bilgileri kontrol ediniz!")
        setPassword("")
        setUserName("")
        setTimeout(() => {
          setError("")
        }, 5000)
      }
    })

  }

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 1,
      height: "100vh",
      flex: 1,
      gap: 25
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <QrCodeIcon sx={{
          width: "150px",
          height: "150px"
        }}></QrCodeIcon>
        <Typography fontSize={100}>QR MENU</Typography>
      </Box>
      <Card sx={{
        width: 500,
        display: "flex",
        flexDirection: "column",
        padding: 2,
        boxShadow: "1px 1px 9px 1px rgba(0,0,0,0.75)",
        borderRadius: "5px"
      }}>
        <Typography fontSize={40} fontWeight={700} mb={3}>Giriş Yap</Typography>
        {
          error &&
          <Typography color="error" mb={2}>{error}</Typography>
        }
        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <TextField value={username} onChange={(e) => setUserName(e.target.value)}
            sx={{
              mb: 2
            }}
            id="outlined-basic"
            label="Kullanıcı Adı"
            variant="outlined"
          />
          <TextField value={password} onChange={(e) => setPassword(e.target.value)}
            id="outlined-password-input"
            label="Şifre"
            type="password"
            autoComplete="current-password"
          />
        </Box>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5
        }}>
          <Box sx={{
            display: "flex",
            alignItems: "center"
          }}>
            <Radio
              value="a"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
            <Typography>Beni Hatırla</Typography>
          </Box>
          <Box>
            <Typography
              component="span"
              variant="body1"
              color="primary"
            >Şifremi Unuttum</Typography>
          </Box>
        </Box>
        <Button variant="contained" component="span" color="error" onClick={handleButton} >Giriş Yap</Button>
      </Card>
    </Box>
  )
}
