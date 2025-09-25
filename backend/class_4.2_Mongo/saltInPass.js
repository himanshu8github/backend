const { hash } = require("bcrypt");
const bcrypt = require("bcrypt");

const pass = "himaniii@!@#";

async function hashingPass(){
    //hashcode+salt

    
const hashedPassword = await bcrypt.hash(pass, 10);
console.log("waitinggg...")
console.log(hashedPassword);

const ans = await bcrypt.compare(pass, hashedPassword);
console.log(ans);
};

hashingPass(); 