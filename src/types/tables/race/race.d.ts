import { BASE_DB_TABLE } from "@/types/api";

export interface Base_Race {
  race_name: string;
  description: string;
}

export interface DB_Race extends Base_Race, BASE_DB_TABLE { }
