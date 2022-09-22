import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NetworkService } from "../services/NetworkService";

export function useSemesters() {
  return useQuery(["semesters"], () => {
    const service = new NetworkService();
    return service.getSemesters();
  });
}
