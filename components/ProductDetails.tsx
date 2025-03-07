"use client";

import { useAtom } from "jotai";
import { Container, Typography, Button, Rating } from "@mui/material";
import { cartAtom } from "../store/cartAtom";
import { Product } from "../lib/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = () => {
    console.log("Adding to cart from details:", product.title); // Debug log
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        console.log("Item exists, incrementing:", existing); // Debug log
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      console.log("New item added:", product); // Debug log
      return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <img src={product.image} alt={product.title} style={{ maxWidth: "300px" }} />
      <Typography variant="h6" color="primary">
        ${product.price}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {product.description}
      </Typography>
      <Rating value={product.rating.rate} readOnly precision={0.1} sx={{ mt: 1 }} />
      <Typography variant="body2" color="textSecondary">
        ({product.rating.count} reviews)
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Category: {product.category}
      </Typography>
      <Button variant="contained" onClick={addToCart} sx={{ mt: 2 }}>
        Add to Cart
      </Button>
    </Container>
  );
}