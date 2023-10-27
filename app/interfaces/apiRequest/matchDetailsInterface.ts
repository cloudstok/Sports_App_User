export default interface MatchDetails {
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
  key: string;
  name: string;
  short_name: string;
  sub_title: string;
  status: string;
  start_at: number;
  tournament: Tournament;
  metric_group: string;
  sport: string;
  winner: string;
  teams: Teams;
  venue: Venue;
  association: Association;
  messages: any[];
  gender: string;
  format: string;
  title: string;
  play_status: string;
  start_at_local: number;
  toss: Toss;
  play: Play;
  players: Players;
  notes: any[];
  data_review: Datareview;
  squad: Squad;
  estimated_end_date: number;
  completed_date_approximate: number;
  umpires: Umpires;
  weather: string;
}

interface Umpires {
  match_umpires: Matchumpire[];
  tv_umpires: Matchumpire[];
  reserve_umpires: Matchumpire[];
  match_referee: Matchumpire[];
}

interface Matchumpire {
  key: string;
  name: string;
  legal_name: string;
  nationality: Country;
}

interface Squad {
  a: A2;
  b: A2;
}

interface A2 {
  player_keys: string[];
  captain: string;
  keeper: string;
  playing_xi: string[];
  replacements: any[];
}

interface Datareview {
  schedule: boolean;
  venue: boolean;
  result: boolean;
  pom: boolean;
  score: boolean;
  players: boolean;
  playing_xi: boolean;
  score_reviewed_ball_index: (number[] | string)[];
  team_a: boolean;
  team_b: boolean;
  good_to_close: boolean;
  note?: any;
}

interface Players {
  c__player__tilak_varma__90ac7: Cplayertilakvarma90ac7;
  k_yadav: Cplayertilakvarma90ac7;
  was_sundar: Cplayertilakvarma90ac7;
  j_bumrah: Jbumrah;
  m_marsh: Jbumrah;
  m_stoinis: Jbumrah;
  p_cummins: Jbumrah;
  a_patel: Cplayertilakvarma90ac7;
  c__player__mukesh_kumar__744ac: Jbumrah;
  rg_sharma: Cplayertilakvarma90ac7;
  v_kohli: Jbumrah;
  h_pandya: Jbumrah;
  rd_gaikwad: Rdgaikwad;
  su_gill: Rdgaikwad;
  s_iyer: Rdgaikwad;
  l_rahul: Lrahul;
  i_kishan: Lrahul;
  s_yadav: Syadav;
  r_jadeja: Syadav;
  r_ashwin: Syadav;
  s_thakur: Sthakur;
  s_ahmed: Sthakur;
  pr_krishna: Sthakur;
  d_warner: Lrahul;
  m_short: Rdgaikwad;
  s_smith: Rdgaikwad;
  mar_labuschagne: Rdgaikwad;
  jo_inglis: Lrahul;
  ale_carey: Alecarey;
  cam_green: Alecarey;
  s_abbott: Alecarey;
  a_zampa: Rdgaikwad;
  j_hazlewood: Alecarey;
  c__player__spencer_johnson__fd976: Syadav;
  m_starc: Jbumrah;
  c__player__tanveer_sangha__60534: Cplayertilakvarma90ac7;
  t_head: Cplayertilakvarma90ac7;
  a_agar: Cplayertilakvarma90ac7;
  g_maxwell: Cplayertilakvarma90ac7;
  c__player__nathan_ellis__1a190: Jbumrah;
  a_hardie: Jbumrah;
  m_siraj: Jbumrah;
}

interface Alecarey {
  player: Player2;
  score: Score6;
}

interface Sthakur {
  player: Player2;
  score: Score7;
}

interface Syadav {
  player: Player;
  score: Score7;
}

interface Score7 {
  '1': _12;
}

interface _12 {
  batting: Batting2;
  bowling: Bowling;
  fielding: Fielding;
}

interface Batting2 {
  score: Score4;
  dismissal?: any;
}

interface Lrahul {
  player: Player3;
  score: Score6;
}

interface Player3 {
  key: string;
  name: string;
  jersey_name: string;
  legal_name: string;
  gender: string;
  nationality: Country;
  date_of_birth: number;
  seasonal_role: string;
  roles: string[];
  batting_style: string;
  bowling_style?: any;
  skills: string[];
  legal_name_v2: string;
  jersey_name_v2: string;
}

interface Rdgaikwad {
  player: Player;
  score: Score6;
}

interface Score6 {
  '1': _1;
}

interface _1 {
  batting: Batting;
  bowling: Bowling;
  fielding: Fielding;
}

interface Fielding {
  catches: number;
  stumpings: number;
  runouts: number;
}

interface Bowling {
  score: Score5;
}

interface Score5 {
  balls: number;
  runs: number;
  economy: number;
  wickets: number;
  extras: number;
  maiden_overs: number;
  overs: number[];
  balls_breakup: Ballsbreakup2;
}

interface Ballsbreakup2 {
  dot_balls: number;
  wides: number;
  no_balls: number;
  fours: number;
  sixes: number;
}

interface Batting {
  score: Score4;
  dismissal: Dismissal;
}

interface Dismissal {
  overs: number[];
  team_runs: number;
  wicket_number: number;
  msg: string;
  ball_key: string;
}

interface Score4 {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  dot_balls: number;
  strike_rate: number;
}

interface Jbumrah {
  player: Player2;
  score: Score3;
}

interface Player2 {
  key: string;
  name: string;
  jersey_name: string;
  legal_name: string;
  gender: string;
  nationality: Country;
  date_of_birth: number;
  seasonal_role: string;
  roles: string[];
  batting_style: string;
  bowling_style: Bowlingstyle2;
  skills: string[];
  legal_name_v2: string;
  jersey_name_v2: string;
}

interface Bowlingstyle2 {
  arm: string;
  pace: string;
  bowling_type?: any;
}

interface Cplayertilakvarma90ac7 {
  player: Player;
  score: Score3;
}

interface Score3 {
}

interface Player {
  key: string;
  name: string;
  jersey_name: string;
  legal_name: string;
  gender: string;
  nationality: Country;
  date_of_birth: number;
  seasonal_role: string;
  roles: string[];
  batting_style: string;
  bowling_style: Bowlingstyle;
  skills: string[];
  legal_name_v2: string;
  jersey_name_v2: string;
}

interface Bowlingstyle {
  arm: string;
  pace: string;
  bowling_type: string;
}

interface Play {
  first_batting: string;
  day_number: number;
  overs_per_innings: number[];
  reduced_overs: number[];
  target: Target;
  result: Result;
  innings_order: string[];
  innings: Innings;
  live?: any;
  related_balls: Relatedballs;
}

interface Relatedballs {
  '526080': _526080;
  '539968': _526080;
  '542016': _526080;
  '544896': _526080;
  '547712': _547712;
  '1049216': _526080;
  '1049280': _526080;
  '1055040': _547712;
  '1055808': _547712;
  '1056064': _547712;
  '1057920': _547712;
  '1058624': _526080;
  '1059072': _547712;
  '1061504': _1061504;
  '1061568': _1061504;
  '1061632': _1061504;
  '1061696': _1061504;
  '1061760': _1061504;
  '1061952': _1061504;
  '1062016': _1061504;
  '1062080': _1061504;
  '1062144': _1061504;
  '1062208': _1061504;
  '1062272': _1061504;
  '1062464': _1061504;
  '1062528': _1061504;
  '1062592': _1061504;
  '1062656': _1061504;
  '1062720': _1061504;
  '1062784': _547712;
  '1062976': _1061504;
  '1063040': _547712;
}

interface _1061504 {
  key: string;
  ball_type: string;
  batting_team: string;
  comment: string;
  innings: string;
  overs: number[];
  batsman: Batsman;
  bowler: Bowler;
  team_score: Teamscore;
  fielders: any[];
  wicket?: any;
  non_striker_key: string;
  entry_time: number;
  ball_play_status: string;
  ball_tags: any[];
  updated_time: number;
}

interface _547712 {
  key: string;
  ball_type: string;
  batting_team: string;
  comment: string;
  innings: string;
  overs: number[];
  batsman: Batsman;
  bowler: Bowler;
  team_score: Teamscore;
  fielders: any[];
  wicket: Wicket;
  non_striker_key: string;
  entry_time: number;
  ball_play_status: string;
  ball_tags: any[];
  updated_time: number;
}

interface _526080 {
  key: string;
  ball_type: string;
  batting_team: string;
  comment: string;
  innings: string;
  overs: number[];
  batsman: Batsman;
  bowler: Bowler;
  team_score: Teamscore;
  fielders: Fielder[];
  wicket: Wicket;
  non_striker_key: string;
  entry_time: number;
  ball_play_status: string;
  ball_tags: any[];
  updated_time: number;
}

interface Wicket {
  player_key: string;
  wicket_type: string;
}

interface Fielder {
  player_key: string;
  is_run_out: boolean;
  is_stumps: boolean;
  is_catch: boolean;
  is_assists: boolean;
}

interface Teamscore {
  ball_count: number;
  runs: number;
  extras: number;
  is_wicket: boolean;
}

interface Bowler {
  player_key: string;
  ball_count: number;
  runs: number;
  extras: number;
  is_wicket: boolean;
}

interface Batsman {
  player_key: string;
  ball_count: number;
  runs: number;
  is_dot_ball: boolean;
  is_four: boolean;
  is_six: boolean;
}

interface Innings {
  a_1: A1;
  b_1: A1;
}

interface A1 {
  index: string;
  overs: number[];
  is_completed: boolean;
  score_str: string;
  score: Score;
  wickets: number;
  extra_runs: Extraruns;
  balls_breakup: Ballsbreakup;
  batting_order: string[];
  bowling_order: string[];
  wicket_order: string[];
  partnerships: Partnership[];
}

interface Partnership {
  begin_overs: number[];
  end_overs: number[];
  player_a_key: string;
  player_a_score: Playerascore;
  player_b_key: string;
  player_b_score: Playerascore;
  score: Score2;
  is_completed: boolean;
}

interface Score2 {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  run_rate: number;
}

interface Playerascore {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
}

interface Ballsbreakup {
  balls: number;
  dot_balls: number;
  wides: number;
  no_balls: number;
}

interface Extraruns {
  extra: number;
  bye: number;
  leg_bye: number;
  wide: number;
  no_ball: number;
  penalty: number;
}

interface Score {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  dot_balls: number;
  run_rate: number;
}

interface Result {
  pom: string[];
  winner: string;
  result_type: string;
  msg: string;
}

interface Target {
  balls: number;
  runs: number;
  dl_applied: boolean;
}

interface Toss {
  called: string;
  winner: string;
  elected: string;
  squad_announced: boolean;
}

interface Association {
  key: string;
  code: string;
  name: string;
  country?: any;
  parent?: any;
}

interface Venue {
  key: string;
  name: string;
  city: string;
  country: Country;
  geolocation: string;
}

interface Country {
  short_code: string;
  code: string;
  name: string;
  official_name: string;
  is_region: boolean;
}

interface Teams {
  a: A;
  b: A;
}

interface A {
  key: string;
  code: string;
  name: string;
  country_code: string;
}

interface Tournament {
  key: string;
  name: string;
  short_name: string;
}