import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useUser } from "@supabase/auth-helpers-react";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NetworkService, SupabaseService } from "../services/NetworkService";
import { deepGreen } from "../utils/colors";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
  bindPopover,
} from "material-ui-popup-state/hooks";
import UserAvatar from "./User/Avatar";
import Head from "next/head";

export default function Layout({ children }: any) {
  const router = useRouter();
  const { user } = useUser();
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  return (
    <>
      <Head>
        <title>MSBD5017 Project</title>
      </Head>
      <AppBar>
        <Toolbar>
          <Stack direction={"row"} justifyContent="end" width={"100%"}>
            <UserAvatar />
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component={"main"} sx={{ mt: "62px" }}>
        {children}
      </Box>
    </>
  );
}
