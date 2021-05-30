const Bundler = require('parcel-bundler');
const Path = require('path');
var fs = require("fs-extra");
const getSizeCallback = require('get-folder-size');

// Single entrypoint file location:
//const entryFiles = Path.join(__dirname, './index.js');
// OR: Multiple files with globbing (can also be .js)
// const entryFiles = './src/*.js';
// OR: Multiple files in an array
const entryFiles = [Path.join(__dirname, './index.js'), Path.join(__dirname, './kepler.js')];

var copydir = require('copy-dir-progress');
// Bundler options
const options = {
  outDir: './dist', // The out directory to put the build files in, defaults to dist
  outFile: 'index.js', // The name of the outputFile
  publicUrl: '/', // The url to serve on, defaults to '/'
  watch: false, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: true, // Enabled or disables caching, defaults to true
  cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
  contentHash: false, // Disable content hash from being included on the filename
  global: 'moduleName', // Expose modules as UMD under this name, disabled by default
  minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  target: 'node', // Browser/node/electron, defaults to browser
  bundleNodeModules: false, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
  logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors, 0 = log nothing
  hmr: true, // Enable or disable HMR while watching
  hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  hmrHostname: '', // A hostname for hot module reload, default to ''
  detailedReport: false, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  autoInstall: true, // Enable or disable auto install of missing dependencies found during bundling
};

(async function() {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild

  if (fs.existsSync(Path.join(__dirname, options.outDir))) {
    var rmdir = require('rmdir');
    var path = Path.join(__dirname, options.outDir);

    rmdir(path , function (err, dirs, files) {
      console.log(dirs);
      console.log(files);
      console.log('Dist folder are removed');
    });
  }
  const bundle = await bundler.bundle();


// include fs-extra package

 
//copyDir(Path.join(__dirname, 'core'),Path.join(__dirname, options.outDir,'core'))
//await copyWithProgress(Path.join(__dirname, 'models'),Path.join(__dirname, options.outDir))
 
// copy source folder to destination
console.log("Moving Core files.. to build directory");
copydir.sync(Path.join(__dirname, 'core'),Path.join(__dirname, options.outDir,'core'), {
  utimes: true,  // keep add time and modify time
  mode: true,    // keep file mode
  cover: true    // cover file when exists, default is true
});


console.log("Moving Model files.. to build directory");
copydir.sync(Path.join(__dirname, 'models'),Path.join(__dirname, options.outDir,'models'), {
  utimes: true,  // keep add time and modify time
  mode: true,    // keep file mode
  cover: true    // cover file when exists, default is true
});


console.log("Moving Route files.. to build directory");
copydir.sync(Path.join(__dirname, 'routes'),Path.join(__dirname, options.outDir,'routes'), {
  utimes: true,  // keep add time and modify time
  mode: true,    // keep file mode
  cover: true    // cover file when exists, default is true
});

var get_package = require('./package.json');

delete get_package.devDependencies;

console.log("Prepping package.json")
fs.writeFile(Path.join(__dirname, options.outDir,'package.json'), JSON.stringify(get_package), function(err) {
    if (err) throw err;
    console.log('package.json complete');
    }
);

console.log("Copy config file")
fs.copyFile(Path.join(__dirname,'config.js'),Path.join(__dirname, options.outDir,'config.js'),function(err) {
    if (err) throw err;
    console.log('Copy config complete');
    }
);


})();

function copyDir(from,to){
    fs.copy(from, to, function (err) {
        if (err){
            console.log('An error occured while copying the folder.')
            return console.error(err)
        }
        console.log('Copy completed!')
    });
}

