import { useQuery } from "@tanstack/react-query";
import { NetworkService } from "../services/NetworkService";
import React, { useCallback } from "react";
import { Student } from "../services/NetworkServiceInterface";

export default function useStudent(studentId?: string) {
  const updateStudent = useCallback(
    async (student: Student) => {
      if (studentId) {
        const service = new NetworkService();
        const result = await service.createStudentByAuthUserId(
          studentId,
          student
        );
        return result;
      }
    },
    [studentId]
  );

  return {
    updateStudent,
  };
}
