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

export class SupabaseService {
  static supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  static supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  static supabase = createClient(
    SupabaseService.supabaseUrl,
    SupabaseService.supabaseKey
  );
}
export class NetworkService implements NetworkServiceInterface {
  supabase: SupabaseClient;

  constructor(supabase?: SupabaseClient) {
    this.supabase = supabase ?? SupabaseService.supabase;
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
      .eq("id", id)
      .single();

    return {
      data: result.data,
      error: result.error,
    };
  }

  async getGroupById(id: number): Promise<NetworkResult<Group>> {
    const result = await this.supabase
      .from("group")
      .select("*, students:student(*), category(*), semester(*)")
      .eq("id", id)
      .single();

    return {
      data: result.data,
      error: result.error,
    };
  }

  async getStudentById(id: number): Promise<NetworkResult<Student>> {
    const result = await this.supabase
      .from("student")
      .select("*, semester(*), group(*)")
      .eq("id", id)
      .single();

    return {
      data: result.data,
      error: result.error,
    };
  }

  async getStudentByAuthUserId(
    id: string
  ): Promise<NetworkResult<Student | undefined>> {
    const result = await this.supabase
      .from("student")
      .select("*, semester(*), group(*)")
      .eq("uid", id)
      .single();

    if (result.data === null) {
      return {
        data: undefined,
        error: undefined,
      };
    }

    return {
      data: result.data,
      error: result.error,
    };
  }

  async searchGroups(keyword: string): Promise<NetworkResult<Group[]>> {
    const result = await this.supabase
      .from("group")
      .select("*, students:student(id)")
      .ilike("name", `%${keyword}%`);

    return {
      data: result.data as Group[],
      error: result.error,
    };
  }

  async createOrUpdateStudentByAuthUserId(
    uid: string,
    student: Student
  ): Promise<NetworkResult<Student>> {
    const result = await this.supabase
      .from("student")
      .upsert({
        ...student,
        gid: student.group?.id,
        sid: student.semester?.id,
        group: undefined,
        semester: undefined,
        uid,
      })
      .single();

    return {
      data: result.data as Student,
      error: result.error,
    };
  }

  async createOrUpdateGroup(
    isCreate: boolean,
    group: Group
  ): Promise<NetworkResult<Group>> {
    let newGroup = {
      ...group,
      cid: group.category?.id,
      sid: group.semester?.id,
      category: undefined,
      students: undefined,
      semester: undefined,
    };

    if (isCreate) {
      const result = await this.supabase
        .from("group")
        .insert(newGroup)
        .single();

      return {
        data: result.data as Group,
        error: result.error,
      };
    }

    console.log("Updating group", newGroup);
    const result = await this.supabase.from("group").update(newGroup).single();

    return {
      data: result.data as Group,
      error: result.error,
    };
  }

  async getCategories(): Promise<NetworkResult<Category[]>> {
    const result = await this.supabase.from("category").select("*");

    return {
      data: result.data as Category[],
      error: result.error,
    };
  }

  async deleteGroup(id: number): Promise<NetworkResult<void>> {
    const result = await this.supabase.from("group").delete().eq("id", id);

    return {
      data: undefined,
      error: result.error,
    };
  }
}
