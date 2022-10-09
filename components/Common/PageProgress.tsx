import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  CircularProgress,
  CircularProgressProps,
  Fade,
  LinearProgress,
  LinearProgressProps,
} from "@mui/material";

export function useProgress() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };
    const handleStop = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return isLoading;
}

export function NextLinearProgressBar(props: LinearProgressProps) {
  const isLoading = useProgress();

  return (
    <Fade in={isLoading} mountOnEnter unmountOnExit>
      <LinearProgress {...props} />
    </Fade>
  );
}

export function NextCirculatProgressBar(props: CircularProgressProps) {
  const isLoading = useProgress();

  return (
    <Fade in={isLoading} mountOnEnter unmountOnExit timeout={{ exit: 300 }}>
      <CircularProgress {...props} />
    </Fade>
  );
}
