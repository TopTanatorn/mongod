let hash = require('object-hash');

class BlockChain{
    constructor(){
        this.chain = [];
        this.curr_data = [];

    }
    addNewBlock(prevHash){
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            data: this.curr_data,
            prevHash: prevHash,
        };
        this.hash = hash(block);
        this.chain.push(block);
        this.curr_data = [];
        return block;
    }
    addNewData(data){
        this.curr_data.push({data});
    }
    lastBlock(){
        return this.chain.slice(-1)[0];
    }
    isEmrty(){
        return this.chain.length == 0;
    }

}

module.exports = BlockChain;