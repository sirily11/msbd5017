import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NetworkService } from "../services/NetworkService";

export function useSemesters() {
  const semesters = useQuery(["semesters"], async () => {
    const service = new NetworkService();
    const data = await service.getSemesters();
    if (data.data) {
      return data.data;
    }
    return [];
  });

  return { semesters };
}
