import { Box } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  backgroundColor?: string;
  textColor?: string;
}

export function Chip({ label, backgroundColor, textColor }: Props) {
  const background = backgroundColor ?? "rgba(84,214,44,0.16)";
  const color = textColor ?? "rgb(34,154,22)";

  return (
    <Box
      data-testid={label}
      color={color}
      fontFamily={"Public Sans, sans-serif"}
      bgcolor={background}
      padding={"2px 12px"}
      fontSize="0.75rem"
      fontWeight={"700"}
      textTransform={"uppercase"}
      borderRadius={"6px"}
      minWidth="22px"
      height="22px"
      justifyContent={"center"}
      alignItems={"center"}
      display="flex"
    >
      {label}
    </Box>
  );
}
