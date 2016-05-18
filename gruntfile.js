module.exports = function (grunt) {
  grunt.initConfig({
    // Compile SASS and move to CSS folder
    sass: {
      dev: {
        options: {
          sourcemap: true,
          outputStyle: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'app/assets/sass',
          src: ['*.scss'],
          dest: 'app/assets/css',
          ext: '.css'
        }]
      }
    },

    // Move all assets into public
    sync: {
      assets: {
        files: [{
          expand: true,
          cwd: 'app/assets/',
          src: ['**/*', '!sass/**'],
          dest: 'public/'
        }],
        updateAndDelete: true
      }
    },

    // Watch fies for changes
    watch: {
      jsFiles: {
        files: ['app/assets/javascripts/**/*.js'],
        tasks: ['sync:assets'],
        options: {
          spawn: false
        }
      },

      sassFiles: {
        files: ['app/assets/sass/**/*.scss'],
        tasks: ['generate-assets'],
        options: {
          spawn: false
        }
      },

      assets: {
        files: ['app/assets/**/*', '!app/assets/sass/**'],
        tasks: ['sync:assets'],
        options: {
          spawn: false
        }
      }
    },

    // Restart server when backend files are edited
    nodemon: {
      dev: {
        script: 'bin/www',
        options: {
          ext: 'js, json',
          ignore: ['node_modules/**', 'app/assets/**', 'public/**'],
          args: grunt.option.flags()
        }
      }
    },

    // Group watch and nodemon into one task
    concurrent: {
      target: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // Load all tasks
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sync');

  // Register tasks
  grunt.registerTask('default', ['sass', 'sync:assets', 'concurrent:target']);
  grunt.registerTask('generate-assets', ['sass', 'sync:assets']);
};
