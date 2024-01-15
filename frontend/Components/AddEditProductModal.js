import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function AddEditProductModal({ item, visible, handleClose, handleChangeInput, handleAddEditItem, isUpdated }) {


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={visible}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                    {isUpdated ? "Ürünü Düzenle" : "Ürün Ekle"}
                </Typography>
                <TextField
                    label="Başlık"
                    variant="outlined"
                    sx={{ width: "100%", mb: 2 }}
                    name='title'
                    value={item?.title || ""}
                    onChange={(e) => handleChangeInput("title", e.target.value)}
                />
                <TextField
                    label="İçerik"
                    variant="outlined"
                    sx={{ width: "100%", mb: 2 }}
                    name='content'
                    value={item?.content || ""}
                    onChange={(e) => handleChangeInput("content", e.target.value)}
                />
                <TextField
                    label="Fiyat"
                    variant="outlined"
                    sx={{ width: "100%", mb: 2 }}
                    name='price'
                    value={item?.price || ""}
                    onChange={(e) => handleChangeInput("price", e.target.value)}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="selectedLabel">Kategori</InputLabel>
                    <Select
                        labelId="selectedLabel"
                        id="selected"
                        label="categori"
                        name='category'
                        value={item?.category || ""}
                        onChange={(e) => handleChangeInput("category", e.target.value)}
                    >
                        <MenuItem value="yemek">Yemek</MenuItem>
                        <MenuItem value="sıcak içecek">Sıcak İçecek</MenuItem>
                        <MenuItem value="soğuk içecek">Soğuk İçecek</MenuItem>
                        <MenuItem value="tatlı">Tatlı</MenuItem>
                        <MenuItem value="atıştırmalık">Atıştırmalık</MenuItem>
                    </Select>
                </FormControl>
                {/* <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 3
                }}>
                    <label
                        htmlFor="file"
                        style={{
                            padding: "5px 10px",
                            backgroundColor: "#2196f3",
                            color: "#fff",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {updatedImage ? "Fotoğrafı Değiştir" : "Fotoğraf Ekle"}
                    </label>
                    <input
                        id='file'
                        type="file"
                        style={{ display: "none" }}
                    onChange={handleFileChange}
                    />
                    {updatedImage && (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px"
                        }}>
                            <img src={updatedImage} alt="Selected" style={{ maxWidth: '100px', marginTop: '10px' }} />
                            <CloseIcon onClick={handleRemoveImage} style={{ cursor: "pointer" }} />
                        </Box>
                    )}
                </Box> */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2
                }}>
                    <Button onClick={handleClose} variant='outlined' color='error'>İptal Et</Button>
                    <Button variant="outlined" color="primary" onClick={() => handleAddEditItem()}>
                        {isUpdated ? "Güncelle" : "Ekle"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddEditProductModal;
