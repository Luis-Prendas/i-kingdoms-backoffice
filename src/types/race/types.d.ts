interface Race extends Api_Response {
  race_name: string
}

interface GetAllRaces extends Race {
  race_attribute_bonus: RaceAttributeBonu[]
  sub_races: SubRace[]
}

interface GetAllRaceBonus extends RaceAttributeBonu {
  attribute: Attribute
  subRace: SubRace
}