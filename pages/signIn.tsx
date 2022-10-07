import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useRouter } from "next/router";
import { SupabaseService } from "../services/NetworkService";
export default function Login() {
  const router = useRouter();

  return (
    <Container>
      <Box p={5}>
        <Card>
          <CardContent>
            <Stack spacing={2} p={5}>
              <Typography variant="h5">Authentication</Typography>
              <Box>
                <Button
                  onClick={async () => {
                    await SupabaseService.supabase.auth.signIn(
                      {
                        provider: "google",
                      },
                      { redirectTo: window.location.origin }
                    );
                  }}
                >
                  Sign In with Google
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
