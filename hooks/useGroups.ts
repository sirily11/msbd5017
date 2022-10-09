import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { NetworkService } from "../services/NetworkService";
import { Group } from "../services/NetworkServiceInterface";

export default function useGroups(
  semester?: number,
  keyword?: string,
  groupId?: number
) {
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

    const data = await service.listGroups(10);
    if (data.data) {
      return data.data;
    }

    return [];
  });

  const createOrUpdateGroup = useCallback(
    async (isCreate: boolean, group: Group) => {
      const service = new NetworkService();
      const result = await service.createOrUpdateGroup(isCreate, group);
      return result;
    },
    [groupId]
  );

  return {
    groupsBySemester,
    groupsByKeyword,
    createOrUpdateGroup,
  };
}
