let database = require("./database");
database.onConnect(() => {
    let BlockChain = require("./blockChain");
    let blockChain = new BlockChain();
    let hash = require("object-hash");
    let PROOF = 156;


    if (proofOfWork() == PROOF) {
        blockChain.addNewData("test");
        let prevHash = blockChain.lastBlock() ?
            blockChain
                .lastBlock()
                .hash :
            null;
        blockChain.addNewBlock(prevHash);
    }
    console.log("Chain :", blockChain.chain);
});
