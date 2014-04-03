netflixinterview
================

A repo for the netflix interview code test.


## Project Layout

### Services:
- appDataService
	- requests the data for the application
	- All variable set to private to avoid any accidental manipulation
	- passes data to formatters which then make the variable freely available.

- dataFormatted
	- takes data from appDataService
	- formats what is needed and makes the proccessed values freely available

- userInputService
	- handles all user input and keeps the data freely available

### Controllers
- userInputCtrl
	- takes user input like rating and search filters and passes them to the correct services
	- Might work better as a directive, but as this is going to act as a blanket for multiple inputs, I feel a controller is best.

- listCtrl
	- holds the data for the list of organizations
	- makes them available as an array