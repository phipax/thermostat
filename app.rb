require 'sinatra/base'
require './lib/temperature'
require 'pg'


class Thermostat < Sinatra::Base
	enable :sessions

	before do
	 @temp ||= Temperature.create()
	end

	get '/' do
		erb :index
	end

	get '/temperature' do
		redirect '/temperature/fetch'
	end

	get '/temperature/fetch' do
		data = Hash.new
		data = @temp.getTemp
		JSON.pretty_generate(data)
	end

	post '/temperature/input' do
		temp = params[:temp]
		text = params[:text]
		@temp.putTemp(temp,text) if(temp != "" && text != "") 
	end

run! if app_file == $0
end