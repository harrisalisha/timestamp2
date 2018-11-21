var express = require('express');
var app = express();

var months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//this is example we want out
app.get('/', function(req, res){
    res.send('<p>Example usage:</p><code>http://localhost:8080/December%2015,%202015</code><br> <code>http://localhost:8080/1450137600</code>');
});



app.get('/:date([0-9]*)', function(req, res){
    var result = {
        "unix": null, "natural": null
    };

    var timestamp = parseInt(req.params.date);
    var date = new Date(timestamp * 1000);
    result.unix = timestamp;
    result.natural = (months[date.getMonth()]) + " "+ date.getDate() + ', '+ date.getFullYear();


    res.send(result);

});
//example September15, 2017
app.get('/:naturalString([a-zA-Z]*)', function(req, res){
    var result ={
        "unix": null, "natural": null
    };
    //naturalString we split into three array 0 1 2
    var dateArr = req.params.naturalString.split(' ');

    if(months.indexOf(dateArr[0]) > -1){
        var month = months.indexOf(dateArr[0]);
        //day still have coma, see example line 20 so we replace with ('')
        var day = dateArr[1].replace(',', '');
        var year = dateArr[2];

        var date = new Date(year, month, day);

        result.unix = date.getTime()/1000;// getTime is in milisecond
        result.natural = (months[date.getMonth()]) + ' ' + date.getDate()+ ', '+ getFullYear();

        res.send(result);
    }
    res.send(result);
});


app.listen(8080, function() { 
    console.log('App listening on port 8080.');
  });


