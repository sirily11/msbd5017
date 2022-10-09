import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import workerSrc from "../../pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = `/${workerSrc}`;

interface Props {
  pdfUrl: string;
}

export default function PDFReader(props: Props) {
  const [numPages, setNumPages] = React.useState<number>();
  const [width, setWidth] = React.useState<number>();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ref.current?.clientWidth]);

  useEffect(() => {
    const listener = window.addEventListener("resize", () => {
      if (ref.current) {
        setWidth(ref.current!.offsetWidth);
      }
    });

    return () => {
      window.removeEventListener("resize", listener!);
    };
  }, []);

  return (
    <div ref={ref}>
      <Document
        file={props.pdfUrl}
        loading={<CircularProgress />}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={width}
          />
        ))}
      </Document>
    </div>
  );
}
