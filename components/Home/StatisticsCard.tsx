import { Card, CircularProgress, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Statistic } from "../../services/NetworkServiceInterface";
import HomeIcon from "@mui/icons-material/Home";

interface Props {
  statistics: Statistic;
}

export default function StatisticsCard(props: Props) {
  return (
    <Card>
      <Stack
        direction={"row"}
        p={2}
        spacing={4}
        overflow="scroll"
        justifyContent={"center"}
      >
        <StatisticsItem
          title="Total Categories"
          value={props.statistics.numOfCategories}
          color="rgb(24, 144, 255)"
          backgroundColor="rgb(24, 144, 255)"
          icon={<HomeIcon />}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderStyle: "dashed" }}
        />
        <StatisticsItem
          title="Total Groups"
          value={props.statistics.numOfGroups}
          color="rgb(84, 214, 44)"
          backgroundColor="rgb(84, 214, 44)"
          icon={<HomeIcon />}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderStyle: "dashed" }}
        />
        <StatisticsItem
          title="Total Semesters"
          value={props.statistics.numOfSemesters}
          color="rgb(255, 193, 7)"
          backgroundColor="rgb(255, 193, 7)"
          icon={<HomeIcon />}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderStyle: "dashed" }}
        />
        <StatisticsItem
          title="Total Students"
          value={props.statistics.numOfStudents}
          color="rgb(255, 72, 66)"
          backgroundColor="rgb(255, 72, 66)"
          icon={<HomeIcon />}
        />
      </Stack>
    </Card>
  );
}

function StatisticsItem(props: {
  title: string;
  value: number;
  icon: JSX.Element;
  color: string;
  backgroundColor: string;
}) {
  const icon = React.cloneElement(props.icon, {
    sx: { color: props.color, fontSize: 30, position: "absolute" },
  });

  return (
    <Stack direction={"row"} p={0} spacing={2}>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        position="relative"
      >
        {icon}
        <CircularProgress
          variant="determinate"
          value={100}
          size={60}
          sx={{ color: props.backgroundColor, opacity: 0.4 }}
        />
      </Box>
      <Stack>
        <Typography fontWeight={"bold"}>{props.title}</Typography>
        <Typography>{props.value}</Typography>
      </Stack>
    </Stack>
  );
}
