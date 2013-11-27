module.exports = (grunt) ->
	
  # task configurations
  # initializing task configuration
	grunt.initConfig
    # meta data
		pkg: grunt.file.readJSON("package.json")
		banner:  "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " 


		dev: 
			files:
				css: ["public/css/global.css", "public/css/main.css"]
				
				js: "public/js/vendor/require.js"
				
				requireConfig: "public/js/devCommon"
				
		build: 
			files:
				css: ["css/main.min.css"]
				
				js: "js/vendor/require.js"
				
				requireConfig: "js/common"
				
	#start static node server files
		execute:
			target:
				src: ['server.js']

    # files that our tasks will use
		files:
			html:
        		src: "test.html"
				

      		sass:
        		src: ["public/css/main.css"]

      		js:
        		vendor: ["public/js/vendor/js/jquery.js","public/js/vendor/js/backbone.js","public/js/vendor/js/underscore.js","public/js/vendor/modernizr.js","public/js/vendor/require.js","public/js/vendor/text.js"]

    # task configuration

		copy:
			html:
        		files:
          			"generated/": "routes/**"

		clean:
			workspaces: "generated/"
			
			
		concat: 
			css:
				src: ["public/css/global.css", "public/css/main.css"]
				dest: "generated/css/main.min.css"
				
		cssmin: 
			combine:
				options: "<%= banner %>"
				files: 'generated/css/main.min.css': ["public/css/global.css", "public/css/main.css"]


		sass:
			dist:
				files:
					'public/css/main.css': 'public/css/main.scss'
		watch:
			options: 
				livereload: true
			
			sass: 
				files: "public/css/**"
				tasks: ["sass"]
				options:
					spawn: true

		yeahicons:
			icons:
				options:
					dataiconsrc: "public/images/data/"
					src: "public/images/data"
					dest: "public/css/icons"
					datasvgcss: "data/_icons.scss"
					pngcrush: true
					defaultWidth: "100px";
					cssprefix: "enhanced .icon_"
					previewhtml: "data/preview.html"
					loadersnippet: "data/grunticon.loader.txt"
					svghook: "enhanced"
					fallbackhook: "fallback"
					sprite:
						quality: '90%'
		webfont:
			icons:
				src: "public/images/icons_source/*.svg"
				dest: "public/css/icons/font"
				options:
					font: "icons"
					types: "ttf,woff,svg,eot"
					template: "public/css/icons/font/font-template.css"
					stylesheet: "scss"

		sprite:
			all:
				src: "public/css/icons/png/*.png"
				destImg: "public/css/icons/sprite/sprite.png"
				destCSS: "public/css/icons/sprite/_icons.css"
				algorithm: "binary-tree"
				cssOpts:
      				cssClass: (item) ->
        				".fallback .icon_" + item.name

		open:
			dev:
				path: "http://localhost:<%= server.web.port %>"
				
		server: 
			base: "#{process.env.SERVER_BASE || 'generated'}"
			web:
				port: 7000
				
		requirejs:
			compileProject:
				options:
					appDir: "public"
					baseUrl: "./js/vendor"
					mainConfigFile: "public/js/common.js"
					dir: "generated"
					modules:[
							name:"../common"
							include: ["jquery", "modernizr", "backbone", "underscore", "text", "backbone.marionette"]
						name: "packages/package1"
						exclude: ["../common"]							
							]
							
	
  # loading local tasks
	grunt.loadTasks "tasks"

  # loading external tasks (aka: plugins)
  # Loads all plugins that match "grunt-", in this case all of our current plugins
  #require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks)

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-open");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	# grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-yeahicons');
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-execute');

	
  # creating workflows
	grunt.registerTask "default",  ["server", "sass", "watch"]
	grunt.registerTask "build", ["requirejs", "concat", "cssmin", "copy", "server", "watch"]
	grunt.registerTask "min", ["concat", "cssmin"]
	grunt.registerTask "icons", ["webfont", "yeahicons", "sprite"]
	
	
	

	grunt.registerTask "deploy", ["prepareDeploy", "requirejs","concat", "cssmin", "afterDeploy"]


