import { BASE_DB_TABLE } from "@/types/api";

export interface Base_ClassAttributeBonus {
  bonus: number;
  subRace: SubRace;
  attribute: Attribute;
}

export interface DB_ClassAttributeBonus extends Base_ClassAttributeBonus, BASE_DB_TABLE { }

export interface DB_ClassAttributeBonusJoinSubRaceAttribute extends DB_ClassAttributeBonus {
  sub_class_name: string;
  attribute_name: string;
}