import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";
import { NetworkService } from "../../../services/NetworkService";
import { Group } from "../../../services/NetworkServiceInterface";

import GroupDescriptionCard from "../../../components/Group/GroupDescriptionCard";
import GroupSideBar from "../../../components/Group/GroupSideBar";

interface Props {
  group: Group;
}

const Index: NextPage<Props> = (props: Props) => {
  return (
    <Container>
      <Stack p={2} spacing={2} mt={5}>
        <Typography fontWeight={"bold"} variant="h6">
          {props.group.name}
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">{props.group.name}</Typography>
        </Breadcrumbs>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <GroupDescriptionCard group={props.group} />
          </Grid>
          <Grid item md={4} xs={12}>
            <Box position="sticky" top={50}>
              <GroupSideBar group={props.group} />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const service = new NetworkService();
  const group = await service.getGroupById(context.params?.id as any);

  if (group.error) {
    console.log("Group error: ", group.error);

    return {
      notFound: true,
    };
  }

  return {
    props: {
      group: group.data,
    },
  };
};
