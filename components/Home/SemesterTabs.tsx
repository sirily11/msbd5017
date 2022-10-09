import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Semester } from "../../services/NetworkServiceInterface";
import { gray } from "../../utils/colors";

interface Props {
  semester: number;
  semesters: Semester[];
}

export default function SemesterTabs(props: Props) {
  const [selectedSemester, setSelectedSemester] = React.useState<number>(
    props.semester
  );
  const router = useRouter();

  return (
    <Tabs
      value={selectedSemester}
      sx={{ background: gray }}
      onChange={async (e, v) => {
        setSelectedSemester(v);
        await router.push(`/?semester=${v}`);
      }}
    >
      {props.semesters.map((semester, index) => (
        <Tab
          label={semester.name}
          key={`semester-${semester.id}`}
          value={semester.id}
        />
      ))}
    </Tabs>
  );
}
