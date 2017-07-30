module.exports = publishAskQuestion;

function publishAskQuestion(title,description,total_score,authorID,callback){

    let config = this.config;

    let isTitleDuplicate = new Promise((resolve,reject) => {
        let sql = config.modules['saferman'].format(
            'SELECT ID FROM AskQuestionTable WHERE title=?',
            [title]);

        config.modules['saferman'].sql(sql,function(results){
            //console.log('results is: '+results.length);
            if(results.length == 0){
                //console.log('not duplicate');
                resolve();
            }else{
                //console.log('duplicate');
                reject();
            }
        });
    });

    isTitleDuplicate.then(titleNotDuplicate,titleDuplicate);



    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }

    function titleNotDuplicate(){

        let sql = 'SELECT count(ID) FROM AskQuestionTable';

        config.modules['saferman'].sql(sql,function(results){
            let NextUsableID = results[0]['count(ID)'] + 1;

            initAskQuestionTable(NextUsableID);
            executeCallback();

            function initAskQuestionTable(NextUsableID){
                let sql = config.modules['saferman'].format(
                    'INSERT INTO AskQuestionTable (ID,title,description,total_score,time,authorID) VALUE (?,?,?,?,?,?)',
                    [NextUsableID,title,description,total_score,0,authorID]);

                config.modules['saferman'].sql(sql);
            }
        });

    };

    function titleDuplicate(){
        executeCallback()
    };

}
