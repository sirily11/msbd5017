import {
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useCallback } from "react";
import Image from "next/image";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

type Provider = "google" | "facebook" | "twitter" | "github" | "apple";

interface Props {
  providers: Provider[];
}

export default function SignInWithProviders(props: Props) {
  const renderIcon = useCallback((provider: Provider) => {
    switch (provider) {
      case "google":
        return <Image src={"/icons/google.webp"} width={24} height={24} />;
      case "facebook":
        return <Image src={"/icons/facebook.png"} width={24} height={24} />;
      case "github":
        return <Image src={"/icons/github.png"} width={24} height={24} />;
      case "apple":
        return <Image src={"/icons/apple.png"} width={24} height={24} />;
      default:
        return <Typography>{provider}</Typography>;
    }
  }, []);

  const signIn = useCallback(async (provider: Provider) => {
    await supabaseClient.auth.signIn(
      {
        provider: provider,
      },
      { redirectTo: window.location.origin }
    );
  }, []);

  return (
    <Stack direction={"row"} spacing={1}>
      {props.providers.map((provider) => {
        return (
          <Box flex={1} key={provider}>
            <Card variant="outlined" sx={{ boxShadow: "none" }}>
              <Tooltip title={`Sign in with ${provider}`}>
                <CardActionArea
                  onClick={async () => {
                    await signIn(provider);
                  }}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={1}
                    p={"15px"}
                  >
                    {renderIcon(provider)}
                  </Stack>
                </CardActionArea>
              </Tooltip>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
}
