"use client"
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetProduct } from '@/services/useGetProduct'
import BackImage from './back.jpg'

function Page() {
    const { data, isLoading, mutate } = useGetProduct()
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

    if (isLoading) {
        return <div>Loading</div>
    }
    if (!data) {
        return null
    }
    console.log(inputData)
    const groupedData = data.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});
    return (
        <Box sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        }}>
            <Box width={1} height={1}>
                <Box>
                    <Box sx={{
                        width: 1,
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Typography sx={{
                            width: "75%",
                            overflow: "hidden",
                            textAlign: "center",
                            fontSize: "35px",
                            fontWeight: "600",
                            fontFamily: "cursive",
                            color: "#333",
                        }}>{inputData.companyName}</Typography>
                    </Box>

                    {Object.keys(groupedData).map((category) => (
                        <Box key={category.toUpperCase()} mt={2} sx={{
                            paddingLeft: 2,
                            paddingRight: 2
                        }}>
                            <Accordion sx={{ backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{ borderBottom: "1px solid #ddd" }}
                                >
                                    <Typography sx={{ fontWeight: "bold" }}>{category.toUpperCase()}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {groupedData[category].map((product, index) => (
                                        <Card key={index} sx={{ margin: "0 0 20px 0", padding: "16px", backgroundColor: "#fff" }}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>{product.title}</Typography>
                                            <Typography sx={{ mb: 1 }}>{product.content}</Typography>
                                            <Typography variant="subtitle1">{product.price} ₺</Typography>
                                        </Card>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default Page;
