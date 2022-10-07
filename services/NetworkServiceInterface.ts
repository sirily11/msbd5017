export interface Semester {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Group {
  id: number;
  name: string;
  semester: Semester;
  category: Category;
  avatar?: string;
  description?: string;
  github?: string;
  presentation?: string;
  summary?: string;
  keywords?: string[];
  students: Student[];
}

export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  avatar?: string;
  github?: string;
  description?: string;
  summary?: string;
  group?: Group;
  semester?: Semester;
}

export interface Statistic {
  numOfStudents: number;
  numOfGroups: number;
  numOfSemesters: number;
  numOfCategories: number;
}

export interface NetworkResult<T> {
  data: T;
  error: any;
}

export interface NetworkServiceInterface {
  /**
   * Get list of semesters
   */
  getSemesters(): Promise<NetworkResult<Semester[]>>;

  /**
   * Get groups by semester
   */
  getGroupsBySemester(semester: number): Promise<NetworkResult<Group[]>>;

  /**
   * Get groups by category
   */
  getGroupsByCategory(category: number): Promise<NetworkResult<Group[]>>;

  /**
   * Get students by group
   */
  getStudentsByGroup(group: number): Promise<NetworkResult<Student[]>>;

  /**
   * Get students by semester
   */
  getStudentsBySemester(semester: number): Promise<NetworkResult<Student[]>>;

  /**
   * Get statistics
   * @returns
   * numOfStudents: number;
   * numOfGroups: number;
   * numOfSemesters: number;
   * numOfCategories: number;
   */
  getStatistics(): Promise<NetworkResult<Statistic>>;

  /**
   * Get category by id
   * @param id Category id
   */
  getCategoryById(id: number): Promise<NetworkResult<Category>>;

  /**
   * Get group by id
   */
  getGroupById(id: number): Promise<NetworkResult<Group>>;

  /**
   * Get student by id
   */
  getStudentById(id: number): Promise<NetworkResult<Student>>;

  getStudentByAuthUserId(
    id: string
  ): Promise<NetworkResult<Student | undefined>>;

  /**
   * Search groups by keyword
   */
  searchGroups(keyword: string): Promise<NetworkResult<Group[]>>;

  /**
   * Create student by auth user id
   */
  createStudentByAuthUserId(
    uid: string,
    student: Student
  ): Promise<NetworkResult<Student>>;
}
