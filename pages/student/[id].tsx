import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UserInfoCard } from "../../components/UserInfoCard";
import { NetworkService } from "../../services/NetworkService";
import { Student } from "../../services/NetworkServiceInterface";

interface Props {
  student: Student;
}

const Index: NextPage<Props> = (props: Props) => {
  return (
    <Container>
      <Stack p={2} spacing={2}>
        <UserInfoCard
          name={`${props.student.firstName} ${props.student.lastName}`}
          avatar={props.student.avatar ?? ""}
          description={props.student.summary ?? ""}
        />
      </Stack>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Info</Typography>
                <Typography variant="body2">
                  <Link href={`/?semester=${props.student.semester?.id}`}>
                    {props.student.semester?.name}
                  </Link>{" "}
                  student in group
                  <Link href={`/group/${props.student.group?.id}`}>
                    {" "}
                    {props.student.group?.name}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Contact</Typography>
                  <Stack direction={"row"} justifyContent="space-between">
                    <Typography variant="body2">Email</Typography>
                    <Typography variant="body2">
                      <Link href={`mailto:${props.student.email}`}>
                        {props.student.email}
                      </Link>
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent="space-between">
                    <Typography variant="body2">GitHub</Typography>
                    <Typography variant="body2">
                      <Link href={`${props.student.github}`}>
                        {props.student.github}
                      </Link>
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item md={8}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {props.student.description ?? ""}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const service = new NetworkService();
  const student = await service.getStudentById(context.params?.id as any);

  if (student.error) {
    console.log("Group error: ", student.error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      student: student.data,
    },
  };
};
