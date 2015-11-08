module.exports = function(grunt) {
	var globalConfig = {
		source:	'../source',
		css:	'../source/css',

		images_temp:		'images/temp',
		images_public:		'../source/images',
		images_no_sprites:	'images/no-sprites',
		images_sprites:		'images/sprites',

		scripts_src:	'js',
		scripts:		'../source/js',
		scss:			'scss'
	};

	grunt.initConfig({
		globalConfig: globalConfig,

		watch: {
			css: {
				files: ['<%= globalConfig.scss %>/**/*.scss'],
				tasks: ['compass']
			},
			scripts: {
				files: '<%= globalConfig.scripts_src %>/**/*.js',
				tasks: ['concat'/*, 'uglify'*/]
			}
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},
		concat: {
			dist: {
				src: [
					'<%= globalConfig.scripts_src %>/jquery-1.10.2.min.js',
					'<%= globalConfig.scripts_src %>/jquery.easing.min.js',
					'<%= globalConfig.scripts_src %>/jquery.fd.helper.js',
					'<%= globalConfig.scripts_src %>/**/*.js'
				],
				dest: '<%= globalConfig.scripts %>/main.min.js'
			}
		},
		/*uglify: {
			development: {
				options: {
					sourceMap: true
				},
				files: {
					'<%= globalConfig.scripts %>/main.min.js': ['<%= globalConfig.scripts %>/main.min.js']
				}
			}
		},*/

		// Image resizer
		// https://www.npmjs.org/package/grunt-responsive-images
		responsive_images: {
			no_sprites: {
				options: {
					engine: 'gm',
					separator: '',
					sizes: [{
						rename: false,
						width: '50%',
						quality: 85,
						name: 'normal'
					},{
						name: 'retina',
						width: '100%',
						quality: 85
					}]
				},
				files: [{
					expand: true,
					src: ['**/**.{jpg,gif,png}'],
					cwd: '<%= globalConfig.images_no_sprites %>/generate-optimize/original',
					custom_dest: '<%= globalConfig.images_temp %>/no-sprites/{%= name %}/'
				}]
			},

			sprites: {
				options: {
					engine: 'gm',
					separator: '',
					sizes: [{
						rename: false,
						name: 'normal',
						width: '50%',
						quality: 85
					},{
						rename: false,
						name: 'retina',
						width: '100%',
						quality: 85
					}]

				},
				files: [{
					expand: true,
					src: ['**/**.{jpg,gif,png}'],
					cwd: '<%= globalConfig.images_sprites %>/generate-optimize/original/',
					custom_dest: '<%= globalConfig.images_temp %>/sprites/{%= name %}/'
				}]
			}
		},


		// Copy files
		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			no_sprites: {
				files: [
					{
						expand: true,
						src: ['**/**.{jpg,gif,png}'],
						cwd: '<%= globalConfig.images_no_sprites %>/only-optimize/',
						dest: '<%= globalConfig.images_temp %>/no-sprites/'
					}
				]
			},

			sprites: {
				files: [
					{
						expand: true,
						src: ['**/**.{jpg,gif,png}'],
						cwd: '<%= globalConfig.images_sprites %>/only-optimize/',
						dest: '<%= globalConfig.images_temp %>/sprites/'
					}
				]
			}
		},


		// Image optimizer
		// https://www.npmjs.org/package/grunt-image
		image: {
			png_sprites: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					src: ['**/*.png'],
					cwd: '<%= globalConfig.images_temp %>/sprites/',
					dest: '<%= globalConfig.images_public %>/sprites/'
				}]
			},
			png_no_sprites: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					src: ['**/*.png'],
					cwd: '<%= globalConfig.images_temp %>/no-sprites/',
					dest: '<%= globalConfig.images_public %>/no-sprites/'
				}]
			},
			jpg_sprites: {
				options: {
					progressive: true
				},
				files: [{
					expand: true,
					src: ['**/*.{jpg,jpeg}'],
					cwd: '<%= globalConfig.images_temp %>/sprites/',
					dest: '<%= globalConfig.images_public %>/sprites/'
				}]
			},
			jpg_no_sprites: {
				options: {
					progressive: true
				},
				files: [{
					expand: true,
					src: ['**/*.{jpg,jpeg}'],
					cwd: '<%= globalConfig.images_temp %>/no-sprites/',
					dest: '<%= globalConfig.images_public %>/no-sprites/'
				}]
			}
		}

	});

	// load npm tasks
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-image');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// define default task
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('deploy-images', ['responsive_images','copy','image']);
};