module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt',
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/**/*.js']
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'check-and-alert.js', 'reset-config.js', 'server.js', 'test-email.js',
        'js/**/*.js', 'test/**/*.js', 'app/**/*.js']
    },

    watch: {
      js: {
        options: {
          spawn: false,
        },
        files: '**/*.js',
        tasks: ['jshint', 'default']
      }
    }
  });
 
  grunt.registerTask('default', 'mochaTest');
};
