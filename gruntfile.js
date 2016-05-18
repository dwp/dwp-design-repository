module.exports = function (grunt) {
  grunt.initConfig({
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
          dest: 'public/stylesheets/',
          ext: '.css'
        }]
      }
    },

    watch: {
      jsFiles: {
        files: ['app/assets/javascripts/**/*.js'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },

      sassFiles: {
        files: ['app/assets/sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },

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

    concurrent: {
      target: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass', 'concurrent:target']);
};
