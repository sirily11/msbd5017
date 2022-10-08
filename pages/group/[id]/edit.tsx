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
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useFormik } from "formik";
import ChipInput from "@sarakusha/material-ui-chip-input";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { NetworkService } from "../../../services/NetworkService";
import { Group, Semester } from "../../../services/NetworkServiceInterface";
import { useSemesters } from "../../../hooks/useSemesters";
import { useCategories } from "../../../hooks/useCategory";
import useGroups from "../../../hooks/useGroups";
import GroupForm from "../../../components/Group/GroupForm";

interface Props {
  group: Group;
}

const Index: NextPage<Props> = (props: Props) => {
  return <GroupForm group={props.group} />;
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = withPageAuth({
  redirectTo: "/signIn",
  async getServerSideProps(context) {
    const service = new NetworkService();
    const group = await service.getGroupById(
      parseInt(context.params!.id! as string)
    );

    if (group.error) {
      console.log(group.error);
      return {
        notFound: true,
      };
    }

    return {
      props: {
        group: group.data,
      },
    };
  },
});
