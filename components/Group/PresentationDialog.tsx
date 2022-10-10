import DownloadIcon from "@mui/icons-material/Download";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import dynamic from "next/dynamic";
import path, { join } from "path";
import { useMemo } from "react";

const PDFViewer = dynamic(() => import("./PDFReader"), {
  ssr: false,
});

interface Props {
  open: boolean;
  onClose: () => void;
  presentationURL: string;
}

export default function PresentationDialog(props: Props) {
  const remotePDFURL = useMemo(() => {
    const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const path = `${endpoint}/storage/v1/object/public/${props.presentationURL}`;

    return path;
  }, [props.presentationURL]);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Stack>
          <Stack direction={"row"} spacing={2} alignItems="center">
            {path.basename(props.presentationURL!)}
            <Tooltip title="Download presentation file">
              <IconButton
                onClick={() => {
                  open(remotePDFURL);
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography variant="caption">{remotePDFURL}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <PDFViewer pdfUrl={remotePDFURL!} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
