const DEV_VARS = {
  URL_WS_TRAVEL_API: "http://localhost:9081/travelagency/api/v1",
};

const PROD_VARS = {
  URL_WS_TRAVEL_API:
    "https://racial-letter-production.up.railway.app/travelagency/api/v1",
};

export class Configs {
  constructor() {
    this.current = PROD_VARS;
  }
}
