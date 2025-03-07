"use client";

import { useAtom } from "jotai";
import { Container, Typography, Button, List, ListItem, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { cartAtom } from "@/store/cartAtom";
import { CartItem } from "@/lib/types";

export default function CartPage() {
  const [cart, setCart] = useAtom(cartAtom);

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Your Cart is Empty</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{item.title} (x{item.quantity})</Typography>
            <div>
              <IconButton onClick={() => updateQuantity(item.id, -1)}>
                <Remove />
              </IconButton>
              <IconButton onClick={() => updateQuantity(item.id, 1)}>
                <Add />
              </IconButton>
              <IconButton onClick={() => removeItem(item.id)}>
                <Delete />
              </IconButton>
              <Typography component="span">${(item.price * item.quantity).toFixed(2)}</Typography>
            </div>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${totalCost.toFixed(2)}</Typography>
    </Container>
  );
}