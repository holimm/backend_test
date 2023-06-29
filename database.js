var mysql = require('mysql');

const mydatabase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learningzalominiapp'
});

exports.conn = function(){
    return mydatabase.connect(function(err){
        if(err) throw err
        console.log("Database Connected");
    });
};

// mydatabase.connect(function(err){
//     if(err) throw err
//     var sql = 'SELECT * FROM yeucau';
//     mydatabase.query(sql,function(err,result,field){
//         if (err) throw err
//         console.log(result);
//     });        
// });
