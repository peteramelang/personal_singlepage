# Require any additional compass plugins here.

require "fileutils"

module Compass::Core
end
module Compass::Core::SassExtensions
end
module Compass::Core::SassExtensions::Functions
end
module Compass::Core::SassExtensions::Functions::ImageSize
end

module Compass::Core::SassExtensions::Functions::ImageSize
  def real_path(image_file)
    # Compute the real path to the image on the file stystem if the images_dir is set.
    if Compass.configuration.generated_images_path
        if File.file?(File.join(Compass.configuration.generated_images_path, image_file))
            return File.join(Compass.configuration.generated_images_path, image_file)
        end
    end
    if Compass.configuration.images_path
        return File.join(Compass.configuration.images_path, image_file)
    end
    File.join(Compass.configuration.project_path, image_file)
  end
end

module Compass::SassExtensions
end
module Compass::SassExtensions::Functions
end
module Compass::SassExtensions::Functions::Sprites
end

module Compass::SassExtensions::Functions::Sprites
    def sprite_path(map)
        Sass::Script::String.new(map.filename)
    end
    Sass::Script::Functions.declare :sprite_path, [:map]
end

# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
#on_stylesheet_saved do |filename|
 # if File.exists?(filename)
  #  css = File.read filename
   # File.open(filename, 'w+') do |f|
    #  f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
   # end
 # end
#end

# Paths relative to Gruntfile.js
http_path = "/"
css_dir = "../source/css"
sass_dir = "scss"
images_dir = "../source/images"
generated_images_dir = "../source/images/sprites"
javascripts_dir = "../source/js"
fonts_dir = "../source/fonts"
cache_path = "/tmp/.sass-cache"

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
