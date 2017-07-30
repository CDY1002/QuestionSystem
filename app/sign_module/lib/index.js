module.exports = start;

function start(config){

    return (new API(config));
};

function API(config){
    this.config = config;
}

API.prototype.signIn = require('./signIn.js');

API.prototype.signUp = require('./signUp.js');

API.prototype.isSignIn = require('./isSignIn.js');

API.prototype.logOut = require('./logOut.js');
