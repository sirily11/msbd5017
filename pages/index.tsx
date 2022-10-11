import { Alert, Link, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useUser } from "@supabase/auth-helpers-react";
import type { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import ProjectTable from "../components/Home/ProjectTable";
import SemesterTabs from "../components/Home/SemesterTabs";
import StatisticsCard from "../components/Home/StatisticsCard";
import useStudent from "../hooks/useStudent";
import { NetworkService } from "../services/NetworkService";
import {
  Group,
  Semester,
  Statistic,
} from "../services/NetworkServiceInterface";

interface Props {
  semesters: Semester[];
  statistics: Statistic;
  currentSemester: number;
  groups: Group[];
}

const Home: NextPage<Props> = (props: Props) => {
  const { user } = useUser();
  const { student } = useStudent(user?.id);

  const showSelectGroup = useMemo(() => {
    if (student.data?.group === null) {
      return true;
    }

    return false;
  }, [student]);

  return (
    <Container>
      <Stack p={2} spacing={2} mt={5}>
        <Typography fontWeight={"bold"} variant="h6">
          MSBD5017 Projects
        </Typography>
        {showSelectGroup && (
          <Alert severity="info">
            Please select a group in your <Link href="/profile">profile</Link>
          </Alert>
        )}
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
          groups={props.groups}
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
  let currentSemester = semesters.data[0].id;

  if (context.query?.semester) {
    currentSemester = parseInt(context.query?.semester as string);
  }

  const [statistics, groups] = await Promise.all([
    service.getStatistics(),
    service.getGroupsBySemester(currentSemester),
  ]);

  if (semesters.data.length === 0) {
    return {
      props: {
        semesters: [],
        statistics: statistics.data,
        currentSemester: 0,
        groups: [],
      },
    };
  }

  if (semesters.error || statistics.error) {
    return {
      notFound: true,
    };
  }

  const props: Props = {
    semesters: semesters.data,
    statistics: statistics.data,
    currentSemester: currentSemester,
    groups: groups.data,
  };

  return {
    props: props,
  };
};
