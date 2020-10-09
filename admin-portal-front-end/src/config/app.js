const common = {
  captchaSiteKey: '6LeYG9AZAAAAAND6X5AlMh87E_icZ1ibE8DZ2Ia0',
  numverifyKey: 'b9890ccc20266331fa1e237562fb16be',
  universalApiToken: '0PldK-gHxSYgimcDrr2k-hErTXKY6eq8njXf_FrIfGCUdHPJMyo4oiqhaoYq4ps36q8',
  userEmailForUniversalApiToken: 'hamorir447@yosemail.com'
};

const dev = {
  LOGGER_ENABLE: true,
  API_BASE_URL: "http://localhost:3003/api/"
};

const prod = {
  LOGGER_ENABLE: false,
  API_BASE_URL: "production/api/",
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default {
  ...common,
  ...config
};

