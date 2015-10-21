module.exports = function(grunt) {

  // Project Configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'source/js/*.js']
    },

    sass: {
      dist: {
        files: {
          'public/css/main.css' : 'source/sass/main.scss'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src:  ['source/js/audioController.js', 'source/js/databaseAccess.js', 'source/js/main.js'],
        dest: 'public/js/<%= pkg.name %>_all.min.js'
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['source/js/*.js'],
        dest: 'public/js/<%= pkg.name %>_all.min.js',
      },
    },

    copy: {
      html: {
        expand: true,
        cwd: 'source/',
        src: '*.html',
        dest: 'public/'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'public/index.html': 'source/index.html',
          // 'destination2': 'source2'
        }
      },
      // dev: {                                       // Another target
      //   files: {
      //     'public/index.html': 'source/index.html'
      //   }
      // }
    },

    

    // nodemon: {
    //   dev: {
    //     options: {
    //       cwd: __dirname+'/'
    //     },
    //     script: 'server.js'
    //   }
    // },

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // grunt.registerTask('default',['jshint','uglify','concat','htmlmin','sass']);
  // grunt.registerTask('dev',['jshint','uglify','concat','htmlmin','watch']);

  grunt.registerTask('build', function(arg) {
    arg = arg || 'dev';
    if(arg==='dist') {
      // uglify
      grunt.task.run(['jshint','uglify','htmlmin','watch']);
    } else if (arg==='dev') {
      // Skip uglify, and do concat.
      grunt.task.run(['jshint','concat','copy','watch']);
    } else {
      console.log("HINT:  Use the form 'grunt build:dev' or 'grunt build:dist'.");
    }
  });

};
