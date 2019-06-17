const Orm = require("bigchaindb-orm");
import * as config from "../../config.json";

export default class DID extends Orm {

    public entity: any;

    constructor(entity: any) {
        super(config.bigchaindb_api);
        this.entity = entity;
    }
}
