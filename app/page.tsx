"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Typography, Grid } from "@mui/material";
import { fetchProducts, fetchProductsByCategory } from "../lib/api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { Product } from "../lib/types";

export default function Home() {
  const [category, setCategory] = useState("");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => (category ? fetchProductsByCategory(category) : fetchProducts()),
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Catalog
      </Typography>
      <CategoryFilter category={category} setCategory={setCategory} />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}