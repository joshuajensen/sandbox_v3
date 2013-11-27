/***** SASS/CSS README *****/

Directories (public/css/)
./icons
./modules
./sections
./vendor

***** ./icons *****
This is where the icon font, data uri css, spritesheets & all corresponding css is complied to.
NO manual changes should be made within this directory as they will be OVERWRITTEN when the grunt task "grunt icons" is executed.
any additional styles for any icons should be added to the "modules/_icons.css" partial.

./icons/data
the location of the generated data uri styleheet (used for mulitcolored svg icons)

./icons/font
the location of the generated icon font files (svg & ttf required) and also the corresponding stylesheet for the icon font

./icons/sprite
the location of the generated spritesheets and the corresponding stylesheet


***** ./modules *****
this direcotry is reserved for common css that will be shared across the app. 

./modules/_base.scss
this partial is the base styles for taget mobile. all reusable buttons, default font styles and colors are located here
this is also where we keep all sass variables that can be used globally

./modules/_icons.scss
this partial includes all of the generated stylesheets from the gront icons task and is also a home for all icon related styles that may neeed to be added on. (icon specifc styles can be included at the view level as well if they are not needed globally)

./modules/_reset.scss
this normailizes our css accross browsers using a widely accepted reset.

./modules/_utility.scss
this is a partial which contains useful mixins that can be used globally

***** ./sections *****
for each top level main view there is a corresponsing sections scss file. the files are typically namespaced to the element belonging to the corresponding main view. these section specific stylesheets can also contain namespaced subview sections that could be broken out into sperate files at a later time if needed. however it seems that this level a granularity is acceptable.

***** ./vendor *****
this is a directory for 3rd party css files, no manual dev should happen within this directory


***** main.scss *****
the main.scss file is used ONLY for including all of the neccessary partials in the correct order. NO css styles should be writted within this file, this is soley used for the purpose of compiling the scss corretly.

***** main.css *****
this is the compiled css file that is generated form all of the sass being included properly within main.scss
NO dev changes should be made to this file as they will be instanlty overwritted the next time the SASS is compiled




Note:
The bulk of the css work should be done within the "./sections" directory withing the file that corresponds to the view the developer is working on.

If you are making changes to any of the files in the "./modules" directory, make sure that you are ADDING to the file, NOT removing or editing existing mixins/variables (unless you are ceratin your changes are impacting only area you are intending them to). since the mixins and variables may already be used globally, any changes could result in sitewide updates.

currently most of these files are empty, the structure is currently used for reference for how new files hsould be added and what content should be included in which partial scss file.

(there are a few extra files currently included in the project for reference to the current mweb site, mainly global.css. this file will be removed once we have transferrred everything we need out of it and into the proper sass files)

if you have any questions please direct them to joshu.jensen2@target.com

