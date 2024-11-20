import { BaseTable } from "../../api";
import { Class, SubClass, ClassAttributeBonus, ClassSkillBonus } from "./base";

////////////////////////////////////// CLASS //////////////////////////////////////
export interface ClassTable extends BaseTable, Class {}

export interface SubClassTable extends BaseTable, SubClass {}

export interface ClassAttributeBonusTable extends BaseTable, ClassAttributeBonus {}

export interface ClassSkillBonusTable extends BaseTable, ClassSkillBonus {}

////////////////////////////////////// SUB-CLASS JOIN CLASS //////////////////////////////////////
export interface Join_Class extends SubClassTable {
  class_name: string;
}

////////////////////////////////////// ATTRIBUTE-BONUS JOIN SUB-CLASS ATTRIBUTE //////////////////////////////////////
export interface Join_Attribute_SubClass extends ClassAttributeBonusTable {
  attribute_name: string;
  sub_class_name: string;
}
 
////////////////////////////////////// SKILL-BONUS JOIN SUB-CLASS SKILL //////////////////////////////////////
export interface Join_Skill_SubClass extends ClassSkillBonusTable {
  skill_name: string;
  sub_class_name: string;
}