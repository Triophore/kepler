module.exports = {
    payload:{
 
        firstName: 'string:min=1,max=60,required',  // string using string-based notation
     
        lastName: { // string using object notation
     
            '@type': 'string',
            min: 1,
            max: 60,
            required: true
        },
     
        address: {  // address is an object (i.e. joi.object() )
     
            street: 'string:min=1,max=80,required',
            street2: 'string:min=1,max=80',
            city: 'string:min=1,max=40,required',
            state: 'string:min=1,max=40,required',
            postal: 'string:min=1,max=20,required',
     
            '@required': true   // needs the '@' to indicate that "required" is a property
        },
     
        // alternative values (i.e. joi.alternatives().try() )
        favNumberOrWord: [
     
            'string:min=1,max=10',
            'number:min=0,max=100'
        ]
    }
}