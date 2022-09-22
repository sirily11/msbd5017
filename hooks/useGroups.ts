import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NetworkService } from "../services/NetworkService";

export default function useGroups(semester?: number) {
  return useQuery(["groups", semester], () => {
    const service = new NetworkService();
    if (semester) {
      return service.getGroupsBySemester(semester);
    }
    return undefined;
  });
}
