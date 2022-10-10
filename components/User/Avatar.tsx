import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import router from "next/router";
import useStudent from "../../hooks/useStudent";
import { deepGreen } from "../../utils/colors";

export default function UserAvatar() {
  const { user } = useUser();
  const { student } = useStudent(user?.id);
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
        <Button onClick={() => router.push("/signIn")}>Sign In</Button>
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

        {student.data?.group && (
          <MenuItem
            onClick={() => {
              router.push(`/group/${student?.data?.group?.id}`);
              popupState.close();
            }}
          >
            <Typography>My Group</Typography>
          </MenuItem>
        )}

        <Divider />

        <MenuItem
          onClick={async () => {
            popupState.close();
            await supabaseClient.auth.signOut();
          }}
        >
          <Typography>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
