import { BASE_DB_TABLE } from "@/types/api";

export interface Base_ClassSkillBonus {
  bonus: number;
  subRace: SubRace;
  skill: Skill;
}

export interface DB_ClassSkillBonus extends Base_ClassSkillBonus, BASE_DB_TABLE { }

export interface DB_ClassSkillBonusJoinSubRaceSkill extends DB_ClassSkillBonus {
  sub_class_name: string;
  skill_name: string;
  attribute_name: string;
  attribute_id: number;
}