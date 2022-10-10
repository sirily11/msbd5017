import Editor from "@monaco-editor/react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import {
  getUser,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import useGroups from "../../hooks/useGroups";
import { useSemesters } from "../../hooks/useSemesters";
import useStudent from "../../hooks/useStudent";
import { NetworkService } from "../../services/NetworkService";
import {
  Group,
  Semester,
  Student,
} from "../../services/NetworkServiceInterface";

interface Props {
  student: Student;
}

export default function Index(props: Props) {
  const user = useUser();
  const { updateStudent } = useStudent(user.user?.id);
  const [groupSearcKey, setGroupSearchKey] = useState("");
  const { groupsByKeyword } = useGroups(1, groupSearcKey);
  const { enqueueSnackbar } = useSnackbar();

  const { semesters } = useSemesters();

  const formik = useFormik({
    initialValues: props.student,
    onSubmit: async (values) => {
      const result = await updateStudent(values);
      if (result?.error) {
        enqueueSnackbar(`Error updating student: ${result.error.message}`, {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        return;
      }
      enqueueSnackbar("Student updated successfully", {
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    },
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
        <form onSubmit={formik.handleSubmit}>
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
                      value={formik.values.summary ?? ""}
                    />
                    <Autocomplete
                      options={groupsByKeyword.data ?? []}
                      loading={groupsByKeyword.isLoading}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option: Group) => option.name}
                      onInputChange={(e, v) => {
                        setGroupSearchKey(v);
                      }}
                      onChange={(e, v) => {
                        formik.setFieldValue("group", v);
                      }}
                      value={formik.values.group}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Group"
                          placeholder="Type to search"
                        />
                      )}
                    />
                    <Autocomplete
                      options={semesters.data ?? []}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option: Semester) => option.name}
                      onChange={(e, v) => {
                        formik.setFieldValue("semester", v);
                      }}
                      value={formik.values.semester}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Type to search"
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
                        value={formik.values.firstName ?? ""}
                      />
                      <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName ?? ""}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email ?? ""}
                      />
                      <TextField
                        fullWidth
                        label="Github"
                        name="github"
                        placeholder="Github"
                        onChange={formik.handleChange}
                        value={formik.values.github ?? ""}
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
                          height="600px"
                          defaultLanguage="markdown"
                          value={formik.values.description}
                          options={{
                            minimap: { enabled: false },
                          }}
                          onChange={(value) => {
                            formik.setFieldValue("description", value);
                          }}
                        />
                        <Divider />
                        <Stack direction={"row"} justifyContent="end">
                          <Tooltip title="Using markdown">
                            <Button>
                              <Image
                                src={"/Markdown-mark.svg"}
                                width={30}
                                height={30}
                              />
                            </Button>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </Card>
                  </Stack>
                  <Stack
                    direction={"row"}
                    justifyContent="flex-end"
                    p={1}
                    mt={3}
                  >
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      loading={formik.isSubmitting}
                    >
                      Save Profile
                    </LoadingButton>
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
    const service = new NetworkService(supabaseServerClient(context));
    const student = await service.getStudentByAuthUserId(user.id);

    if (student.error) {
      console.log(student.error);
      return {
        notFound: true,
      };
    }

    return {
      props: {
        found: true,
        student: student.data,
      },
    };
  },
});
