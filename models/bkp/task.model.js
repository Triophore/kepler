module.exports= {
    name:'task',
    schema:{
        task_name :{
            type:String,
            required:true
        },
        task_created:{
            type:Date,
            default: Date.now(),
        },
        task_type:{
            type:String,
            required:true
        },
        task_to_address:{
            type:String
        },
        task_from_address:{
            type:String
        },
        task_to_latlng:{
            type:String
        },
        task_from_latlng:{
            type:String
        },
        task_status:{
            type:String
        },

    }
}