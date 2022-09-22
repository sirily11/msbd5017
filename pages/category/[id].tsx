import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";
import GroupTable from "../../components/GroupTable";
import { NetworkService } from "../../services/NetworkService";
import { Category, Group } from "../../services/NetworkServiceInterface";

interface Props {
  groups: Group[];
  category: Category;
}

const Index: NextPage<Props> = (props: Props) => {
  return (
    <Stack p={2} spacing={2} mt={5}>
      <Typography fontWeight={"bold"} variant="h6">
        {props.category.name}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">{props.category.name}</Typography>
      </Breadcrumbs>

      <Typography>{props.category.description}</Typography>
      <GroupTable groups={props.groups} />
    </Stack>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const service = new NetworkService();
  const groups = await service.getGroupsByCategory(context.params?.id as any);
  const category = await service.getCategoryById(context.params?.id as any);

  if (groups.error || category.error) {
    console.log("Groups error: ", groups.error);
    console.log("Category error: ", category.error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      groups: groups.data,
      category: category.data,
    },
  };
};
