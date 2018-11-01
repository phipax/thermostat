$(document).ready(function(){
	var thermostat = new Thermostat;
	updateTemperature();

	$('#temperature-up').on('click',function(){
		thermostat.up();
		updateTemperature();
	});

	$('#temperature-down').on('click',function(){
		thermostat.down();
		updateTemperature();
	});

	$('#temperature-reset').on('click',function(){
		thermostat.resetTemperature();
		updateTemperature();
	});

	$('#powersaving-on').on('click',function(){
		thermostat.switchPowerSavingModeOn();
		$('#power-saving-status').text('on');
		updateTemperature();
	});

	$('#powersaving-off').on('click',function(){
		thermostat.switchPowerSavingModeOff();
		$('#power-saving-status').text('off');
		updateTemperature();
	});

	function updateTemperature(){
		$('#temperature').text(thermostat.temperature);
		$('#temperature').attr('class', thermostat.energyUsage());
	};

	$.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  	$('#current-temperature').text(data.main.temp);
	});	

	$('#current-city').change(function() {
  	 var city = $('#current-city').val();
     $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
     $('#current-temperature').text(data.main.temp)
  	 });
	});

	function displayWeather(city) {
	 var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
	 var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
	 var units = '&units=metric';
	 $.get(url + token + units, function(data) {
	 	$('#current-temperature').text(data.main.temp);
	 });
	};
	displayWeather('London');
});