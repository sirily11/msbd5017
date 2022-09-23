import { Button, Card, CardContent } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { NetworkService, SupabaseService } from "../services/NetworkService";

export default function Login() {
  const router = useRouter();

  return (
    <Container>
      <Card>
        <CardContent>
          <Stack>
            <Box>
              <Button
                onClick={async () => {
                  await SupabaseService.supabase.auth.signIn(
                    {
                      provider: "google",
                    },
                    { redirectTo: "/signIn" }
                  );
                }}
              >
                Sign In with Google
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
