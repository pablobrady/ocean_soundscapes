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
        src:  ['source/js/PLBAudioController.js', 'source/js/OceanInterfaceManager.js', 'source/js/OceanLocationElementCreator.js', 'source/js/OceanDatabaseManager.js', 'source/js/main.js'],
        dest: 'public/js/<%= pkg.name %>_all.min.js'
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      html: {
        files: 'source/*.html',
        tasks: ['copy']
      },
      script: {
        files: 'source/js/*.js',
        tasks: ['concat','copy']
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


    mocha: {
      all: {
        src: ['tests/testrunner.html'],
      },
      options: {
        run: true
      }
    }


  });

  // Load grunt mocha task
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha');


  grunt.registerTask('dev', function(arg) {
    console.log("ABORTED:  Use the form 'grunt build:dev' or 'grunt build:dist'.");
  });

  grunt.registerTask('build', function(arg) {
    arg = arg || 'dev';
    if(arg==='dist') {
      // uglify
      grunt.task.run(['jshint','uglify','htmlmin','watch']);
    } else if (arg==='dev') {
      // Skip uglify, and do concat.
      grunt.task.run(['jshint','concat','copy','watch']);
    } else {
      console.log("ABORTED:  Use the form 'grunt build:dev' or 'grunt build:dist'.");
    }
  });


  grunt.registerTask('default', ['mocha']);


};


