import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { NetworkService } from "../services/NetworkService";
import { Student } from "../services/NetworkServiceInterface";

export default function useStudent(studentId?: string) {
  const student = useQuery(["student", studentId], async () => {
    if (!studentId) {
      return undefined;
    }
    const serivce = new NetworkService(supabaseClient);
    const student = await serivce.getStudentByAuthUserId(studentId);
    return student.data;
  });

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
    student,
  };
}
