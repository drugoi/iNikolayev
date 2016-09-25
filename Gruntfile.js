var appFolder = 'app/inikolayev/';
var distFolder = 'dist/inikolayev/';
var scripts = [appFolder + 'inikolayev.js', appFolder + 'bg.js', appFolder + 'options/options.js'];
module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: appFolder,
          src: ['options/options.html'],
          dest: distFolder
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: appFolder,
          src: ['**/*.{png,jpg,gif}'],
          dest: distFolder
        }]
      }
    },
    jshint: {
      files: scripts
    },
    uglify: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: [{
          'dist/inikolayev/inikolayev.js': scripts[0],
          'dist/inikolayev/bg.js': scripts[1],
          'dist/inikolayev/options/options.js': scripts[2]
        }]
      }
    },
    csso: {
      compress: {
        options: {
          report: 'gzip'
        },
        files: {
          'dist/inikolayev/options/options.css': [appFolder + 'options/options.css']
        }
      }
    },
    clean: ['dist/**', 'dist/.DS_Store'],
    compress: {
      main: {
        options: {
          archive: 'inikolayev.zip'
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**/*', '_locales/**', 'manifest.json'],
          dest: ''
        }]
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['_locales/**', 'inikolayev/options/options.css'],
          dest: 'dist/'
        }]
      },
      manifest: {
        src: 'app/manifest.json',
        dest: 'dist/manifest.json',
        options: {
          /*
                    process: function(content, srcpath) {
                      return content.replace('bg.js', 'bg.min.js').replace('inikolayev.js', 'inikolayev.min.js');
                    }
          */
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });
  grunt.registerTask('default', ['jshint', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'uglify', 'csso', 'htmlmin', 'imagemin', 'compress']);
};
