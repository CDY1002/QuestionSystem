module.exports = isUsernameMatchPassword;

function isUsernameMatchPassword(Name,password,callback){
    //console.log('isUsernameMatchPassword execute');

    var sql = 'SELECT ID FROM PersonalInformation WHERE Name="' + Name + '"';

    this.config.modules['saferman'].sql(sql,(results) => {
        if(results[0] != undefined){
            var ID = results[0].ID;

            sql = 'SELECT Shadow FROM ShadowTable WHERE ID=' + ID;

            this.config.modules['saferman'].sql(sql,function(results){

                if(results[0].Shadow == password){
                    //console.log('match ,and ID is '+ ID);
                    executeCallback(ID);
                }else{
                    //console.log('not match');
                    executeCallback(false);
                }

            })

        }else{
            //console.log('unvalid username');
            executeCallback(false);
        }

        function executeCallback(argument){
            if(callback!=undefined)
                callback(argument);
        }
    });
}

