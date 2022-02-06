let database = require("./database");
let BlockChain = require("./blockChain");
let blockChain = new BlockChain();
let hash = require("object-hash");


database.onConnect(() => {   
        blockChain.addNewBlock(null,"test2");  
});
