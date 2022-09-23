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

export default function Layout({ children }: any) {
  const router = useRouter();
  const { user } = useUser();
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack direction={"row"} justifyContent="end" width={"100%"}>
            {user ? (
              <Avatar
                sx={{ background: deepGreen, cursor: "pointer" }}
                {...bindTrigger(popupState)}
              >
                A
              </Avatar>
            ) : (
              <Button onClick={() => router.push("/signIn")}>Login</Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={() => router.push("/profile")}>
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            onClick={async () => {
              await SupabaseService.supabase.auth.signOut();
              popupState.close();
            }}
          >
            LogOut
          </Typography>
        </MenuItem>
      </Menu>

      <Box component={"main"} sx={{ mt: "62px" }}>
        {children}
      </Box>
    </>
  );
}
