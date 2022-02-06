let database = require("./database");
database.onConnect(() => {
    let BlockChain = require("./blockChain");
    let blockChain = new BlockChain();
    let hash = require("object-hash");



    
    blockChain.addNewBlock(null,"test2");
    
})
