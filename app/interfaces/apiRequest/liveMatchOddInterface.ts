 export default interface liveMatchOdd {
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
  match: Match;
}

interface Match {
  bet_odds: Betodds;
  result_prediction: Resultprediction;
  teams: Teams;
  meta: Meta;
}

interface Meta {
  key: string;
  status: string;
  format: string;
  start_at: number;
}

interface Teams {
  ind: Ind;
  aus: Ind;
}

interface Ind {
  key: string;
  code: string;
  name: string;
}

interface Resultprediction {
  automatic: Automatic2;
}

interface Automatic2 {
  percentage: Decimal[];
}

interface Betodds {
  automatic: Automatic;
}

interface Automatic {
  decimal: Decimal[];
  fractional: Fractional[];
}

interface Fractional {
  team_key: string;
  value: number;
  numerator: number;
  denominator: number;
}

interface Decimal {
  team_key: string;
  value: number;
}