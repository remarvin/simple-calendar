'use strict';

/*
 * simple-calendar v1.0.0
 *
 * A simple JavaScript calendar with no dependencies.
 * By Ripley Marvin
 * At https://github.com/remarvin/simple-calendar
 *
 */

function simpleCalendar(element) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	// Throw error if element is not valid
	if (!element || !(element instanceof Element)) {
		throw new Error('simple-calendar error: missing or invalid element');
	}

	// Default values
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var days = {};
	var dayDisplay = 'short';
	var monthDisplay = 'long';

	// Set year from options if valid
	if (options.year && Number.isInteger(options.year)) {
		year = options.year;
	}

	// Set month from options if valid
	if (options.month && Number.isInteger(options.month) && options.month >= 0 && options.month <= 11) {
		month = options.month;
	}

	// Set day contents from options if given
	if (options.days) {
		days = options.days;
	}

	// Set day display from options if valid
	if (options.dayDisplay && (options.dayDisplay.toLowerCase() === 'long' || options.dayDisplay.toLowerCase() === 'letter')) {
		dayDisplay = options.dayDisplay.toLowerCase();
	}

	// Set month display from options if valid
	if (options.monthDisplay && (options.monthDisplay.toLowerCase() === 'short' || options.monthDisplay.toLowerCase() === 'number')) {
		monthDisplay = options.monthDisplay.toLowerCase();
	}

	// Set day names
	var dayNames = [];
	switch (dayDisplay) {
		case 'long':
			dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			break;
		case 'letter':
			dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
			break;
		default:
			dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			break;
	}

	// Set month names
	var monthNames = [];
	switch (monthDisplay) {
		case 'short':
			monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
			break;
		case 'number':
			monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
			break;
		default:
			monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			break;
	}

	// Calendar day variables
	var firstDay = new Date(year, month, 1);
	var firstWeekday = firstDay.getDay();
	var lastDay = new Date(year, month + 1, 0);
	var lastWeekday = lastDay.getDay();
	var monthDays = lastDay.getDate();
	var monthStr = monthNames[month];

	// Construct day cells array
	var dayCells = [];
	for (var i = 0; i < firstWeekday; i++) {
		dayCells.push('');
	}
	for (var _i = 0; _i < monthDays; _i++) {
		dayCells.push((_i + 1).toString());
	}
	for (var _i2 = 0; _i2 < 6 - lastWeekday; _i2++) {
		dayCells.push('');
	}

	// Construct day names HTML
	var dayNamesHTML = "<tr>\n";
	for (var _i3 = 0; _i3 < 7; _i3++) {
		dayNamesHTML += '<th>' + dayNames[_i3] + '</th>\n';
	}
	dayNamesHTML += "</tr>\n";

	//Construct days HTML
	var daysHTML = "<tr>\n";
	for (var _i4 = 0; _i4 < dayCells.length; _i4++) {
		daysHTML += "<td>\n";
		daysHTML += "<span class='day'>" + dayCells[_i4] + "</span>\n";
		daysHTML += days[dayCells[_i4]] ? days[dayCells[_i4]] + "\n" : "";
		daysHTML += "</td>\n";
		daysHTML += (_i4 + 1) % 7 == 0 && _i4 != dayCells.length - 1 ? "</tr>\n<tr>\n" : "";
	}
	daysHTML += "</tr>\n";

	// Construct calendar HTML
	var calendarHTML = '\n    <div class=\'header\'><span class=\'month\'>' + monthNames[month] + '</span> <span class=\'year\'>' + year + '</span></div>\n\t<table>\n\t  <thead>\n\t    ' + dayNamesHTML + '\n\t  </thead>\n\t  <tbody>\n\t    ' + daysHTML + '\n\t  </tbody>\n\t</table>\n  ';

	// Insert HTML into element
	element.innerHTML = calendarHTML;
}