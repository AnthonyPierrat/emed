const Orm = require("bigchaindb-orm").default;
import * as config from "../../config.json";

const bddOrm = new Orm(config.bigchaindb_api);
bddOrm.define("user", "https://schema.org/v1/user");

export default bddOrm;
