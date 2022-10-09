import { Card, Link, Stack } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import useGroups from "../../hooks/useGroups";
import { Semester } from "../../services/NetworkServiceInterface";
import { useProgress } from "../Common/PageProgress";
import { StyledDataGrid } from "../Common/StyledDataGrid";

interface Props {
  tab: JSX.Element;
  semesters: Semester[];
  currentSemester: number;
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
  const { groupsBySemester } = useGroups(props.currentSemester);
  const loading = useProgress();

  return (
    <Card>
      <Stack>
        {props.tab}
        <StyledDataGrid
          rows={groupsBySemester?.data?.data ? groupsBySemester.data.data : []}
          columns={columns}
          autoHeight={true}
          style={{ minHeight: 500 }}
          loading={loading}
          hideFooter={true}
          disableSelectionOnClick={true}
        />
      </Stack>
    </Card>
  );
}
