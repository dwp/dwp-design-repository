const path = require('path');

const gruntfile = path.join(__dirname, 'gruntfile.js');

require(path.join(__dirname, '/node_modules/grunt/lib/grunt.js')).cli({
  gruntfile
});
