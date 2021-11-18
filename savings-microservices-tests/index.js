const newman = require('newman');

const yargs = require('yargs');

const argv = yargs
    .option('lab', {
        demandOption: true,
        description: 'Run ingress test',
        choices: ['savings', 'banking', 'loans'],
    })
    .option('run', {
        description: 'Run tests',
        default: false,
        type: 'boolean',
    })
    .option('ingress', {
        description: 'Add service tests that run via ingress',
        default: false,
        type: 'boolean',
    })
    .option('ibauth', {
        description: 'Add ibauth end to end tests',
        default: false,
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;


console.log("--lab="+ argv.lab)
console.log("--ibauth="+ argv.ibauth)

const outputReporters = ['cli', 'htmlextra'];

function addTests(envs,collections){
  envs.forEach(function (e) {
    collections.forEach(function (c) {
      runs.push({
        collection: 'consumer-onboarding/testing/services/common/' + c + '.postman_collection.json',
        environment: 'consumer-onboarding/testing/environments/' + e + '.postman_environment.json',
        output: './outputs/' + c.replace("/","_") + "." + e.replace("/","_") + '.html'
      })
    })
  });
}

const runs = [];

if (argv.ibauth) {
  let envs = [
   "SIT_Child_Eligibility/sit02-dhp-secure-b.digital.lloydsbank.co.uk_Child_Eligibility",  
     "SIT_Parent_Eligibility/sit02-dhp-secure-b.digital.lloydsbank.co.uk",
  ];
  let collections = [
    "Hatch/Hatch_Phase2_Child_Eligibility",
  "Hatch/Hatch_Phase1"
  ];
  addTests(envs,collections);
}

//   let envs = [
// "SIT/sit02-dbp-secure-b.digital.lloydsbank.co.uk_Child_Eligibility"
//   ];
//   let collections = [
//     "Hatch/Hatch_Phase2_Child_Eligibility"
//   ];

function runAsync(run) {
  return new Promise(function (resolve, reject) {
    newman.run({
      collection: run.collection,
      environment: run.environment,
      globals: `consumer-onboarding/testing/environments/${argv.lab}-co-stateless.postman_globals.json`,
      color: "on",
      delayRequest: 1000,
      reporters: outputReporters,
      ignoreRedirects:true,
      //bail:true,
      reporter: {
        htmlextra: {
          export: run.output
        }
      },
      insecure: true
    }, (err) => {
      if (err) { reject(err); }
      else {
        resolve(`Completed run for Collection (${run.collection}) using Environment (${run.environment}) and output generated in file ${run.output}`)
      }
    });
  });
}

async function runAll() {
  for (var i = 0; i < runs.length; i++) {
    console.log("-------start------" + i);
    let result = await runAsync(runs[i]);
    console.log(result);
    console.log("-------end--------" + i);
  }
}


runs.forEach(e => console.log(e.collection.split("/").pop() ,"->",e.environment.split("/").pop()));


if(argv.run){
runAll().catch(e => { console.log("!!!!!!", e); });
}
