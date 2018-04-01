var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    fff = require('node-jsx').install({harmony: true}),
    app = express(),
    _ = require('underscore'),
    expressValidator = require('express-validator'),
    React = require("react"),
    myComponent =require("./HelloComponent"),
    mySecondComponent = React.createFactory(require('./SecondHelloComponent'));
    ReactComponent = React.createFactory(myComponent),
    SecondReactComponent = React.createFactory(mySecondComponent),
    expressApp = express(),
    data1 = require('./products.js'),
    ReactDOMServer = require('react-dom/server');
    global.tablecreate = false;

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());


/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql,{
        host     : 'sql2.freemysqlhosting.net',
        user     : 'sql2229611',
        password : 'wX3*iM1!',
        database : 'sql2229611',
        debug    : false //set true if you wanna see debug logger
    },'request')

);

app.get('/',function(req,res){
    res.send('Welcome');
});


//RESTful route
var router = express.Router();


/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

var curut = router.route('/user');


//show the CRUD interface | GET
curut.get(function(req,res,next){



    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        conn.query("DROP TABLE IF EXISTS Vasts", function (err, result) {
            if (err) throw err;
            console.log(result);
        });


            conn.query("CREATE TABLE IF NOT EXISTS `Vasts` (\n" +
                "  `id` int(11) NOT NULL AUTO_INCREMENT,\n" +
                "  `vast_url` varchar(600) NOT NULL,\n" +
                "  `position` text  NOT NULL,\n" +
                "  `hide_ui` bit NOT NULL,\n" +
                "  PRIMARY KEY (`id`)\n" +
                ") ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;", function (err, result) {
                if (err) throw err;
                console.log("Database created");
            });

            conn.query("INSERT INTO `Vasts` ( `vast_url`, `position`, `hide_ui`) VALUES\n" +
                "( 'aaa', 'bottom_right', false),\n" +
                "( 'aaaa', 'top_left', true),\n" +
                "( 'aaaa', 'top_middle', false),\n" +
                "( 'aaaa', 'middle_left', false)", function (err, result) {
                if (err) throw err;
                console.log("table populate created");
                global.tablecreate = true ;
            });




        var query = conn.query('SELECT * FROM Vasts',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            const products = {'products' : rows};
            var reactComponentMarkup = ReactComponent(),
                staticMarkup = ReactDOMServer.renderToStaticMarkup(reactComponentMarkup);



            var secondReactComponentMarkup = SecondReactComponent(),
                staticSecondMarkup = ReactDOMServer.renderToStaticMarkup(SecondReactComponent(products));

            res.render('user',{title:"Nodejs+React+Mysql",data:rows , helloComponentMarkup: staticSecondMarkup, helloSecondComponentMarkup: staticMarkup });

         });

    });

});


//////////////////////////////////AAAAAAAAAAAAAAAAAAAA/////////////////////////////////

var curutw = router.route('/update');


//show the CRUD interface | GET
curutw.get(function(req,res,next){



    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");





        var query = conn.query('SELECT * FROM Vasts',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            const products = {'products' : rows};
            var reactComponentMarkup = ReactComponent(),
                staticMarkup = ReactDOMServer.renderToStaticMarkup(reactComponentMarkup);



            var secondReactComponentMarkup = SecondReactComponent(),
                staticSecondMarkup = ReactDOMServer.renderToStaticMarkup(SecondReactComponent(products));

            res.render('user',{title:"Nodejs+React+Mysql",data:rows , helloComponentMarkup: staticSecondMarkup, helloSecondComponentMarkup: staticMarkup });

        });

    });

});


//////////////////////////////////BBBBBBBBBBBBBBBBBBBB//////////////////////////////////////////
//post data to DB | POST
curut.post(function(req,res,next){

    //validation
  //  req.assert('name','Name is required').notEmpty();
  //  req.assert('email','A valid email is required').isEmail();
  //  req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        vast_url:req.body.name,
        position:req.body.email,
        hide_ui:req.body.password
     };

    console.log('djsdj')
    console.log(data);
    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var post  = {
            vast_url: data.vast_url,
            position: data.position,
            hide_ui: data.hide_ui
        };
        var TABLE = 'Vasts';
        conn.query('insert into '+ TABLE +' (vast_url, position , hide_ui) values ("' + data.vast_url + '", "' + data.position + '","'+ data.hide_ui+'")' , function (err, result) {
            if (err) throw err;
            console.log("table populate created");
            var query = conn.query('SELECT * FROM Vasts',function(err,rows){

                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }
                console.log('zazazaza');
                const products = {'products' : rows};
                console.log(products);
                var reactComponentMarkup = ReactComponent(),
                    staticMarkup = ReactDOMServer.renderToStaticMarkup(reactComponentMarkup);



                var secondReactComponentMarkup = SecondReactComponent(),
                    staticSecondMarkup = ReactDOMServer.renderToStaticMarkup(SecondReactComponent(products));

                res.render('user',{title:"Nodejs+React+Mysql",data:rows , helloComponentMarkup: staticSecondMarkup, helloSecondComponentMarkup: staticMarkup });
                next();
            });

        });


        /*
        conn.query("INSERT INTO Vasts VALUES ?",post , function (err, result) {
            if (err) throw err;
            console.log("table populate created");
        });*/


     });

});


//now for Single route (GET,DELETE,PUT)
var curut2 = router.route('/user/:user_id');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.

remove curut2.all() if you dont want it
------------------------------------------------------*/
curut2.all(function(req,res,next){
    console.log("You need to smth about curut2 Route ? Do it here");
    console.log(req.params);
    next();
});

//get data to update
curut2.get(function(req,res,next){

    console.log('qqqqqqqqqqqqqqqq');
    console.log(req.params);
    console.log('rrrrrrrrrrrrrrrrr');

    var user_id = req.params.id;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM `Vasts` WHERE user_id = ? ",[user_id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            var reactComponentMarkup = ReactComponent(),
                staticMarkup = React.renderToString(reactComponentMarkup);


         //   res.render('edit',{title:"Edit user",data:rows , helloSecondComponentMarkup: staticMarkup});
        });

    });

});

//update data
curut2.put(function(req,res,next){
    var user_id = req.params.user_id;

    //validation
    req.assert('name','Name is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        vast_url:req.body.name,
        position:req.body.email,
        hide_ui:req.body.password
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE `Vasts` set ? WHERE user_id = ? ",[data,user_id], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});

//delete data
curut2.delete(function(req,res,next){

    var user_id = req.params.user_id;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM `Vasts`  WHERE user_id = ? ",[user_id], function(err, rows){

             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }

             res.sendStatus(200);

        });
        //console.log(query.sql);

     });
});

//now we need to apply our router here
app.use('/api', router);

//start Server
var server = app.listen(3000,function(){

   console.log("Listening to port %s",server.address().port);

});
