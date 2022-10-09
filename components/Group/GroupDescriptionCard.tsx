import { Card, Divider } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Group } from "../../services/NetworkServiceInterface";

interface Props {
  group: Group;
}

export default function GroupDescriptionCard(props: Props) {
  return (
    <Card>
      <Stack p={2}>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Box>
            <Image src={"/group.webp"} height={100} width={100} />
          </Box>
        </Stack>
        <Divider />
        {/* Description */}
        <Box p={2}>
          <ReactMarkdown>{props.group.description ?? ""}</ReactMarkdown>
        </Box>
      </Stack>
    </Card>
  );
}
