"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Container, CircularProgress, Typography } from "@mui/material";
import { fetchProductById } from "@/lib/api";
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/lib/types";

export default function ProductPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : undefined;

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as string),  
    enabled: !!id,
  });

  if (!id) return <Typography color="error">Invalid Product ID</Typography>;
  if (isLoading)
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return <ProductDetails product={product!} />;
}