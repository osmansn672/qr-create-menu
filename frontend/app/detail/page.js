"use client"
import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    Container,
    TextField,
    Typography,
    Alert,
    AlertTitle,
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useRouter } from 'next/navigation';
import useGetData from '@/Database/userData';

export default function Page() {
    const router = useRouter();
    const { setValue, inputData } = useGetData();
    const [alertOpen, setAlertOpen] = useState(false);

    const handleButton = () => {
        if (
            inputData.firstName === '' ||
            inputData.lastName === '' ||
            inputData.phoneNumber === '' ||
            inputData.email === '' ||
            inputData.companyName === '' ||
            inputData.companyAddress === '' ||
            inputData.companyWebsite === ''
        ) {
            // Show alert if any field is empty
            setAlertOpen(true);
            setInterval(() => {
                setAlertOpen(false)
            }, 3000)
        } else {
            router.push('/dashboard');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value);
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 5,
                }}
            >
                <QrCodeIcon
                    sx={{
                        width: '100px',
                        height: '100px',
                        mr: 2,
                    }}
                ></QrCodeIcon>
                <Typography fontSize="40px">Hesap Bilgileri</Typography>
            </Box>
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
                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: '600',
                            mb: 2,
                        }}
                    >
                        Kişisel Bilgiler
                    </Typography>
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
                            name="firstName"
                            onChange={(e) => handleChange(e)}
                            sx={{ flex: 1 }}
                            label="Adınız"
                            variant="standard"
                        />
                        <TextField
                            value={inputData.lastName}
                            name="lastName"
                            onChange={(e) => handleChange(e)}
                            sx={{ flex: 1 }}
                            label="Soyadınız"
                            variant="standard"
                        />
                    </Box>
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
                            name="phoneNumber"
                            onChange={(e) => handleChange(e)}
                            sx={{ flex: 1 }}
                            label="Telefon Numarası"
                            variant="standard"
                        />
                        <TextField
                            value={inputData.email}
                            name="email"
                            onChange={(e) => handleChange(e)}
                            sx={{ flex: 1 }}
                            label="E Mail Adresi"
                            variant="standard"
                        />
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: '600',
                            mb: 2,
                        }}
                    >
                        İşletme Bilgileri
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            name="companyName"
                            value={inputData.companyName}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                            label="İşletme Adı"
                            variant="standard"
                        />
                        <TextField
                            name="companyAddress"
                            value={inputData.companyAddress}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                            label="İşletme Adresi"
                            variant="standard"
                        />
                        <TextField
                            name="companyWebsite"
                            value={inputData.companyWebsite}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                            label="Website"
                            variant="standard"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 5,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button onClick={handleButton} variant="outlined" color="error">
                            Profilini Tamamla
                        </Button>
                    </Box>
                    {
                        alertOpen && (
                            <Alert
                                sx={{ mt: 2 }}
                                severity="error"
                                onClose={() => setAlertOpen(false)}
                                open={alertOpen}
                            >
                                <AlertTitle>Uyarı</AlertTitle>
                                Lütfen Boşlukları Doldurunuz!
                            </Alert>
                        )
                    }
                </Card>
            </Container>
        </Box>
    );
}
