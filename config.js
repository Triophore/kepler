const path = require('path')
const Pack = require('./package');
module.exports = {
   /**
    * Server configuration
    * port needs to be a number
    * host needs to be string either hostname or IP address
    */
    server:{
        host:"localhost",
        port:4500,
    },
    /**
     * Mongo DB url taht will be \
     * used by the ODM (Mongoose)
     * 
     */
    mongodb:"mongodb+srv://admin:admin@cluster0.evips.mongodb.net/EazyERP?retryWrites=true&w=majority",
    /**
     * Routes folder that will be used to load all route related files
     * Route file must be of the form file.route.js
     */
    routes:path.join(__dirname,"routes"),
    /**
     * Models is the folder that will be used to load modules
     * this model file will be used to create models 
     * Mongoose will is used as the ODM(Object Document Models)
     */
    models:path.join(__dirname,"models"),
     /**
     * Validators is the folder that will be used to load Validation
     * this should be written JSON , will be converted into JOI 
     * The Validators will be used in corresponding routes
     */
    auth:path.join(__dirname,"auth"),
    /**
     * Status Monitor for getting server status and health
     */
    validators:path.join(__dirname,"validators"),
    /**
     * Status Monitor for getting server status and health
     */
    status:{
        title:"Delivery APP Status",
        url:"/get_status"
    },
    /**
     * API Explorer path for visusalizing REST API
     * Note this will be omitted in production
     */
    explorer:{
      name:"Triophore API"  ,
      desc:"This API is a test",
      api:"/api/docs"
    },
    /**
     * Logging features and options
     */
    logging:{
        log:true,
        options:{}
    },
    /**
     * Sanitize the input 
     */
    disinfect:{
        query:true,
        params:true,
        payload:true,
    },
    /**
    This is socket io settings,
    This key sets the socket.io server to start, with default options
    The socket.io versio is v3,
    also comes with socket io adapter, redis based
    */
    socket_io:{
        options:{
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
        },
        path:path.join(__dirname,"sockets"),
        redis:{

        }
    },
    /**
     * Meta data about the kepler project
     */
    meta:{
        name:"Shopit API",
        desc:"Description of the API",
        version:"1.0.2"
    }
}