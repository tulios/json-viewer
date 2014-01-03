require 'rubygems'
require 'pathname'
require 'logger'
require 'fileutils'
require 'bundler/setup'

Bundler.require

ROOT        = Pathname(File.dirname(__FILE__))
LOGGER      = Logger.new(STDOUT)
BUNDLES     = %w( all.css all.js options.css options.js event.js omnibox.js json_container.js )
BUILD_DIR   = ROOT.join("build")
EXTENSION   = BUILD_DIR.join("json_viewer")
RELEASE_DIR = ROOT.join("pkg")

desc "Build extension package"
task build: [:compile] do
  puts "Copying files"
  FileUtils.mkdir_p EXTENSION

  FileUtils.cp_r ROOT.join("extension/icons"), EXTENSION.join("icons")
  FileUtils.cp_r ROOT.join("extension/src/pages"), EXTENSION.join("pages")
  FileUtils.cp_r ROOT.join("extension/src/assets"), EXTENSION.join("assets")
  FileUtils.cp_r ROOT.join("extension/lib/stylesheets/themes"), EXTENSION.join("assets")
  FileUtils.cp_r ROOT.join("extension/manifest.json"), EXTENSION
  BUNDLES.each do |bundle|
    FileUtils.cp_r BUILD_DIR.join(bundle), EXTENSION.join("assets").join(bundle)
  end

  puts "Zipping"
  Zip::File.open("#{EXTENSION}.zip", Zip::File::CREATE) do |zipfile|
    Dir[File.join("#{EXTENSION}/", '**', '**')].each do |file|
      zipfile.add(file.sub("#{EXTENSION}/", ''), file)
    end
  end

  puts "Finishing"
  version = File.read(EXTENSION.join("manifest.json")).scan(/"version":\s+"([^"]+)"/).flatten.first
  FileUtils.mkdir_p RELEASE_DIR.join(version)
  FileUtils.cp "#{EXTENSION}.zip", RELEASE_DIR.join(version)
end

desc "Compiles the assets"
task compile: [:cleanup] do
  puts "Compiling assets"
  environment = Sprockets::Environment.new(ROOT)
  environment.css_compressor = YUI::CssCompressor.new
  environment.js_compressor  = Uglifier.new(mangle: true)

  environment.append_path ROOT.join('extension/lib/javascripts')
  environment.append_path ROOT.join('extension/src/javascripts')
  environment.append_path ROOT.join('extension/lib/stylesheets')
  environment.append_path ROOT.join('extension/src/stylesheets')

  BUNDLES.each do |bundle|
    asset = environment[bundle]
    outfile = Pathname.new(BUILD_DIR).join(bundle)
    FileUtils.mkdir_p outfile.dirname
    asset.write_to(outfile)
  end
end

desc "Cleanup compiled assets"
task :cleanup do
  FileUtils.rm_rf(BUILD_DIR);
end
