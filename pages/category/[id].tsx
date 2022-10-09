import {
  Alert,
  Breadcrumbs,
  Card,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";
import CategoryTabs from "../../components/Category/CategoryTabs";
import GroupTable from "../../components/Category/GroupTable";
import { NetworkService } from "../../services/NetworkService";
import { Category, Group } from "../../services/NetworkServiceInterface";

interface Props {
  groups: Group[];
  category: Category;
  categories: Category[];
}

const Index: NextPage<Props> = (props: Props) => {
  return (
    <Container>
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

        <Card
          variant="outlined"
          sx={{ boxShadow: "none" }}
          style={{ marginBottom: 10 }}
        >
          <CardContent>
            <Typography>
              <Typography fontWeight={"bold"}>Description: </Typography>{" "}
              {props.category.description}
            </Typography>
          </CardContent>
        </Card>
        <GroupTable
          groups={props.groups}
          tab={
            <CategoryTabs
              categories={props.categories}
              currentCategory={props.category}
            />
          }
        />
      </Stack>
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const service = new NetworkService();
  const groups = await service.getGroupsByCategory(context.params?.id as any);
  const category = await service.getCategoryById(context.params?.id as any);
  const categories = await service.getCategories();

  if (groups.error || category.error || categories.error) {
    console.log("Groups error: ", groups.error);
    console.log("Category error: ", category.error);
    console.log("Categories error: ", categories.error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      groups: groups.data,
      category: category.data,
      categories: categories.data,
    },
  };
};
