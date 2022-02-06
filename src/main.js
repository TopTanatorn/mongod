let BlockChain = require("./blockChain");
let blockChain = new BlockChain();
let hash = require("object-hash");
let PROOF = 156;

let validProof = (proof) =>{
    let guessHash = hash(proof);
    console.log("Hashing", guessHash);
    return guessHash == hash(PROOF);
};

let proofOfWork= ()=>{
    let proof = 0;
    while(true){
        if(!validProof(proof)){
            proof++;
        }
        else{
            break;
        }
    }
    return proof;
}
if(proofOfWork()==PROOF){
    blockChain.addNewData("test");
    let prevHash = blockChain.lastBlock() ? blockChain.lastBlock().hash : null;
    blockChain.addNewBlock(prevHash);
}
console.log("Chain :", blockChain.chain);