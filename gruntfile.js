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
        tasks: ['babel'],
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

    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'app/assets/javascripts/',
            src: ['**/*.js'],
            dest: 'public/javascripts/'
          }
        ]
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
  grunt.loadNpmTasks('grunt-babel');

  // Register tasks
  grunt.registerTask('default', ['generate-assets', 'sync:assets', 'concurrent:target']);
  grunt.registerTask('generate-assets', ['sass', 'sync:assets', 'babel']);
};
