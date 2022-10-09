import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useCallback } from "react";
import { NetworkService } from "../services/NetworkService";
import { Student } from "../services/NetworkServiceInterface";

export default function useStudent(studentId?: string) {
  const updateStudent = useCallback(
    async (student: Student) => {
      if (studentId) {
        const service = new NetworkService(supabaseClient);
        const result = await service.createOrUpdateStudentByAuthUserId(
          studentId,
          student
        );
        return result;
      }
    },
    [studentId, supabaseClient]
  );

  return {
    updateStudent,
  };
}
