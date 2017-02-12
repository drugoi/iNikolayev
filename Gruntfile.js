const appFolder = 'app/inikolayev/';
const distFolder = 'dist/inikolayev/';
const scripts = [`${appFolder}inikolayev.js`, `${appFolder}bg.js`, `${appFolder}options/options.js`];
const scriptsTemp = ['temp/app/inikolayev/inikolayev.js', 'temp/app/inikolayev/bg.js', 'temp/app/inikolayev/options/options.js'];

module.exports = (grunt) => {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [{
          expand: true,
          cwd: appFolder,
          src: ['options/options.html'],
          dest: distFolder,
        }],
      },
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: appFolder,
          src: ['**/*.{png,jpg,gif}'],
          dest: distFolder,
        }],
      },
    },
    eslint: {
      target: scripts,
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015'],
      },
      dist: {
        files: [{
          expand: true,
          src: scripts,
          dest: 'temp/',
        }],
      },
    },
    uglify: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        files: [{
          'dist/inikolayev/inikolayev.js': scriptsTemp[0],
          'dist/inikolayev/bg.js': scriptsTemp[1],
          'dist/inikolayev/options/options.js': scriptsTemp[2],
        }],
      },
    },
    csso: {
      compress: {
        options: {
          report: 'gzip',
        },
        files: {
          'dist/inikolayev/options/options.css': [`${appFolder}options/options.css`],
        },
      },
    },
    clean: ['temp/**/*', 'dist/**', 'dist/.DS_Store'],
    compress: {
      main: {
        options: {
          archive: 'inikolayev.zip',
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**/*', '_locales/**', 'manifest.json'],
          dest: '',
        }],
      },
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['_locales/**', 'inikolayev/options/options.css'],
          dest: 'dist/',
        }],
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
        },
      },
    },
    watch: {
      files: ['<%= eslint.target %>'],
      tasks: ['eslint'],
    },
  });
  grunt.registerTask('default', ['eslint', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'babel', 'uglify', 'csso', 'htmlmin', 'imagemin', 'compress']);
};
