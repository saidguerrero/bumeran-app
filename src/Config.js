const DEV_VARS = {
  URL_WS_TRAVEL_API: "http://localhost:9081/travelagency/api/v1",
};

const PROD_VARS = {
  URL_WS_TRAVEL_API:
    "http://api-rest-bumeran-aws-env.eba-ummp4ehp.us-east-2.elasticbeanstalk.com/travelagency/api/v1",
};

export class Configs {
  constructor() {
    this.current = PROD_VARS;
  }
}
