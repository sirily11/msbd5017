import {
  Autocomplete,
  Avatar,
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import {
  withPageAuth,
  getUser,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import React from "react";
import { Student } from "../../services/NetworkServiceInterface";
import Image from "next/image";
import Editor from "@monaco-editor/react";

interface Props {
  found: boolean;
  student?: Student;
}

export default function Index(props: Props) {
  const initialValues: Student = {
    id: 0,
    firstName: props.student?.firstName ?? "",
    lastName: props.student?.lastName ?? "",
    email: props.student?.email ?? "",
    github: props.student?.github ?? "",
    avatar: props.student?.avatar ?? "",
    summary: props.student?.summary ?? "",
    semester: props.student?.semester ?? undefined,
    group: props.student?.group ?? undefined,
    description: props.student?.description ?? "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {},
  });

  return (
    <Container>
      <Stack pt={2} spacing={2}>
        <Typography variant="h5">Profile</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
        <form>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Card>
                <CardContent>
                  <Stack spacing={2} p={2}>
                    <Box display={"flex"} justifyContent="center">
                      <Tooltip title="Upload avatar">
                        <Avatar
                          sx={{ width: 120, height: 120, cursor: "pointer" }}
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      multiline
                      minRows={4}
                      label="Summary"
                      name="summary"
                      placeholder="Summary"
                      onChange={formik.handleChange}
                      value={formik.values.summary}
                    />

                    <Autocomplete
                      options={[]}
                      renderInput={(params) => (
                        <TextField {...params} label="Group" />
                      )}
                    />

                    <Autocomplete
                      options={[]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Semester"
                          name="semester"
                        />
                      )}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={8}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                        fullWidth
                        label="First name"
                        name="firstName"
                        placeholder="First name"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                      />
                      <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <TextField
                        fullWidth
                        label="Github"
                        name="github"
                        placeholder="Github"
                        onChange={formik.handleChange}
                        value={formik.values.github}
                      />
                    </Stack>
                    <Typography variant="subtitle2" fontWeight={"bold"}>
                      Description
                    </Typography>
                    <Card
                      variant="outlined"
                      elevation={0}
                      sx={{ boxShadow: "none", p: 1 }}
                    >
                      <Stack spacing={1}>
                        <Editor
                          height="500px"
                          defaultLanguage="markdown"
                          defaultValue=""
                          options={{
                            minimap: { enabled: false },
                          }}
                        />
                        <Divider />
                        <Stack direction={"row"} justifyContent="end">
                          <Image
                            src={"/Markdown-mark.svg"}
                            width={30}
                            height={30}
                          />
                        </Stack>
                      </Stack>
                    </Card>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = withPageAuth({
  redirectTo: "/signIn",
  async getServerSideProps(context) {
    const { user } = await getUser(context);
    const { data, count } = await supabaseServerClient(context)
      .from("student")
      .select("*")
      .eq("uid", user?.id);

    if (data?.length === 0) {
      return {
        props: {
          found: false,
          student: null,
        },
      };
    }

    return {
      props: {
        found: true,
        student: data![0],
      },
    };
  },
});
