import { BASE_DB_TABLE } from "@/types/api";

export interface Base_Class {
  class_name: string;
  description: string;
}

export interface DB_Class extends Base_Class, BASE_DB_TABLE { }