const prompts = require('prompts');
//prompts.override(require('yargs').argv);
const fs = require('fs');
const path = require('path');




(async () => {
  const response = await prompts([
    {
      type: 'select',
      name: 'type',
      message: 'Generate What?',
      choices: [
        { title: 'Model', value: 'model' },
        { title: 'Route', value: 'route' },
        { title: 'Handler', value: 'handler' }
      ],
    }
  ]);

  console.log(response.type);
  switch (response.type) {
      case 'model':
          await gen_models()
          break;
      default:
          break;
  }
})();


async function gen_models() {
 
  const response = await prompts([
    {
      type: 'text',
      name: 'model_name',
      message: `Model Name?`
    },
    {
      type: 'multiselect',
      name: 'model_settings',
      message: 'Model Features',
      choices: [
        { title: 'Enable CRUD?', value: 'crud' },
        { title: 'Enable Pagenate v2', value: 'pagenateV2' },
        { title: 'Enable GraphQL', value: 'graphql' }
      ],
    },
    {
      type: 'confirm',
      name: 'model_confirm',
      message: `Proceed to create?`
    },
  ]);
  console.log(response);
  create_model(response);
}

async function gen_route(model) {
    
}

async function gen_handler(model) {
    
}


function create_model(data){
  var temp_model = `
    module.exports= {
      name:'${data.model_name}',
      schema:{
        
      }
    }
  `;
  var model_path = path.join(__dirname,'models',data.model_name+".model.js");
  fs.writeFile(model_path,temp_model,function(err){
    if(err) console.error("Model creation failed");
    console.log("Model -- " +data.model_name + "Created ");
  });
}

/*

const commandLineUsage = require('command-line-usage')
 
const sections = [
  {
    header: 'A typical app',
    content: 'Generates something {italic very} important.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'input',
        typeLabel: '{underline file}',
        description: 'The input to process.'
      },
      {
        name: 'help',
        description: 'Print this usage guide.'
      }
    ]
  }
]
const usage = commandLineUsage(sections)
console.log(usage)
*/