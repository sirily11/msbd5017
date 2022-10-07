import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NetworkService } from "../services/NetworkService";

export default function useGroups(semester?: number, keyword?: string) {
  const groupsBySemester = useQuery(["groups", semester], () => {
    const service = new NetworkService();
    if (semester) {
      return service.getGroupsBySemester(semester);
    }
    return undefined;
  });

  const groupsByKeyword = useQuery(["groups", "keyword", keyword], async () => {
    const service = new NetworkService();
    if (keyword) {
      const data = await service.searchGroups(keyword);
      if (data.data) {
        return data.data;
      }
      return [];
    }

    return [];
  });

  return {
    groupsBySemester,
    groupsByKeyword,
  };
}
