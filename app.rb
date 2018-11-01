require 'sinatra/base'
require './lib/temperature'

class Thermostat < Sinatra::Base
	enable :sessions

	before do
		
	end

	get '/' do
	end
end