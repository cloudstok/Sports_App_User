export default interface tournamentDetail {
  data: Data;
  cache: Cache;
  schema: Schema;
  error?: any;
  http_status_code: number;
}

interface Schema {
  major_version: string;
  minor_version: string;
}

interface Cache {
  key: string;
  expires: number;
  etag: string;
  max_age: number;
}

interface Data {
  tournament: Tournament;
  teams: Teams;
  rounds: Round[];
}

interface Round {
  key: string;
  name: string;
  have_points: boolean;
  groups: Group[];
  format: string;
}

interface Group {
  key: string;
  name: string;
  team_keys: string[];
  match_keys: string[];
}

interface Teams {
  pak: Competition;
  ind: Competition;
  ban: Competition;
  rsa: Competition;
  sl: Competition;
  nz: Competition;
  nl: Competition;
  eng: Competition;
  aus: Competition;
  afg: Competition;
}

interface Tournament {
  key: string;
  name: string;
  short_name: string;
  countries: Country[];
  start_date: number;
  gender: string;
  point_system: string;
  competition: Competition;
  association_key: string;
  metric_group: string;
  sport: string;
  is_date_confirmed: boolean;
  is_venue_confirmed: boolean;
  last_scheduled_match_date: number;
  formats: string[];
}

interface Competition {
  key: string;
  code: string;
  name: string;
}

interface Country {
  short_code: string;
  code: string;
  name: string;
  official_name: string;
  is_region: boolean;
}