module.exports = getQuestionDetail;

function getQuestionDetail(ID,callback){

    let config = this.config;
    getDetail();


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }

    function getDetail(){

        let sql = 'SELECT title,description,total_score,authorID FROM AskQuestionTable WHERE ID=' + ID;

        config.modules['saferman'].sql(sql,function(results){
            executeCallback(results[0]);
        });

    };

}
