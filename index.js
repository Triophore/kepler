const path = require('path');
const config = require('./config')
var kepler = require('./kepler');
async function start(){
var server = await  kepler.server(config);
    try {
        await server.start();
        kepler.LogSuccess('Server running on '+ server.info.uri);
        
    } catch (error) {
        console.error(error);
    }

}

start();