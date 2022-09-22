import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  Category,
  Group,
  NetworkResult,
  NetworkServiceInterface,
  Semester,
  Statistic,
  Student,
} from "./NetworkServiceInterface";

export class NetworkService implements NetworkServiceInterface {
  supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getSemesters(): Promise<NetworkResult<Semester[]>> {
    const result = await this.supabase.from("semester").select("*");
    return {
      data: result.data as Semester[],
      error: result.error,
    };
  }
  async getGroupsBySemester(semester: number): Promise<NetworkResult<Group[]>> {
    const result = await this.supabase
      .from("group")
      .select("*, category(*), students:student(id)")
      .eq("sid", semester);

    return {
      data: result.data as Group[],
      error: result.error,
    };
  }

  async getGroupsByCategory(category: number): Promise<NetworkResult<Group[]>> {
    const result = await this.supabase
      .from("group")
      .select("*, students:student(id),semester(*)")
      .eq("cid", category);

    return {
      data: result.data as Group[],
      error: result.error,
    };
  }
  async getStudentsByGroup(group: number): Promise<NetworkResult<Student[]>> {
    const result = await this.supabase
      .from("student")
      .select("*")
      .eq("gid", group);

    return {
      data: result.data as Student[],
      error: result.error,
    };
  }

  async getStudentsBySemester(
    semester: number
  ): Promise<NetworkResult<Student[]>> {
    const result = await this.supabase
      .from("student")
      .select("*")
      .eq("sid", semester);

    return {
      data: result.data as Student[],
      error: result.error,
    };
  }

  async getStatistics(): Promise<NetworkResult<Statistic>> {
    const [count1, count2, count3, count4] = await Promise.all([
      this.supabase.from("student").select("id", { count: "exact" }),
      this.supabase.from("group").select("id", { count: "exact" }),
      this.supabase.from("semester").select("id", { count: "exact" }),
      this.supabase.from("category").select("id", { count: "exact" }),
    ]);

    const numOfStudents = count1.count || 0;

    const numOfGroups = count2.count || 0;

    const numOfSemesters = count3.count || 0;

    const numOfCategories = count4.count || 0;
    return {
      data: {
        numOfStudents,
        numOfGroups,
        numOfSemesters,
        numOfCategories,
      },
      error: undefined,
    };
  }

  async getCategoryById(id: number): Promise<NetworkResult<Category>> {
    const result = await this.supabase
      .from("category")
      .select("*")
      .eq("id", id);

    return {
      data: result.data && (result.data![0] as any),
      error: result.error,
    };
  }

  async getGroupById(id: number): Promise<NetworkResult<Group>> {
    const result = await this.supabase
      .from("group")
      .select("*, students:student(*)")
      .eq("id", id);

    return {
      data: result.data && (result.data![0] as any),
      error: result.error,
    };
  }

  async getStudentById(id: number): Promise<NetworkResult<Student>> {
    const result = await this.supabase
      .from("student")
      .select("*, semester(*), group(*)")
      .eq("id", id);

    return {
      data: result.data && (result.data![0] as any),
      error: result.error,
    };
  }
}
