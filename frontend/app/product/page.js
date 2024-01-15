"use client"
import { AppBar, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import Navbar from '@/Components/Navbar'
import AddIcon from '@mui/icons-material/Add';
import AddEditProductModal from '@/Components/AddEditProductModal'
import DefaultImage from '@mui/icons-material/HideImage';
import userData from '../../Database/userData.json'
import { useGetProduct, useCreateProduct, useDeleteProduct, useUpdateProduct } from '@/services/useGetProduct'

function Page() {
  const { data, isLoading, mutate } = useGetProduct()

  const [addEditItem, setAddEditItem] = useState(undefined)
  const [isUpdated, setIsUpdated] = useState(false)

  const handleChangeInput = (name, value) => {
    setAddEditItem((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddEditItem = async () => {
    try {
      isUpdated ? await useUpdateProduct(addEditItem) : await useCreateProduct(addEditItem)
      mutate()
      setAddEditItem(undefined)
    }
    catch (e) {
      console.log(e)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await useDeleteProduct(id)
      mutate()
    } catch (e) {
      console.log(e)
    }
  }

  console.log(addEditItem)

  if (isLoading) {
    return <div>Loading</div>
  }
  if (!data) {
    return null
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
        <Box zIndex={1} ml={35} width={1} >
          <Box p={6} mt={6} sx={{ width: 1 }}>
            <Container>
              <Stack>
                <Box>
                  <Typography variant='h5'>Yeni Ürün Ekleyin</Typography>
                  <Card sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: "15px",
                    mt: 2
                  }}>
                    <Button onClick={() => setAddEditItem(null)}><AddIcon />Yeni Ürün Ekle</Button>
                  </Card>
                </Box>
              </Stack>
            </Container>
          </Box>
          <Box pl={10} pr={10} sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
            {
              data?.map((product) => (
                <Card
                  key={product._id}
                  sx={{
                    width: "calc(25% - 20px)",
                    margin: "10px",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* {product.image ? (
                      <Box
                        sx={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "3px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={product.image}
                          alt={`Product ${product.id}`}
                          style={{ width: "100%" }}
                        />
                      </Box>
                    ) : <DefaultImage sx={{
                      width: "150px",
                      height: "150px",
                      opacity: ".6"
                    }}>
                    </DefaultImage>} */}
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
                      <Typography sx={{ overflow: "scroll" }}>{product.content}</Typography>
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
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2
                    }}
                  >
                    <Button
                      onClick={() => { setAddEditItem(product); setIsUpdated(true) }}
                      variant="outlined"
                      color="primary"
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteItem(product._id)}
                    >
                      Sil
                    </Button>

                  </Box>
                </Card>
              ))}

          </Box>
          <AddEditProductModal
            isUpdated={isUpdated}
            item={addEditItem}
            handleChangeInput={handleChangeInput}
            visible={addEditItem !== undefined}
            handleClose={() => setAddEditItem(undefined)}
            handleAddEditItem={handleAddEditItem}

          />
        </Box>
      </Box>
    </Box >
  )
}

export default Page;
