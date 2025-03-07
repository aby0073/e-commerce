// lib/api.ts
import { Product } from "./types";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch products for category ${category}`);
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Product ${id} not found`);
  return res.json();
}