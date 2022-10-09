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
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import ChipInput from "@sarakusha/material-ui-chip-input";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { extname, join } from "path";
import React, { useCallback } from "react";
import { useCategories } from "../../hooks/useCategory";
import useGroups from "../../hooks/useGroups";
import { useSemesters } from "../../hooks/useSemesters";
import { Group, Semester } from "../../services/NetworkServiceInterface";

interface Props {
  group?: Group;
}

const defaultGroup: Group = {
  //@ts-ignore
  id: undefined,
  name: "",
  description: "",
  summary: "",
  //@ts-ignore
  semester: undefined,
  //@ts-ignore
  category: undefined,
  students: [],
};

export default function GroupForm(props: Props) {
  const { semesters } = useSemesters();
  const { categories } = useCategories();
  const { createOrUpdateGroup } = useGroups(1, "", props?.group?.id);
  const isCreate = props.group === undefined;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [uploading, setUploading] = React.useState(false);
  const { user } = useUser();

  const formik = useFormik({
    initialValues: props.group ?? defaultGroup,
    onSubmit: async (values: any) => {
      const result = await createOrUpdateGroup(isCreate, values);
      if (result?.error) {
        console.error(result.error);
        enqueueSnackbar(
          `Error ${isCreate ? "Inserting" : "Updating"} group: ${
            result.error.message
          }`,
          {
            variant: "error",
            anchorOrigin: { horizontal: "right", vertical: "top" },
          }
        );
        return;
      }

      enqueueSnackbar(
        `Successfully ${isCreate ? "Inserted" : "Updated"} group`,
        {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        }
      );

      if (isCreate) {
        await router.push(`/group/${result?.data?.id}`);
      }
    },
  });

  const uploadFile = useCallback(
    async (file: File) => {
      if (!user) {
        return;
      }

      console.log(supabaseClient.auth.user());

      const ext = extname(file.name);
      const uploadPath = join(
        `${user.id}`,
        "presentations",
        `${user.id}${ext}`
      );
      console.log(uploadPath);

      setUploading(true);
      const { data, error } = await supabaseClient.storage
        .from("msbd5017")
        .upload(uploadPath, file, { upsert: true });
      setUploading(false);
      if (error) {
        enqueueSnackbar(`Error uploading file: ${error.message}`, {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        return;
      }
      formik.setFieldValue("presentation", data!.Key);
    },
    [user]
  );

  return (
    <Container>
      <Stack pt={2} spacing={2}>
        <Typography variant="h5">Group</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          {props.group && (
            <Link
              underline="hover"
              color="inherit"
              href={`/group/${props.group?.id}`}
            >
              Group {props.group.id}
            </Link>
          )}

          <Typography color="text.primary">
            {props.group ? "Edit" : "Create"}
          </Typography>
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
                          label="Semester"
                          name="semester"
                        />
                      )}
                    />

                    <Autocomplete
                      options={categories.data ?? []}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option: Semester) => option.name}
                      onChange={(e, v) => {
                        formik.setFieldValue("category", v);
                      }}
                      value={formik.values.category}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Category"
                          name="category"
                        />
                      )}
                    />

                    <LoadingButton
                      variant="contained"
                      component="label"
                      loading={uploading}
                    >
                      Upload Presentation
                      <input
                        hidden
                        accept="application/pdf"
                        type="file"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await uploadFile(file);
                          }
                        }}
                      />
                    </LoadingButton>
                    {formik.values.presentation && (
                      <Box pl={1}>
                        <Typography variant="caption">
                          Uploaded: {formik.values.presentation}
                        </Typography>
                      </Box>
                    )}
                    <Box pl={1}>
                      <Typography variant="caption">
                        Only PDF format is supported
                      </Typography>
                    </Box>
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
                        label="Name"
                        name="name"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name ?? ""}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                        fullWidth
                        label="Github"
                        name="github"
                        placeholder="github"
                        onChange={formik.handleChange}
                        value={formik.values.github ?? ""}
                      />
                    </Stack>
                    <Stack>
                      <Typography variant="subtitle2" fontWeight={"bold"}>
                        Keywords
                      </Typography>
                      <ChipInput
                        defaultValue={formik.values.keywords}
                        variant="outlined"
                        helperText="Press enter to add a keyword."
                        onChange={(chips) => {
                          formik.setFieldValue("keywords", chips);
                        }}
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
                      Save Group Info
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
