"use client"
import { AppBar, Box, Button, Typography } from "@mui/material";
// icons
import Home from '@mui/icons-material/Home';
import Product from '@mui/icons-material/QrCode';
import QrCode from '@mui/icons-material/QrCode2';
import Account from '@mui/icons-material/AccountCircle';
import { usePathname, useRouter } from "next/navigation";
// data
import menuData from "../Database/menuData.json"
import userData from "../Database/userData.json"


function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (data) => {
    router.push(data.route)
  }

  return (
    <AppBar position="fixed" sx={{
      backgroundColor: "#fff",
      left: 0,
      zIndex: "-1",
      width: "280px",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      {/* yukarısı */}
      <Box sx={{
        mt: "60px",
        p: "20px"
      }}>
        {
          menuData.menu.map((data) => {
            let Icon
            if (data.icon === "Home") {
              Icon = Home
            } else if (data.icon === "Product") {
              Icon = Product
            } else if (data.icon === "QrCode") {
              Icon = QrCode
            } else if (data.icon === "Account") {
              Icon = Account
            }
            return (
              <Box key={data.id}
                onClick={() => handleClick(data)}
                sx={{
                  padding: "20px",
                  display: "flex",
                  backgroundColor: pathname === data.route ? "#d32f2f" : "transparent",
                  borderRadius: 3,
                  cursor: "pointer"
                }}>
                <Icon sx={{
                  color: pathname === data.route ? "#fff" : "#637381",
                  mr: "15px"
                }} />
                <Typography sx={{
                  color: pathname === data.route ? "#fff" : "#637381",
                  fontWeight: "600"
                }}>
                  {data.title}
                </Typography>
              </Box>
            );
          })
        }
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: "30px"
      }}>
        <Box sx={{
          width: "125px",
          height: "125px",
          borderRadius: 100,
          backgroundColor: "#d32f2f",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: "10px"
        }}><Typography fontSize="40px">{userData.users[0].userName[0].toUpperCase()}</Typography></Box>
        <Typography mb="10px" fontSize="20px" color="#637381">{userData.users[0].userName.toUpperCase()}</Typography>
        <Button onClick={() => router.push("/")} variant="outlined" color="error">ÇIKIŞ YAP</Button>
      </Box>
    </AppBar>
  );
}

export default Sidebar;
