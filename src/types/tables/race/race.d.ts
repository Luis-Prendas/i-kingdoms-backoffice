import { BASE_DB_TABLE } from "@/types/api";

export interface Base_Race {
  race_name: string;
  description: string;
}

export interface DB_Race extends Base_Race, BASE_DB_TABLE { }

export type Race = Base_Race | DB_Race;

export interface DB_RaceWithRelation {
  race_id: number;
  race_name: string;
  sub_races: SubRace[];
}