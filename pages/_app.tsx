import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import Layout from "../components/Layout";
import { SupabaseService } from "../services/NetworkService";
import "../styles/globals.css";
import { deepGreen } from "../utils/colors";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: deepGreen,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "black",
          backgroundColor: "rgb(255, 255, 255, 0.8)",
          boxShadow: "none",
          height: 64,
          transition:
            "width 200ms cubic-beizer(0.4, 0, 0.2, 1) 0ms, height 200ms cubic-beizer(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow:
            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(84,214,44,0.10)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "rgb(0, 171, 85)",
          boxShadow: "rgb(0 171 85 /24%) 0px 8px 16px 0px",
          borderRadius: "8px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          [`& fieldset`]: {
            borderRadius: 16,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          [`& fieldset`]: {
            borderRadius: 16,
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <UserProvider supabaseClient={SupabaseService.supabase}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
              <ReactQueryDevtools />
              <CssBaseline />
            </Layout>
          </QueryClientProvider>
        </ThemeProvider>
      </UserProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
