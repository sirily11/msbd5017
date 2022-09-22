import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NetworkService } from "../services/NetworkService";

export default function useStatistics() {
  return useQuery(["statistics"], () => {
    const service = new NetworkService();
    return service.getStatistics();
  });
}
