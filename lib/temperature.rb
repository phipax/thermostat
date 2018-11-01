class Temperature
	def initialize
	 	if ENV['ENVIRONMENT'] == 'test'
	      @connection = PG.connect(dbname: 'thermostat_test')
	    else
	      @connection = PG.connect(dbname: 'thermostat')
	    end
	end

	def getTemp
		lstr = {}
		result = @connection.exec('select temp from temperature where id in(select MAX(id) from temperature);')
		result.map{|rec|
			lstr["temp"] = rec['temp']
		}
		lstr
	end

	def putTemp(temp,text)
		# p "#{temp},#{text}"
		str = {"low-usage"=>1,"medium-usage"=>2,"high-usage"=>3}
		prep_str = "INSERT INTO temperature(temp,energy_usage_rank,energy_usage_text,temp_changed_on) 
 	values("+temp.to_s+","+str[text].to_s+",'"+text+"',now());"
 		# p prep_str
 		result = @connection.exec(prep_str)
	end

	def self.create
		Temperature.new
	end

end