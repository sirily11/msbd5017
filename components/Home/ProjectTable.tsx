import { Button, Card, Link, Stack } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import useGroups from "../../hooks/useGroups";
import { Group, Semester } from "../../services/NetworkServiceInterface";
import { useProgress } from "../Common/PageProgress";
import { StyledDataGrid } from "../Common/StyledDataGrid";

interface Props {
  tab: JSX.Element;
  semesters: Semester[];
  currentSemester: number;
  groups: Group[];
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
  const loading = useProgress();
  const router = useRouter();
  const { user } = useUser();

  return (
    <Card>
      <Stack>
        {props.tab}
        <StyledDataGrid
          rows={props.groups}
          columns={columns}
          autoHeight={true}
          style={{ minHeight: 500 }}
          loading={loading}
          hideFooter={true}
          disableSelectionOnClick={true}
        />
        <Stack direction={"row"} p={1} justifyContent="flex-end">
          {user && (
            <Button
              onClick={() => {
                router.push("/group/create");
              }}
            >
              Add Group
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
