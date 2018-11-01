require 'pg'

def setup_test_database
 p "setting up test thermostat database..."
 connection = PG.connect(dbname: 'thermostat_test')
 connection.exec('TRUNCATE temperature;')

 connection.exec("INSERT INTO temperature(id,temp,energy_usage_rank,energy_usage_text,temp_changed_on) 
 	values(1,17,1,'low-usage',now());")
end