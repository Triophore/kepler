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
     * Models is the folder that will be used to loaded modules
     * this model file will be used to create models 
     * Mongoose will is used as the ODM(Object Document Models)
     */
    models:path.join(__dirname,"models"),
    validators:path.join(__dirname,"validators"),
    status:{
        title:"Delivery APP Status",
        url:"/get_status"
    },
    explorer:{
      name:"Triophore API"  ,
      desc:"This API is a test",
      api:"/api/docs"
    },
    meta:{
        name:"Shopit API",
        desc:"Description of the API",
        version:"1.0.2"
    }
}