'use strict';
/**
Requireing dotenv to load env files
**/
require('dotenv').config()
/**
 * require all important nodejs modules
 */
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Joi = require('@hapi/joi');
const Enjoi = require('enjoi');
const { Table } = require('console-table-printer');
/**
 * Using chalk library for colured console out put
 * and aliasing console.log() => log()
 */
const chalk = require('chalk');
const log = console.log;
var models = {};
var validator = {};
var schemas = {};
module.exports = async (config) =>{
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
log(chalk.green("By Triophore Technologies [https://triophore.com]"));
console.log("");
log(chalk.blue("Please visit :: https://triophore.com/products/kepler for more info"));
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

    //await server.register({ plugin: require('blipp'), options: { showAuth: true } });

    await server.register({
        plugin: require('hapijs-status-monitor'),
        options: {
          title: 'Status Monitor',
          routeConfig: {
            auth: false
          }
        }
    });

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
 * check if models foder exist
 */
    if(guardConfig(config.models))
    {
        /**
         * load all models from the models folder
         */
        var models_loaded = require('require-all')({
            dirname     :  config.models,
            filter      :  /(.+model)\.js$/,
            excludeDirs :  /^\.(git|svn)$/,
            recursive   : true
        });
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
        //const Joigoose = require("joigoose")(mongoose);
        /**
         * call the pasre_model to parse the models into usable mongoose model
         */
        var parsed_models = parse_model(models_loaded);
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
            //var enjoi_schema = Enjoi.schema(parsed_models[m_in].schema);
            //validator[name] = enjoi_schema;
            var schema_temp = parsed_models[m_in].schema;
            if(guardConfig(schema_temp)){
            var schema = new mongoose.Schema(schema_temp) //Joigoose.convert(enjoi_schema)
            /**
             * register the model with mongoose and get the copy into temp `models` object
             */
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
                        if(guardConfig(request.params.id)){
                            var result =  await models[name].find({_id:request.params.id});
                            return result;
                        }else{
                          .find({})
                        }
                        return {};*/

                        //var result =  await models[name];
                /*    */
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
    
                    const getModel = async function (modelname) {
    
                        return options.models[modelname];
                    };
    
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

    }



    
   
    /*
    var user = new models['user']({
        first_name:"test name"
    });

    user.save();
    */

    

    var parsed_route = parse_route(routes);
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

    
  





    await server.start();
    //console.log('Server running on %s', server.info.uri);
    LogSuccess('Server running on ' + server.info.uri);
}
/** 
 * Utility function for general purpose use -----------------------------------
 */


/**
 * This function is used to check if the config values are not null not empty or undefined
 */
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
function LogError(data){
    log(chalk.red.bold('[ERROR]:-'+data));
}

/** 
 * Log Success
 */
function LogSuccess(data){
    log(chalk.green.bold('[ALERT]:-'+data));
}

/** 
 * Log Info
 */
function LogInfo(data){
    log(chalk.yellow.bold('[INFO]:-'+data));
}






/** 
 * Utility functions end ------------------------------------------------------
 */


/**
 * Parse models get travese through json 
 */
function parse_model(routes){
    var route_parsed = [];
    for(var key in routes){       
        if(routes[key].hasOwnProperty("name") && routes[key].hasOwnProperty("schema") ) {
            route_parsed.push(routes[key])
        }else{
            var d = get_sub_model(routes[key]);
            for(var r in d){
                route_parsed.push(d[r]);
            } 
        }
    }
    return route_parsed;
}
/**
 * get all relevent models and removing sub directory values
 */
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
function parse_route(routes){
    var route_parsed = [];
    for(var key in routes){       
        if(routes[key].hasOwnProperty("method") && routes[key].hasOwnProperty("path") && routes[key].hasOwnProperty("handler")) {
            route_parsed.push(routes[key])
        }else{
            var d = get_sub_routes(routes[key]);
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
function get_sub_routes(routes){
    var sub_r = [];
    for(var key in routes){   
        if(routes[key].hasOwnProperty("method") && routes[key].hasOwnProperty("path") && routes[key].hasOwnProperty("handler")) {
            sub_r.push(routes[key])
        }else{
            get_sub_routes(routes[key])
        }
    }
    return sub_r
}

process.on('unhandledRejection', (err) => {

    LogError(err);
    process.exit(1);
});

