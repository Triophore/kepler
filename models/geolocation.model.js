module.exports = {
    name:'geolocation',
    schema:{
        user:{
            type:String
        },
        location:{
            type:Object
        },
        server_time:{
            type:Date,
            default:Date.now()
        }
    }
}