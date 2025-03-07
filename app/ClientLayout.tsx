// app/ClientLayout.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useAtom } from "jotai";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Badge,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import Link from "next/link";
import { cartAtom } from "../store/cartAtom";
import "../styles/globals.css";

const cache = createCache({ key: "css", prepend: true });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart] = useAtom(cartAtom); // Get cart state
  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  // Update body class and save theme
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Calculate total items in cart for badge
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Product Catalog
                </Typography>
                <Button color="inherit" component={Link} href="/">
                  Home
                </Button>
                <Badge badgeContent={cartItemCount} color="secondary">
                  <Button color="inherit" component={Link} href="/cart">
                    Cart
                  </Button>
                </Badge>
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  color="default"
                  inputProps={{ "aria-label": "toggle dark mode" }}
                />
              </Toolbar>
            </AppBar>
            <main>{children}</main>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </CacheProvider>
  );
}