let hash = require('object-hash');
let validator = require("./validator");
let mongoose = require("mongoose");
let blockChainModel = mongoose.model("BlockChain");
let chalk = require("chalk");
const TARGET_HASH = hash(156);
class BlockChain {
    constructor() {
        this.chain = [];
        this.curr_informations = [];

    }
    addNewBlock(prevHash) {
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            informations: this.curr_informations,
            prevHash: prevHash,
        };
        if (validator.proofOfWork() == TARGET_HASH) {
            block.hash = hash(block);
            let newBlock = new blockChainModel(block);
            newBlock.save((err) => {
                if (err) return console.log(chalk.red("Cannot save Block to DB", err.mesage));
                console.log(chalk.green("Block Saved on the DB"));
            });
            this.chain.push(block);
            this.curr_informations = [];
            return block;
        }



    }
    addNewData(informations) {
        this.curr_informations.push({ informations });
    }
    lastBlock() {
        return this.chain.slice(-1)[0];
    }
    isEmrty() {
        return this.chain.length == 0;
    }

}

module.exports = BlockChain;