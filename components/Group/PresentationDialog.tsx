import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import dynamic from "next/dynamic";
import path, { join } from "path";
import { useMemo } from "react";
import DownloadIcon from "@mui/icons-material/Download";

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
    const path = join(
      endpoint,
      "storage",
      "v1",
      "object",
      "public",
      props.presentationURL
    );
    return path;
  }, [props.presentationURL]);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="lg">
      <DialogTitle>
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
