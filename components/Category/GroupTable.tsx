import { Card, Link, Stack } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { Group } from "../../services/NetworkServiceInterface";
import { useProgress } from "../Common/PageProgress";
import { StyledDataGrid } from "../Common/StyledDataGrid";

interface Props {
  tab: JSX.Element;
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
      return <Link href={`/group/${params.id}`}>{params.row.name}</Link>;
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
  const isLoading = useProgress();

  return (
    <Card>
      <Stack>
        {props.tab}
        <StyledDataGrid
          loading={isLoading}
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
