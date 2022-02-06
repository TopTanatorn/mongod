let hash = require('object-hash');
let validator = require("./validator");
let mongoose = require("mongoose");
let blockChainModel = mongoose.model("BlockChain");
let chalk = require("chalk");
const TARGET_HASH = hash(156);
class BlockChain {
    constructor() {
        this.chain = [];
        this.informations = "";
    }
    getLastBlock(callblack) {
        return blockChainModel.findOne({}, null, { sort: { _id: -1 }, limit: 1 }, (err, block) => {
            if (err) return console.error("Cannot find Last Block");
            return callblack(block);
        })
    }
    getInfo(){
        return this.informations;
    }
    addNewBlock(prevHash,informations) {
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            informations: informations,
            prevHash: prevHash,
        };
        if (validator.proofOfWork() == TARGET_HASH) {
            block.hash = hash(block);
            console.log("Mine Block :",block.hash);

            this.getLastBlock((lastBlock) => {
                if(lastBlock){
                    block.prevHash = lastBlock.hash;
                }
                let newBlock = new blockChainModel(block);
                newBlock.save((err) => {
                    if (err) return console.log(chalk.red("Cannot save Block to DB", err.mesage));
                    console.log(chalk.green("Block Saved on the DB"));
                });
                this.chain.push(block);
                this.informations = informations;
                return block;
            });

        }



    }
    lastBlock() {
        return this.chain.slice(-1)[0];
    }
    isEmrty() {
        return this.chain.length == 0;
    }

}

module.exports = BlockChain;