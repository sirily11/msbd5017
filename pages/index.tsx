import { Alert, Link, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { getUser } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps, NextPage } from "next";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ProjectTable from "../components/Home/ProjectTable";
import SemesterTabs from "../components/Home/SemesterTabs";
import StatisticsCard from "../components/Home/StatisticsCard";
import { NetworkService } from "../services/NetworkService";
import {
  Semester,
  Statistic,
  Group,
} from "../services/NetworkServiceInterface";

interface Props {
  semesters: Semester[];
  statistics: Statistic;
  currentSemester: number;
  groups: Group[];
  showSelectGroup: boolean;
}

const Home: NextPage<Props> = (props: Props) => {
  return (
    <Container>
      <Stack p={2} spacing={2} mt={5}>
        <Typography fontWeight={"bold"} variant="h6">
          MSBD5017 Projects
        </Typography>
        {props.showSelectGroup && (
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
  const { user } = await getUser(context);
  const service = new NetworkService();
  const semesters = await service.getSemesters();
  let currentSemester = semesters.data[0].id;
  let showSelectGroup = false;

  if (context.query?.semester) {
    currentSemester = parseInt(context.query?.semester as string);
  }

  const [statistics, groups, student] = await Promise.all([
    service.getStatistics(),
    service.getGroupsBySemester(currentSemester),
    service.getStudentByAuthUserId(user?.id as string),
  ]);

  if (
    (student.data?.group === null || student.data?.group === undefined) &&
    user
  ) {
    showSelectGroup = true;
  }

  if (semesters.data.length === 0) {
    return {
      props: {
        semesters: [],
        statistics: statistics.data,
        currentSemester: 0,
        groups: [],
        showSelectGroup: showSelectGroup,
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
    showSelectGroup: showSelectGroup,
  };

  return {
    props: props,
  };
};
