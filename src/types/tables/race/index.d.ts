import { BaseTable } from "../../api";
import { Race, SubRace, RaceAttributeBonus, RaceSkillBonus } from "./base";

////////////////////////////////////// RACE //////////////////////////////////////
export interface RaceTable extends BaseTable, Race {}

export interface SubRaceTable extends BaseTable, SubRace {}

export interface RaceAttributeBonusTable extends BaseTable, RaceAttributeBonus {}

export interface RaceSkillBonusTable extends BaseTable, RaceSkillBonus {}

////////////////////////////////////// SUB-RACE JOIN RACE //////////////////////////////////////
interface Join_Race extends SubRaceTable {
  race_name: string;
}

////////////////////////////////////// SKILL-BONUS JOIN SUB-RACE SKILL //////////////////////////////////////
interface Join_SubRace_Skill extends RaceSkillBonusTable {
  sub_race_name: string;
  skill_name: string;
  attribute_name: string;
  attribute_id: number;
}

////////////////////////////////////// ATTRIBUTE-BONUS JOIN SUB-RACE ATTRIBUTE //////////////////////////////////////
interface Join_SubRace_Attribute extends RaceAttributeBonusTable {
  sub_race_name: string;
  attribute_name: string;
}
