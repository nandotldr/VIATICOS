export interface MenuItem {
  icon: string;
  name: string;
  redirectTo: string;
  children?: MenuItem[];
}

export interface DashboardItem {
  id?: string;
  title?: string;
  description?: string;
  file_url?: string;
  date?: number;
}

export interface PopOverItem {
  title: string;
  information: string;
}

export interface PopOverINewstem {
  title_card: string;
  title?: string;
  information?: string;
  file_url?: string;
}

export interface PersonalDataModel {
  code?: string;
  userType?: string;
  position?: string;
  hire_date?: number;
  names?: string;
  last_name?: string;
  second_last_name?: string;
  picture_url?: string;
  alias_degree?: string;
  personal_email?: string;
  institutional_email?: string;
  home_phone?: string;
  cellphone?: string;
  office_phone?: string;
  extension_office_phone?: string;
  birthday?: number;
  birth_city?: string;
  birth_state?: string;
  birth_country?: string;
  gender?: string;
  marital_status?: string;
  living_state?: string;
  living_country?: string;
  address_colony?: string;
  address_street?: string;
  address_postal_code?: string;
  address_exterior_number?: string;
  address_interior_number?: string;
  curp?: string;
  curp_url?: string;
  imss?: string;
  imss_url?: string;
  rfc?: string;
  rfc_url?: string;
}

export interface LaboralDataModel {
  curriculum_url?: string;
  academy_ascription_dependency?: string;
  ascription_dependency?: string;
  physical_ascription_dependency?: string;
  contracts?: {
    id?: string;
    type?: string;
    educational_contract?: string;
    digitized_url?: string;
    temporarily?: string;
    start_date?: number;
    end_date?: number;
    work_shift?: string;
    semanal_work?: string;
    ascription?: string;
    status?: string
  }[];
}

export interface AcademicDataModel {
  id?: string;
  degree?: string;
  degree_url?: string;
  start_degree?: string;
  finish_degree?: string;
  university_given_degree?: string;
  laboral_type_degree?: string;
  active?: string;
  personal_data_code?: string;
}

export interface SkillLanguageModel {
  id?: string;
  language?: string;
  spoken?: number;
  comprehension?: number;
  reading?: number;
  written?: number;
  personal_data_code?: string;
}

export interface SkillProgramModel {
  id?: string;
  program?: string;
  usage?: number;
  personal_data_code?: string;
}

export interface JobPositionModel {
  id?: string;
  position?: string;
  institution?: string;
  period?: string;
  personal_code?: string;
}

export interface AcademicSubjectsModel {
  id?: string;
  subject?: string;
  number_sections?: string;
  period?: string;
  personal_code?: string;
}

export interface ProfessionalExperiencesModel {
  id?: string;
  position?: string;
  company?: string;
  period?: string;
  personal_code?: string;
}

export interface ProductsModel {
  id?: string;
  books?: string;
  class_notes?: string;
  didactic_material?: string;
  practice_manual?: string;
  articles?: string;
  congress_memories?: string;
  patents?: string;
  outreach_articles?: string;
  forum_participations?: string;
  industry_services?: string;
  industry_agreements?: string;
  personal_code?: string;
}

export interface FileModel {
  id?: string;
  record?: string;
  personal_code?: string;
}

export interface ProfessionalAssociationsModel {
  id?: string;
  association_name?: string;
  membership_type?: string;
  period?: string;
  personal_code?: string;
}

export interface AwardModel {
  id?: string;
  award?: string;
  personal_code?: string;
}

export interface AchievementModel {
  id?: string;
  achievement?: string;
  personal_code?: string;
}

export interface ExpedientModel {
  code?: string;
  names?: string;
  last_name?: string;
  second_last_name?: string;
  curp_url?: string;
  rfc_url?: string;
  imss_url?: string;
  unique_file_url?: string;
  identification_url?: string;
  birth_certificate_url?: string;
  address_proof_url?: string;
  nomination_url?: string;
  academy_ascription_dependency?: string;
  curriculum_url?: string;
}

export interface CreateUserModel {
  code?: string;
  password?: string;
  gender?: string;
  names?: string;
  last_name?: string;
  second_last_name?: string;
  ascription_dependency?: string;
}

export interface UserPlanReportModel {
  names?: string;
  last_name?: string;
  second_last_name?: string;
  code?: string;
  academy_ascription_dependency?: string;
}

export interface PlanModel {
  id?: string;
  type?: string;
  program?: string;
  year?: string;
  subject?: string;
  docent_formation?: string;
  support_activities?: string;
  group_number?: string;
  line_number?: string;
  project_name?: string;
  actual_year_progress?: string;
  expected_year_progress?: string;
  activities_description?: string;
  student_tutorship?: string;
  student_help?: string;
  student_formation?: string;
  participation?: string;
  academic_management?: string;
  collective_management?: string;
  collective_knowledge?: string;
  personal_management?: string;
  diffusion?: string;
  post_formation?: string;
  additional_comment?: string;
  teacher?: string;
  lgac?: string;
  helps?: string;
  tutories?: string;
  management?: string;
  diffusion_hours?: string;
  formation?: string;
  status?: string;
  comment?: string;
  act_number?: string;
  celebration_date?: string;
  personal_code?: string;
}

export interface AcademyModel {
  id?: string;
  name?: string;
  year?: string;
}

export interface RestorePasswordModel {
  code?: string;
  rfc?: string;
  imss?: string;
  birthday?: string;
}
