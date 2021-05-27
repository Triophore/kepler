module.exports = async function(server,config,models){
     const validate = async function (decoded, request, h) {
 
        // do your checks to see if the person is valid
        if (!people[decoded.id]) {
        return { isValid: false };
        }
        else {
        return { isValid: true };
        }
    };
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt',
    { key: 'NeverShareYourSecret', // Never Share your secret key
        validate  // validate function defined above
    });
    
    server.auth.default('jwt');

   
}