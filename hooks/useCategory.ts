import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NetworkService } from "../services/NetworkService";

export function useCategories() {
  const categories = useQuery(["categories"], async () => {
    const service = new NetworkService();
    const data = await service.getCategories();
    if (data.data) {
      return data.data;
    }
    return [];
  });

  return { categories };
}
