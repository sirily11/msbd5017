import { Card, Chip, Divider, Typography } from "@mui/material";
import { Stack, Box } from "@mui/system";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Group } from "../../services/NetworkServiceInterface";
import Image from "next/image";

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
