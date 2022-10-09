import { Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";
import ProjectTable from "../components/Home/ProjectTable";
import SemesterTabs from "../components/Home/SemesterTabs";
import StatisticsCard from "../components/Home/StatisticsCard";
import { NetworkService } from "../services/NetworkService";
import { Semester, Statistic } from "../services/NetworkServiceInterface";

interface Props {
  semesters: Semester[];
  statistics: Statistic;
  currentSemester: number;
}

const Home: NextPage<Props> = (props: Props) => {
  return (
    <Container>
      <Stack p={2} spacing={2} mt={5}>
        <Typography fontWeight={"bold"} variant="h6">
          MSBD5017 Projects
        </Typography>
        <StatisticsCard statistics={props.statistics} />
        <ProjectTable
          tab={
            <SemesterTabs
              semesters={props.semesters}
              semester={props.currentSemester}
            />
          }
          semesters={props.semesters}
          currentSemester={props.currentSemester}
        />
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
  if (semesters.data.length === 0) {
    return {
      props: {
        semesters: [],
        statistics: statistics.data,
        currentSemester: 0,
      },
    };
  }

  let currentSemester = semesters.data[0].id;

  if (context.query?.semester) {
    currentSemester = parseInt(context.query?.semester as string);
  }

  if (semesters.error || statistics.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      semesters: semesters.data,
      statistics: statistics.data,
      currentSemester: currentSemester,
    },
  };
};
