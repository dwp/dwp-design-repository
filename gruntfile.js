module.exports = function (grunt) {
  // Project configuration.
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
    }
  });

  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass']);
};
