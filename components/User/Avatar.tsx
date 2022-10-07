import {
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import router from "next/router";
import React from "react";
import { SupabaseService } from "../../services/NetworkService";
import { deepGreen } from "../../utils/colors";

export default function UserAvatar() {
  const { user } = useUser();
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  return (
    <div>
      {user ? (
        <Avatar
          sx={{ background: deepGreen, cursor: "pointer" }}
          {...bindTrigger(popupState)}
        >
          <Typography textTransform={"capitalize"}>
            {user.email ? user.email[0] : "A"}
          </Typography>
        </Avatar>
      ) : (
        <Button onClick={() => router.push("/signIn")}>Login</Button>
      )}
      <Menu {...bindMenu(popupState)}>
        <MenuItem disabled>
          <Typography>{user?.email ?? ""}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            router.push("/profile");
            popupState.close();
          }}
        >
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            onClick={async () => {
              popupState.close();
              await SupabaseService.supabase.auth.signOut();
            }}
          >
            Sign Out
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
