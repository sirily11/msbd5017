import { Card, Link, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Semester } from "../services/NetworkServiceInterface";
import useGroups from "../hooks/useGroups";
import { StyledDataGrid } from "./StyledDataGrid";
import { gray } from "../utils/colors";

interface Props {
  semesters: Semester[];
}

const columns: GridColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    renderCell: (params) => {
      return (
        <Link href={`/category/${params.row.category.id}`}>
          {params.row.category.name}
        </Link>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => {
      return <Link href={`/group/${params.row.id}`}>{params.row.name}</Link>;
    },
  },
  {
    field: "students",
    headerName: "#Students",
    flex: 1,
    renderCell: (params) => {
      return params.row.students.length;
    },
  },
];

export default function ProjectTable(props: Props) {
  const [selectedSemester, setSelectedSemester] = React.useState<number>(
    props.semesters.length > 0 ? props.semesters[0].id : 0
  );
  const { groupsBySemester } = useGroups(selectedSemester);

  return (
    <Card>
      <Stack>
        <Tabs
          value={selectedSemester}
          sx={{ background: gray }}
          onChange={(e, v) => {
            setSelectedSemester(v);
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
        <StyledDataGrid
          rows={groupsBySemester?.data?.data ? groupsBySemester.data.data : []}
          columns={columns}
          autoHeight={true}
          style={{ minHeight: 500 }}
          loading={groupsBySemester.isLoading}
          hideFooter={true}
          disableSelectionOnClick={true}
        />
      </Stack>
    </Card>
  );
}
