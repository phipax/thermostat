$(document).ready(function(){
	var thermostat = new Thermostat;
	updateTemperature();

	$('#temperature-up').on('click',function(){
		thermostat.up();
		updateTemperature();
		passParameters();

	});

	$('#temperature-down').on('click',function(){
		thermostat.down();
		updateTemperature();
		passParameters();
	});

	$('#temperature-reset').on('click',function(){
		thermostat.resetTemperature();
		updateTemperature();
		passParameters();
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
		$('#usage').text(thermostat.energyUsage());
		$('#temperature').attr('class', thermostat.energyUsage());
	};


	$('#current-city').change(function() {
  	 var city = $('#current-city').val();
  	 displayWeather(city);
	});

	$.getJSON('http://localhost:4567/temperature/fetch',function(data){
		var temp = "";
		$.each(data,function(key,val){
			temp = val
			$('#last-temp').text(temp);
			$('#temperature').text(temp);
			thermostat.setCurrentTemperature(parseInt(temp));
		});
	});

	function passParameters(){
	 $.ajax({
	      type: "POST",
	      url: "/temperature/input",
	      data: {
	        temp: $('#temperature').text(),
	        text: $('#usage').text()}
	    });
	};

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