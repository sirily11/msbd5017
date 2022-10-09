import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Avatar,
  AvatarGroup,
  Button,
  CardMedia,
  Divider,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { Group } from "../../services/NetworkServiceInterface";
import { Chip } from "../Chip";
import PresentationDialog from "./PresentationDialog";

const PDFViewer = dynamic(() => import("./PDFReader"), {
  ssr: false,
});

interface Props {
  group: Group;
}

export default function GroupSideBar(props: Props) {
  const router = useRouter();
  const [showPDF, setShowPDF] = useState(false);

  return (
    <Stack spacing={2} p={1}>
      {props.group.avatar && (
        <CardMedia
          image={props.group.avatar}
          component="div"
          style={{ height: 200, width: "100%", backgroundSize: "cover" }}
        />
      )}
      <Typography variant="h6" fontWeight={"bold"}>
        GitHub Link
      </Typography>
      <Link href={props.group.github}>{props.group.github}</Link>

      <Box mt={1} display="flex">
        {props.group.keywords?.map((keyword) => (
          <Box mr={1} key={`keyword-${keyword}`}>
            <Chip key={keyword} label={keyword} />
          </Box>
        ))}
      </Box>
      <Divider />
      <Typography variant="h6" fontWeight={"bold"}>
        Presentation File
      </Typography>
      {props.group.presentation ? (
        <Button variant="outlined" onClick={() => setShowPDF(true)}>
          <PictureAsPdfIcon /> View Presentation
        </Button>
      ) : (
        <Typography>No presentation file</Typography>
      )}

      <Divider />
      <Typography variant="h6" fontWeight={"bold"}>
        Students
      </Typography>
      <AvatarGroup max={10} sx={{ justifyContent: "start" }}>
        {props.group.students?.map((student) => (
          <Tooltip
            key={student.id}
            title={`${student.firstName} ${student.lastName}`}
          >
            <Avatar
              sx={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/student/${student.id}`);
              }}
            >
              {student.firstName[0]}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
      <Button
        variant="outlined"
        onClick={() => router.push(`/group/${props.group.id}/edit`)}
      >
        Edit group info
      </Button>

      {props.group.presentation && (
        <PresentationDialog
          open={showPDF}
          onClose={() => setShowPDF(false)}
          presentationURL={props.group.presentation}
        />
      )}
    </Stack>
  );
}
