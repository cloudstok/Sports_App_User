
import { appConfig } from "../../../config/appConf";
import axios, { all } from "axios";
import tournamentDetail from "interfaces/apiRequest/tournamentDetailsInterface";
import FeaturedTournaments from "interfaces/apiRequest/featured_tournamentInterface";
import association from "interfaces/apiRequest/associationInterface";
import countries from "interfaces/apiRequest/countriesInterface";
import liveMatchOdd from "interfaces/apiRequest/liveMatchOddInterface";
import statsInterface from "interfaces/apiRequest/statsInterface";
import { RedisOperations } from '../../redis/redis';
import { connection } from "../../../config/dbConf";
import { token } from "../genrateToken"
const redis = new RedisOperations()


let options = {
  'method': 'GET',
  'url': "",
  'headers': {

    'rs-token': appConfig.RS_TOKEN,
    // 'rs-token': "",
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "api_key": "RS5:befd943eb821533f84188c0c0ba523db"
  })

};



export class cricketApi {
  connection: connection
  token: token
  constructor() {

    this.connection = new connection()
    this.token = new token()
  }

  async fetchDataFromSource(option , res : any) {
    try {
      await this.token.getToken()
      options.headers['rs-token'] = JSON.parse(await redis.getRedis("token")).token
      return new Promise((resolve, reject) => {
        axios(option).then(response => {
          resolve(response.data)
        }).catch(err => {
          // reject(err)
          res.send({msg : "Something Went Wrong From Third Party API" ,error : err })
        })

      })
    } catch (err) {
      console.log(err)
      res.send({msg : "Something Went Wrong From Third Party API" , error : err})
    }
  }

  async list_tournament(tournament_key , res): Promise<tournamentDetail> {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/tournament/${tournament_key}/`;
      return (await this.fetchDataFromSource(options ,  res)) as tournamentDetail;
    } catch (err) {
      console.log(err)
    }
  }

  async get_associations(res): Promise<association> {
    options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/association/list/`
    return (await this.fetchDataFromSource(options , res)) as association
  }


  async Featured_Tournaments(Association , res): Promise<FeaturedTournaments> {
    options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/association/${Association}/featured-tournaments/`;
    // options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/featured-tournaments/`;
    return (await this.fetchDataFromSource(options , res)) as FeaturedTournaments
  }

  async countries(res): Promise<countries> {
    options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/country/list/`;
    return (await this.fetchDataFromSource(options , res)) as countries
  }
  // ===============
  async venues(page_key , res) {
    options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/venue/list/${page_key}/`;
    return await this.fetchDataFromSource(options , res)
  }

  async get_associations_by_country(country_code ,res) {
    options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/association/list-by-country/${country_code}/`;
    return await this.fetchDataFromSource(options , res)
  }

  //========================================= Tournament Endpoints ===============================

  async Featured( res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/featured-tournaments/`;
      return await this.fetchDataFromSource(options , res)
    } catch (err) {
      console.log(err)
    }
  }
  async featured_matches(tournament_key , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/tournament/${tournament_key}/featured-matches-2/`;
      return await this.fetchDataFromSource(options , res)
    } catch (err) {
      console.log(err)
    }
  }
  async get_tournament_fixtures(tournament_key , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/tournament/${tournament_key}/fixtures/`;
      return await this.fetchDataFromSource(options , res)
    } catch (err) {
      console.log(err)
    }
  }
  async get_tournament(tournament_key , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/tournament/${tournament_key}/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.log(err)
    }
  }
  async get_tournament_tables(tournament_key , res ) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/tournament/${tournament_key}/points/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.log(err)
    }
  }
  async get_tournament_team(tournament_key, team_key , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/tournament/${tournament_key}/team/${team_key}/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.log(err)
    }
  }
  async Grouped_Tournament(key , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/grouped-tournament/${key}/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.log(err)
    }
  }

  //===========================================  Match Odds Endpoints ======================================================
  async get_live_match_odds(key , res): Promise<liveMatchOdd> {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/match/${key}/live-match-odds/`;
      return (await this.fetchDataFromSource(options ,res)) as liveMatchOdd
    } catch (err) {
      console.log(err)
    }
  }
  async get_pre_match_odds(key , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/match/${key}/pre-match-odds/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.log(err)
    }
  }
  // ============================================= Match Endpoints=============================
  async get_matches_list( res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/featured-matches-2/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }

  async detail_match(key , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/match/${key}/`;
      return await this.fetchDataFromSource(options ,res);
    } catch (err) {
      console.error(err)
    }
  }

  async get_match_ballByBall(key ,res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/match/${key}/ball-by-ball/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }

  async get_match_overSummary(key , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/match/${key}/over-summary/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }

  //==============================Fantasy Match Details====================================//
  async get_fantasy_matchCredits(matchKey , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/fantasy-match-credits/${matchKey}/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }

  async get_fantasy_matchPoints(matchKey , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/fantasy-match-points/${matchKey}/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }


  //================= Tournaments=======================================///

  async get_tournament_stats(tournamentKey ,res ) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/tournament/${tournamentKey}/stats/`;
      return (await this.fetchDataFromSource(options ,res)) as statsInterface
    } catch (err) {
      console.error(err)
    }
  }

  async get_player_stats(tournamentKey, playerKey , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/tournament/${tournamentKey}/player/${playerKey}/stats/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }

  async get_group_tournament_stats(tournamentKey , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/grouped-tournament/${tournamentKey}/stats/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }


  async get_group_tournament_player_stats(tournamentKey, playerKey , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/grouped-tournament/${tournamentKey}/player/${playerKey}/stats/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }


  async get_association_player_stats(associationKey, playerKey , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/association/${associationKey}/player/${playerKey}/stats/`
      //`https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/association/${associationKey}/player/${playerKey}/stats/`;

      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }


  //=================== Advance Stats =======================================///

  async get_player_performance_stats(playerKey, format,  res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/player-performance/${playerKey}/?format=${format}`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }


  async get_bb_stats(batterKey, bowlerKey, format , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/batter-vs-bowler/${batterKey}/${bowlerKey}/?format=${format}`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }


  async get_venue_stats(venueKey, format , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/venue/${venueKey}/stats/format/${format}/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }

  async get_team_performance(teamKey, associationKey, competition , res) {
    try {
      options.url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/team-performance/${teamKey}/association/${associationKey}/competition/${competition}/`;
      return await this.fetchDataFromSource(options ,res)
    } catch (err) {
      console.error(err)
    }
  }

}
