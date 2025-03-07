"use client";

import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useAtom } from "jotai";
import { cartAtom } from "../store/cartAtom";
import { Product } from "../lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = () => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
    });
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap sx={{ fontWeight: "medium" }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, display: "flex", gap: 1 }}>
        <Button
          component={Link}
          href={`/products/${product.id}`}
          variant="outlined"
          size="small"
          fullWidth
        >
          View Details
        </Button>
        <Button variant="contained" size="small" onClick={addToCart} fullWidth>
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}