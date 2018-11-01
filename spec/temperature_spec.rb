require './lib/temperature'
require './spec/setup_test_database'
require 'pg'

describe Temperature do

	context 'check for the class' do
		it 'instance for Temperature' do
			expect(Temperature.new).to be_instance_of(Temperature)
		end
	end

	context 'From the Temperature class check ' do
		it 'for the method calls to Initalize' do
			t = Temperature.new
			expect(t.temp).to eq ""
		end
	end

	context 'From the temperature settings DB fetch' do
		it 'the last weather stored' do
			t = Temperature.new
			expect(t.getTemp["temp"].to_i).to eq 17
		end
	end
end