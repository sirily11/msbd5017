import { Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";
import ProjectTable from "../components/ProjectTable";
import StatisticsCard from "../components/StatisticsCard";
import { NetworkService } from "../services/NetworkService";
import { Semester, Statistic } from "../services/NetworkServiceInterface";

interface Props {
  semesters: Semester[];
  statistics: Statistic;
}

const Home: NextPage<Props> = (props: Props) => {
  return (
    <Container>
      <Stack p={2} spacing={2} mt={5}>
        <Typography fontWeight={"bold"} variant="h6">
          MSBD5017 Projects
        </Typography>
        <StatisticsCard statistics={props.statistics} />
        <ProjectTable semesters={props.semesters} />
      </Stack>
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const service = new NetworkService();
  const semesters = await service.getSemesters();
  const statistics = await service.getStatistics();

  if (semesters.error || statistics.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      semesters: semesters.data,
      statistics: statistics.data,
    },
  };
};
