module.exports = function(grunt) {

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint'); //npm install grunt-contrib-jshint --save-dev
  grunt.loadNpmTasks('grunt-simple-mocha');   //npm install grunt-simple-mocha --save-dev 
                                              //To have the option dest: https://github.com/steveworkman/grunt-simple-mocha
  // Project configuration
  grunt.initConfig({
    jshint: {
      src: ['./src/**/*.js' ],
      options: {
      node: true,
        // Reporter options control output to file
        reporter: 'checkstyle',       
        reporterOutput: 'checkstyle.xml',
        ignores: [ 
          'node_modules/**/*.js',
          'src/webapp/public/vendor/**/*.js',
        ],
        force: true
    }
},
simplemocha: {
  options: {
    globals: ['assert'],
    reporter: 'xunit'
  },
  all: { 
    src: 'tests/**/*.js',
    dest: 'reports/tests-results.xml'
  }
}
});
  
  grunt.registerTask('jenkins', ['jshint', 'simplemocha']);
};