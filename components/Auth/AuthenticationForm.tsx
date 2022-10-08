import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Typography, TextField, Link } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useFormik } from "formik";
import router from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import SignInWithProviders from "./SignInWithProviders";

interface Props {
  isSignUp?: boolean;
}

export default function AuthenticationForm(props: Props) {
  const { user, checkSession } = useUser();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (props.isSignUp) {
        const { error } = await supabaseClient.auth.signUp({
          email: values.email,
          password: values.password,
        });
        if (error) {
          enqueueSnackbar(error.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        } else {
          enqueueSnackbar("Check your email for the confirmation link.", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        await router.push("/");
        return;
      }

      let signInResult = await supabaseClient.auth.signIn({
        email: values.email,
        password: values.password,
      });
      if (signInResult.error) {
        enqueueSnackbar(signInResult.error.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        return;
      }
      checkSession();
      await router.push("/");
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card>
      <CardContent>
        <Stack spacing={4} p={5} minWidth="40vw">
          <Typography variant="h5">
            {props.isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={formik.isSubmitting}
              >
                {props.isSignUp ? "Sign Up" : "Sign In"}
              </LoadingButton>

              <Stack
                direction="column"
                justifyContent="flex-end"
                alignContent={"flex-end"}
                alignItems={"flex-end"}
                spacing={1}
              >
                <Link href={`${props.isSignUp ? "/signIn" : "/signUp"}`}>
                  {props.isSignUp ? "Already have an account?" : "Sign Up"}
                </Link>
              </Stack>
            </Stack>
          </form>
          <Box>
            <SignInWithProviders providers={["google", "facebook", "apple"]} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
