export default interface statsInterface {
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
  players: Players;
  teams: Teams;
  data_review: Datareview;
  player: Player;
  team: Team;
  counter: Counter;
}

interface Counter {
  runs: number;
  fours: number;
  sixes: number;
  wickets: number;
  completed_matches: number;
  pending_matches: number;
}

interface Team {
  largest_winning_margin: Largestwinningmargin;
  smallest_winning_margin: Largestwinningmargin;
  highest_team_totals: Highestteamtotal[];
  lowest_team_totals: Lowestteamtotal[];
}

interface Lowestteamtotal {
  value: number;
  rank: number;
  team: string;
  team_against: string;
  match_key: string;
}

interface Highestteamtotal {
  value: number;
  rank: number;
  team?: string;
  team_against?: string;
  match_key: string;
}

interface Largestwinningmargin {
  by_runs: Byrun[];
  by_wickets: Byrun[];
}

interface Byrun {
  value: number;
  rank: number;
  team_won: string;
  team_lost: string;
  match_key: string;
}

interface Player {
  batting: Batting;
  bowling: Bowling;
  fielding: Fielding;
}

interface Fielding {
  most_catches: Mostrun[];
  most_stumpings: Mostrun[];
  most_runouts: Mostrun[];
  most_runout_assists: Mostrun[];
  most_dismissals: Mostrun[];
}

interface Bowling {
  most_wickets: Mostrun[];
  most_runs: Mostrun[];
  most_maidens: Mostrun[];
  most_dot_balls: Mostrun[];
  most_dot_balls_by_innings: Mostfoursbyinning[];
  best_economy: Mostrun[];
  best_economy_by_innings: Mostfoursbyinning[];
  best_bowling: Bestbowling[];
  most_four_wickets: Mostrun[];
  most_five_wickets: Mostrun[];
}

interface Bestbowling {
  rank: number;
  player_key: string;
  team_key: string;
  value: number;
  team_against: string;
  match_key: string;
  balls: number;
  runs: number;
  economy: number;
  dot_balls: number;
}

interface Batting {
  most_runs: Mostrun[];
  most_fours: Mostrun[];
  most_fours_by_innings: Mostfoursbyinning[];
  most_sixes: Mostrun[];
  most_sixes_by_innings: Mostfoursbyinning[];
  most_fifties: Mostrun[];
  most_thirties: Mostrun[];
  most_hundreds: Mostrun[];
  best_batting: Bestbatting[];
  best_strike_rate: Mostrun[];
  best_tournament_strike_rate: Mostrun[];
}

interface Bestbatting {
  rank: number;
  player_key: string;
  team_key: string;
  team_against: string;
  match_key: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strike_rate: number;
}

interface Mostfoursbyinning {
  rank: number;
  player_key: string;
  team_key: string;
  value: number;
  team_against: string;
  match_key: string;
}

interface Mostrun {
  rank: number;
  player_key: string;
  team_key: string;
  value: number;
}

interface Datareview {
  last_updated: number;
  notes?: any;
}

interface Teams {
  pak: Pak;
  sl: Pak;
  afg: Pak;
  ban: Pak;
  ind: Pak;
  nep: Pak;
}

interface Pak {
  key: string;
  code: string;
  name: string;
}

interface Players {
  a_haque: Ahaque;
  a_patel: Ahaque;
  dipendra_airee: Ahaque;
  c__player__hasan_mahmud__18f8e: Ahaque;
  h_pandya: Ahaque;
  i_kishan: Ahaque;
  j_bumrah: Ahaque;
  c__player__kushal_bhurtel__15d50: Ahaque;
  kus_malla: Ahaque;
  l_rahul: Ahaque;
  k_yadav: Ahaque;
  l_das: Ahaque;
  mahedi_hasan: Ahaque;
  meh_hasan: Ahaque;
  m_rahim: Ahaque;
  m_rizwan: Ahaque;
  s_ahmed: Ahaque;
  m_siraj: Ahaque;
  c__player__nasum_ahmed__26997: Ahaque;
  n_hossain: Ahaque;
  nas_shah: Ahaque;
  r_jadeja: Ahaque;
  rk_paudel: Ahaque;
  rg_sharma: Ahaque;
  ai_hasan: Ahaque;
  su_gill: Ahaque;
  c__player__shamim_hossain__1d18a: Ahaque;
  c__player__shoriful_islam__57c37: Ahaque;
  s_iyer: Ahaque;
  s_yadav: Ahaque;
  ta_ahmed: Ahaque;
  c__player__tanzid_hasan_tanim__d8970: Ahaque;
  Tow_Hridoy: Ahaque;
  c__player__tanzim_hasan_sakib__24a90: Ahaque;
  v_kohli: Ahaque;
  i_haq: Ahaque;
  f_zaman: Ahaque;
  ift_ahmed: Ahaque;
  sha_khan: Ahaque;
  a_salman: Ahaque;
  har_rauf: Ahaque;
  se_afridi: Ahaque;
  b_azam: Ahaque;
  f_haq: Ahaque;
  rah_gurbaz: Ahaque;
  ra_khan: Ahaque;
  m_nabi: Ahaque;
  r_shah: Ahaque;
  h_shahidi: Ahaque;
  n_zadran: Ahaque;
  ibr_zadran: Ahaque;
  k_mendis: Ahaque;
  c__player__pathum_nissanka__93404: Ahaque;
  s_samarawickrama: Ahaque;
  cha_asalanka: Ahaque;
  dm_de_silva: Ahaque;
  c__player__dunith_wellalage__7a1f4: Ahaque;
  k_rajitha: Ahaque;
  c__player__maheesh_theekshana__996f9: Ahaque;
  c__player__matheesha_pathirana__0014e: Ahaque;
  k_perera: Ahaque;
  kar_janat: Ahaque;
  c__player__zaman_khan__09c9f: Ahaque;
  g_naib: Ahaque;
}

interface Ahaque {
  key: string;
  name: string;
  jersey_name: string;
  legal_name: string;
  gender: string;
  nationality: Nationality;
  date_of_birth: string;
  team_key: string;
  seasonal_role: string;
}

interface Nationality {
  short_code: string;
  code: string;
  name: string;
  official_name: string;
  is_region: boolean;
}