import { BaseTable } from "../../api";
import { Skill } from "./base";

////////////////////////////////////// SKILL //////////////////////////////////////
export interface SkillTable extends BaseTable, Skill {}

////////////////////////////////////// SKILL JOIN ATTRIBUTE //////////////////////////////////////
export interface Join_Attribute extends SkillTable {
  attribute_name: string;
}
