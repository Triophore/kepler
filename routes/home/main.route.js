const Joi = require('joi');
module.exports = {
  method: 'PUT',
  path: '/v1/store/{id?}',
  options: {
    handler: (request, h) => {
      return h.response('success');
    },
    description: 'Update sum',
    notes: ['Update a sum in our data store'],
    plugins: {
      'hapi-swagger': {
        payloadType: 'json'
      }
    },
    tags: ['api'],
    validate: "new.validator"
  }
}