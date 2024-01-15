"use client"
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/navigation';

function Navbar() {
    const router = useRouter()
    const logOut = () => {
        router.push("/")
    }
    return (
        <AppBar position="fixed" color="error">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    QR Menü Paneli
                </Typography>
                <Button onClick={logOut} color='inherit'>Çıkış Yap</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar