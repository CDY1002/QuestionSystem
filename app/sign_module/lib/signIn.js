module.exports = signIn;

function signIn(username,password,req,callback){
    //console.log('signIn function execute');
    this.config.modules['personalinformation_module'].ifUsernameMatchPasswordGetID(username,password,function(results){
        if(results != false){
            //console.log('I get ID it is: '+results);
            req.session.ID = results;
            callback();
        }else{
            //console.log('I can not get ID');
            callback();
        }


        function executeCallback(argumentOfCallback){
            if(callback!=undefined)
                callback(argumentOfCallback);
        }

    });
}
