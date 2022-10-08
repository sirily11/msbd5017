import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Head from "next/head";
import { NextCirculatProgressBar, NextLinearProgressBar } from "./PageProgress";
import UserAvatar from "./User/Avatar";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>MSBD5017 Project</title>
      </Head>
      <AppBar>
        <Toolbar>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            width={"100%"}
          >
            <Typography variant="h6">
              <Link href={"/"} underline="none">
                MSBD5017 HomePage
              </Link>
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <NextCirculatProgressBar />
              <UserAvatar />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <NextLinearProgressBar />
      <Box component={"main"} sx={{ mt: "62px" }}>
        {children}
      </Box>
    </>
  );
}
