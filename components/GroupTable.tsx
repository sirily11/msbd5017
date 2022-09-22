import { Card, Link, Stack, Tab, Tabs } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import React from "react";
import useGroups from "../hooks/useGroups";
import { Group } from "../services/NetworkServiceInterface";
import { gray } from "../utils/colors";
import { StyledDataGrid } from "./StyledDataGrid";

interface Props {
  groups: Group[];
}

const columns: GridColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => {
      return <Link>{params.row.name}</Link>;
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
  {
    field: "semester",
    headerName: "Semester",
    flex: 1,
    renderCell: (params) => {
      return params.row.semester.name;
    },
  },
];

export default function GroupTable(props: Props) {
  return (
    <Card>
      <Stack>
        <StyledDataGrid
          rows={props.groups}
          columns={columns}
          autoHeight={true}
          style={{ minHeight: 500 }}
          hideFooter={true}
          disableSelectionOnClick={true}
        />
      </Stack>
    </Card>
  );
}
