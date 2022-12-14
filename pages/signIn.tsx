import { Box, Container } from "@mui/system";
import { useRouter } from "next/router";
import AuthenticationForm from "../components/Auth/AuthenticationForm";
export default function SignIn() {
  const router = useRouter();

  return (
    <Container>
      <Box
        height={"calc(100vh - 100px)"}
        display="flex"
        justifyContent={"center"}
        alignContent="center"
        alignItems="center"
      >
        <AuthenticationForm />
      </Box>
    </Container>
  );
}
