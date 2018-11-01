class Temperature
	attr_reader  :temp
	def initialize
		@temp = ""

	 	if ENV['ENVIRONMENT'] == 'test'
	      @connection = PG.connect(dbname: 'thermostat_test')
	    else
	      @connection = PG.connect(dbname: 'thermostat')
	    end
	end

	def getTemp
		lstr = Hash.new
		result = @connection.exec('select * from temperature where id in(select MAX(id) from temperature);')
		result.map{|rec|
			lstr = rec
		}
		lstr
	end
end