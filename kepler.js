'use strict';
/**
 * 
 * @ignore
 */
/**
Requireing dotenv to load env files
**/
require('dotenv').config()
/**
 * require all important nodejs modules
 */
/**@ignore */
const Hapi = require('@hapi/hapi');
/**@ignore */
const mongoose = require('mongoose');
/**@ignore */
const Inert = require('@hapi/inert');
/**@ignore */
const Vision = require('@hapi/vision');
/**@ignore */
const Joi = require('joi');
/**@ignore */
const JOI_builder = require( 'joi-json' ).builder();
const HapiSwagger = require('hapi-swagger');
/**@ignore */
const { Table } = require('console-table-printer');
const { graphqlHapi } = require('apollo-server-hapi');
const { composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } =  require('graphql-compose');
const SocketIO = require('socket.io');
const Blipp = require('blipp');
//console.log(process.env.RUNTIME)
/**
 * Using chalk library for colured console out put
 * and aliasing console.log() => log()
 */
/**@ignore */
const chalk = require('chalk');
/**@ignore */
const log = console.log;
const Pack = require('./package');
/**@ignore */
var models = {};
var validator = {};
var schemas = {};
/**@ignore */
module.exports.server = async (config) =>{
  /**
   * Triophore Logo and contact details
   */
console.log("");
console.log("");
console.log("");
log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMNXNWMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMXl',dNMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMX:  .oNMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWK0WXc.  cXMMMMMMMMMMMMMMM
MMMMMMMMMMMMMWO'.dNX0l. :KMMMMMMMMMMMMMM
MMMMMMMMMMMMWx.  .lNMNd. ,OWMMMMMMMMMMMM
MMMMMMMMMMMNd. ',  cOXWx. 'kWMMMMMMMMMMM
MMMMMMMMMMXl. :KXl. .;KWO' .xWMMMMMMMMMM
MMMMMMMMMKc  cXMMNd.  ,OW0; .oNMMMMMMMMM
MMMMMMMM0; .oNNxoXWx:. 'kWK: .lXMMMMMMMM
MMMMMMWO, .dNXl. ;KWWO' .xNXl  :KMMMMMMM
MMMMMWk. .kWKc    ,OWW0; .oNNo. ;0MMMMMM
MMMMNd. 'OW0;      'ckWK: .lXNx. 'OWMMMM
MMMNo. ;0WK:.........,OWXl  :KWk. .xWMMM
MMXc  :KMMNK0000000000XWMNo. ;0WO, .dNMM
MK:  .;lllllllllllllllllxXNx. .cl,  .lXM
Nd,.....................,xNWk;.......,xW
WNNNNNNNNNNNNNNNNNNNNNNNNNWMMWNNNNNNNNNW
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
`);
console.log("");
console.log("");
console.log("------------------------------------------------------------------------------------------------------");
console.log("");
log(chalk.blue("Thank you for installing Kepler"));
console.log("");
//log(chalk.green("By Triophore Technologies [https://triophore.com]"));
console.log("");
//log(chalk.blue("Please visit :: https://triophore.com/products/kepler for more info"));
console.log("------------------------------------------------------------------------------------------------------");



/**
 * check if http host and port are set
 */
    if(!guardConfig(config.server))
    {
        console.error("[ERROR] server config invalid or not found !");
        process.exit(1);
    }
/**
 * Setting the server with host and port
 */
    const server = Hapi.server({
        port: config.server.port,
        host: config.server.host
    });

    await server.register({
        plugin: require('hapi-cors'),
    });

    await server.register(require('susie'));

    //await server.register({ plugin: require('blipp'), options: { showAuth: true } });
/*
    await server.register({
        plugin: require('hapijs-status-monitor'),
        options: {
          title: 'Status Monitor',
          routeConfig: {
            auth: false
          }
        }
    });
*/

    if(guardConfig(config.logging))
    {
        
        if(guardConfig(config.logging.log))
        {
            await server.register({
                plugin: require('laabr'),
                options:  {
                    formats: {
                      onPostStart: ':time :start :level :message',
                      log: false
                    },
                    tokens: { start: () => '[start]' },
                    indent: 0,
                    colored: true
                  },
              });
        }
    }

    if(guardConfig(config.disinfect))
    {
    
          await  server.register({
                plugin: require('disinfect'),
                options: {
                    disinfectQuery: config.disinfect.query || false,
                    disinfectParams: config.disinfect.params || false,
                    disinfectPayload: config.disinfect.payload || false
                }
            })
        
    }
/*
await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema: myGraphQLSchema,
      },
      route: {
        cors: true,
      },
    },
  });*/

  await server.register({ plugin: Blipp, options: { showAuth: true } });

/**
 * check the routes dir
 */
    if(!guardConfig(config.routes))
    {
        console.error("[ERROR] route Path invalid or not found !");
        process.exit(1);
    }
/**
 * get all routes from the routes folder
 */    
    var routes = require('require-all')({
        dirname     :  config.routes,
        filter      :  /(.+route)\.js$/,
        excludeDirs :  /^\.(git|svn)$/,
        recursive   : true
    });

/**
 * get all validators from the routes folder
 */    
 var validators = require('require-all')({
    dirname     :  config.validators,
    filter      :  /(.+validator)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});
//console.log(validators)
/**
 * check if models foder exist
 */
    if(guardConfig(config.models))
    {
 
        //console.log(models_loaded)
    }
/**
 * check if models folder exist and mongo db config values exist
 */
    if(guardConfig(config.mongodb) && guardConfig(config.models))
    {
       
        /**
         * connect to mongo db bu URL
         */
        await mongoose.connect(config.mongodb, {useNewUrlParser: true , useUnifiedTopology: true});
        /**
         * get the mongodb connection and db instance
         */
        const db = mongoose.connection;
        /**
         * get info, check if we are connected to mongoDB
         */
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            LogSuccess("DB Connected")
        });

               /**
         * load all models from the models folder
         */
                var models_loaded = require('require-all')({
                    dirname     :  config.models,
                    filter      :  /(.+model)\.js$/,
                    excludeDirs :  /^\.(git|svn)$/,
                    recursive   : false
                });
        //const Joigoose = require("joigoose")(mongoose);
        /**
         * call the pasre_model to parse the models into usable mongoose model
         */
        var parsed_models = await parse_model(models_loaded);
        /**
         * Temp models object
         */
      
        /**
         * loop ing through all parsed models and creating mongoose models and registering
         */
        const model_table = new Table({
            columns: [
                {
                name : 'Model',
                text: 'Model',
                color: 'green'
                }
            ]
        });
        
        for(var m_in in parsed_models){
            /**
             * get the name of the model
             */
            var name = parsed_models[m_in].name
            LogInfo("Loading Model -> "+name);
            /**
             * get the schema of the model
             */
            /**@ignore */
            //var enjoi_schema = Enjoi.schema(parsed_models[m_in].schema);
            //validator[name] = enjoi_schema;
            var schema_temp = parsed_models[m_in].schema;
            if(guardConfig(schema_temp)){
            var schema = new mongoose.Schema(schema_temp) //Joigoose.convert(enjoi_schema)
            if(guardConfig(parsed_models[m_in].plugins)){
                if(guardConfig(parsed_models[m_in].plugins.length)){
                    if(guardConfig(parsed_models[m_in].plugins.length) > 0){
                        //schema.plugin(require())
                        for(var plugin in parsed_models[m_in].plugins){
                            schema.plugin(require(parsed_models[m_in].plugins[plugin])); 
                        }
                    }
                } 
            }
            /**
             * register the model with mongoose and get the copy into temp `models` object
             */
            /**@ignore */
            models[name] = mongoose.model(name, schema);
            model_table.addRow({  Model:name });
			
            }
            
           
        }

        console.log("------------------------------------------------------------------------------------------------------");
        log(chalk.red("Models Registered"));
        console.log("------------------------------------------------------------------------------------------------------");
        model_table.printTable();
        console.log("------------------------------------------------------------------------------------------------------");

        //console.log(models)
        for(var m_in in parsed_models){
			/**
			* Generate exposed schema 
			**/
			
			
             /**
             * check if the model has crud functionalalities 
             */
            if(guardConfig(parsed_models[m_in].crud)){
                var name = parsed_models[m_in].name
                LogInfo("Creating CRUD for  Model -> "+ name);
                /**
                 * set the default crud base URL
                 */
                var crud_url = 'crud';
                /**
                 * check if the crud url id defined 
                 * if defined , use this value as the base crud URL
                 * or use the default CRUD url
                 */
                try{
                if(config.crud != undefined)
                {   if(guardConfig(config.crud.url)){
                    crud_url = config.crud.url;
                    
                    } 
                }
                }
                catch(err){
                    LogError(err);
                }

                server.crud_url = crud_url;
                /**
                 * GET ALL Models and GET Specific models data by id
                 */
                //+'{id?}'
/*
                var url_path = '/'+crud_url+'/'+name;
                server.route({
                    method: 'GET',
                    path: url_path,
                    handler: async (request, h,url_path) => {
                        //console.log(request.path);
                        
                        var m_name =  request.path.replace("/" + server.crud_url + "/","");

                        var result =  await models[m_name].find({});

                        return result;
                    }
                });

                var by_id_path = '/'+crud_url+'/'+name+'/{id}';
                server.route({
                    method: 'GET',
                    path: by_id_path,
                    handler: async (request, h,url_path) => {
                        //console.log(request.path);
                        
                        var m_name =  request.path.replace("/" + server.crud_url + "/","");

                        var result =  await models[m_name].find({});

                        return result;
                    }
                });
 */            

               

                /*
                await server.route({
                    method: 'GET',
                    path: '/'+crud_url+'/'+name+'/count/',
                    handler: async function (request, h) {
                      
                            var result =  await models[name].count();
                            return result;

                    }
                });
                
                await server.route({
                    method: 'POST',
                    path: '/'+crud_url+'/'+name+'/',
                    options: {
                        validate: {
                            payload: validator[name],
                            failAction: async (request, h, err) => {
                               
                                if (process.env.NODE_ENV === 'production') {
                                  // In prod, log a limited error message and throw the default Bad Request error.
                                  console.error('ValidationError:', err.message);
                                  //throw Boom.badRequest(`Invalid request payload input`);
                                } else {
                                  // During development, log and respond with the full error.
                                  console.error(err);
                                  //throw err;
                                }
                                throw err;
                                //console.error('ValidationError:', err.message);
                            }
                        }
                    },
                    handler: async function (request, h) {
                        var res ={};
                        try{
                            var res= await new models[name](request.payload);
                            //res.firstName = "test NAme from joi";
                        
                            res.save();
                        }catch(err){
                            return err;
                        }
                       
                       return res;
                    }
                });
                */
            }






            


        }
        if(guardConfig(config.auth)){
            var auth_policies = require('require-all')({
                dirname     :  config.auth,
                filter      :  /(.+auth)\.js$/,
                excludeDirs :  /^\.(git|svn)$/,
                recursive   : true
            });
            for(var auth_index in auth_policies){
                auth_policies[auth_index](server,config,models)
            }
        }


        await server.register({
            plugin: {
                name: 'Kepler-Model-Plugin',
                version: '1.0.0',
                register: async function (server, options) {
            
                    // Create a route for example
            
                    /*
                    server.route({
                        method: 'GET',
                        path: '/test',
                        handler: function (request, h) {
            
                            const name = options.name;
                            return `Hello ${name}`;
                        }
                    });
                    */

                    //console.log(options)
                    /**
                     * Retrieves a models by name.
                     * @async
                     * @method
                     * @param {String} modelname - Model Name
                     * @returns {ModelObject} Model object
                     * 
                     */
                    const getModel = async function (modelname) {
    
                        return options.models[modelname];
                    };
                    /**
                     * Retrieves all .
                     * @async
                     * @method
                     * @returns {ModelObjects} Model objects
                     * 
                     */
                    const getAllModels = async function (){
                        return options.models;
                    }
                    
                   await server.decorate('toolkit', 'getModel', getModel);
                   await server.decorate('toolkit', 'getAllModels', getAllModels);
                }
            },
            options: {
               models
            }
        });

        await server.register({
            plugin: {
                name: 'Kepler-Config-Injection-Plugin',
                version: '1.0.0',
                register: async function (server, options) {
                   await server.decorate('toolkit', 'injectedConfig', options.config);
                }
            },
            options: {
               config
            }
        });

    }



    
   
    /*
    var user = new models['user']({
        first_name:"test name"
    });

    user.save();
    */

    

    var parsed_route =await parse_route(routes,validators);
    //console.log(parsed_route);
    for(var r in parsed_route){
        server.route(parsed_route[r]);
        //console.log(parsed_route[r]);
    }

    const server_route_table = new Table({columns: [
        {
        name : 'Path',
        color: 'green'
        },
        {
        name : 'Method',
        color: 'green'
        },
        {
        name : 'Auth',
        color: 'green'
        }
    ]});
   
    for(var route in server.table()){
        var route_temp = server.table()[route];
        server_route_table.addRow(
            {
                Path : route_temp.path , Method : route_temp.method , Auth : route_temp.settings.auth ? undefined : "none" 
            }
        ); 
    }

    

    console.log("------------------------------------------------------------------------------------------------------");
    log(chalk.red("Routes Registered"));
    console.log("------------------------------------------------------------------------------------------------------");
    server_route_table.printTable();
    console.log("------------------------------------------------------------------------------------------------------");

    
    if(guardConfig(config.explorer)){
        if (process.env.NODE_ENV === 'development') {
        server.route({
            method: 'GET',
            path: config.explorer.api || "/docs",
            handler: async(request, h) => {
            const server_table = server.table();
            var res = [];

               server_table.forEach(function (name){
                   res.push({
                      method:name.method,
                      path:name.path 
                   })
               });
               var doc_name = config.meta.name || 'API docs';
               var doc_desc = config.meta.desc || 'No description';
               var doc_version = config.meta.version || '1.0.0';
                return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <title>API DOCS</title>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
                  <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css">
                  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
                <script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.js"></script>
                <!--script src="extensions/export/bootstrap-table-export.js"></script-->
                </head>
                <body>
                
                <div class="jumbotron text-center">
                  <h2>` +doc_name + `</h2>
                  <p>` +doc_desc+ `</p> 
                  <strong> Version:` +doc_version+ `</strong> 
                </div>
                  
                <div class="container">                
                <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#home">REST API</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#menu1">SocketIO</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#menu2">Others</a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div id="home" class="container tab-pane active"><br>
                        <h2>API List</h2>
                        <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>  
                        <table id="table" class="table" style="width:100%;" data-show-columns="true" data-show-export="true"></table>
                        </div>
                        <div id="menu1" class="container tab-pane fade"><br>
                        <h3>Menu 1</h3>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div id="menu2" class="container tab-pane fade"><br>
                        <h3>Menu 2</h3>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                        </div>
                    </div>
                </div>
                <script>
                var api_table = `+JSON.stringify(res)+` ;
                console.log(api_table);
                    $(document).ready(function(){
                        api_table.forEach(function(val,i){
                           // $('#api_table').append('<tr><td>'+val.path+'</td><td>'+val.method+'</td></tr>');
                        });

                        $('#table').bootstrapTable({
                            pagination: true,
                            search: true,
                            exportDataType: $(this).val(),
                            exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
                            columns: [{
                              field: 'path',
                              title: 'Path'
                            }, {
                              field: 'method',
                              title: 'Method'
                            },],
                            data:  api_table
                          })
                    });
                </script>
                </body>
                </html>
                
                `
                /*
                {
                  //  data:JSON.stringify(server.table())
                    routes:res
                }*/
                //
            }
        });
     }
    }



    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: Pack.version,
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

   

     if(guardConfig(config.socket_io)){
        const options = { 
            serveClient: false,
            cookie: false,
            log: true,
            origins: ["*"],
            cors: {
                origin: "*",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                preflightContinue: false,
                optionsSuccessStatus: 204
            }
        };
        const io = require('socket.io')(server.listener,config.socket_io.options || options)

        if(guardConfig(config.socket_io.redis)){
            //io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
        }

            var sockets_loaded = require('require-all')({
                    dirname     :  config.socket_io.path,
                    filter      :  /(.+socket)\.js$/,
                    excludeDirs :  /^\.(git|svn)$/,
                    recursive   : false,
            });

            for(var socket_index in sockets_loaded){
                sockets_loaded[socket_index](io,models)
            }
       

        io.on("connection", socket => {
           

                
        });

        io.on("connection", socket => {
           

                
        });

        await server.register({
            plugin: {
                name: 'Kepler-Socket.io-Plugin',
                version: '1.0.0',
                register: async function (server, options) {                   
                   await server.decorate('toolkit', 'socket_io',options.io);
                }
            },
            options: {
               io
            }
        });
    }



    //await server.start();
    //console.log('Server running on %s', server.info.uri);
    //LogSuccess('Server running on ' + server.info.uri);
    return server;
}
/** 
 * Utility function for general purpose use -----------------------------------
 */


/**
 * This function is used to check if the config values are not null not empty or undefined
 */
/**@ignore */
function guardConfig(val){
    if(val == "" || val == undefined || val == null){
        return false;
    }else{
        return true;
    }
}

/** 
 * Log Error 
 */
/**@ignore */
function LogError(data){
    log(chalk.red.bold('[ERROR]:-'+data));
}

/** 
 * Log Success
 */
/**@ignore */
function LogSuccess(data){
    log(chalk.green.bold('[ALERT]:-'+data));
}

/** 
 * Log Info
 */
/**@ignore */
function LogInfo(data){
    log(chalk.yellow.bold('[INFO]:-'+data));
}

module.exports.LogError = LogError;
module.exports.LogSuccess = LogSuccess;
module.exports.LogInfo = LogInfo;




/** 
 * Utility functions end ------------------------------------------------------
 */


/**
 * Parse models get travese through json 
 */
/**@ignore */
async function parse_model(_models){
    var models_parsed = [];
    for (var key in _models){  
               
        if(_models[key].hasOwnProperty("name") && _models[key].hasOwnProperty("schema") ) {
            models_parsed.push(_models[key])
        }
        /*
        else{
            var d = get_sub_model(_models[key]);
            for(var r in d){
                models_parsed.push(d[r]);
            } 
        }*/
    }
    return models_parsed;
}
/**
 * get all relevent models and removing sub directory values
 */
/**@ignore */
function get_sub_model(routes){
    var sub_r = [];
    for(var key in routes){   
        if(routes[key].hasOwnProperty("name") && routes[key].hasOwnProperty("schema")) {
            sub_r.push(routes[key])

        }else{
            get_sub_model(routes[key])
        }
    }
    return sub_r
}
/**
 * Parse routes get travese through json 
 */
/**@ignore */
function parse_route(routes,validators){
   // console.log(routes)
    var route_parsed = [];

    for(var key in routes){   
       // console.log(typeof routes[key])   
        if(routes[key].hasOwnProperty("method") && routes[key].hasOwnProperty("path")) { //&& routes[key].hasOwnProperty("handler") [ERROR]:-RangeError: Maximum call stack size exceeded
            if(routes[key].hasOwnProperty("options")){
                if(routes[key].options.hasOwnProperty("validate")){
                   
                    var t_validator = routes[key].options.validate;

                    if(validators[t_validator]){
                    routes[key].options.validate = JOI_builder.build(validators[t_validator])
                    }
                   
                }
            }
            route_parsed.push(routes[key])
 
        }else{
            
            var d = get_sub_routes(routes[key],validators);
            if(d == null) break;
            for(var r in d){
                route_parsed.push(d[r]);
            } 
        }
    }
    //console.log(route_parsed)
    return route_parsed;
}
/**
 * get all relevent models and removing sub directory values
 */
/**@ignore */
function get_sub_routes(routes,validators){
    var sub_r = [];
    for(var key in routes){   
        if(routes[key].hasOwnProperty("method") && routes[key].hasOwnProperty("path")) {
            if(routes[key].hasOwnProperty("options")){
                if(routes[key].options.hasOwnProperty("validate")){
                    var t_validator = routes[key].options.validate;
                    if(validators[t_validator]){
                    routes[key].options.validate = JOI_builder.build(validators[t_validator])
                    }
                   
                }
            }
            sub_r.push(routes[key])
        }else{
            get_sub_routes(routes[key],validators)
        }
    }
    return sub_r
}

process.on('unhandledRejection', (err) => {

    LogError(err);
    process.exit(1);
});

