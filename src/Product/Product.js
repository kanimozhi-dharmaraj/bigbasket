import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import Products from '../Products.json';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';


const Product = () => {
    const [params] = useSearchParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
      setProduct(Products.find((item) => item.index === parseInt(params.get("id"))));
    }, [params]);

    return (
      <>
        Product {product?.brand}
        <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {product && (
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={product.image}
          alt="product_image"
        />
      )}
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography gutterBottom variant="body" component="div">
                    {product?.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product?.product}
                  </Typography>
        
        </CardContent>
       
      </Box>
     
    </Card>
      </>
    )
}

export default Product
