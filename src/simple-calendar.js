/*
 * simple-calendar v1.0.0
 *
 * A simple JavaScript calendar with no dependencies.
 * By Ripley Marvin
 * At https://github.com/remarvin/simple-calendar
 *
 */
 
 class SimpleCalendar {
  // Constructor
  constructor(options = {}) {
	// Save options
	this.options = options;
	
	// Use current year if year is not valid
	if (!this.options.year || !(Number.isInteger(this.options.year))) {
	  this.options.year = new Date().getFullYear();
	}
	
	// Use current month if month is not valid
	if (!this.options.month || !(Number.isInteger(this.options.month) || this.options.month < 0 || this.options.month > 11)) {
	  this.options.month = new Date().getMonth();
	}
	
	// Set day contents to empty hash if none given
	if (!this.options.days) {
	  this.options.days = {};
	}
	
	// Set day names to default value if not other valid option
	if (!(this.options.dayNames === 'long' || this.options.dayNames === 'letters')) {
	  this.options.dayNames = 'short';
	}
	
	// Draw calendar if HTML element given
	if (this.options.element) {
	  this.drawCalendar(this.options.element);
	}
  }
  
  // Draw calendar table in given element
  drawCalendar(element) {
	// Throw error if element is not valid
	if (!element || !(element instanceof Element)) {
	  throw new Error('simple-calendar error: missing or invalid element');
	}
	
	// Set day names
	let dayNames = [];
	switch (this.options.dayNames) {
	  case 'long':
	    dayNames = [
	      'Sunday',
		  'Monday',
		  'Tuesday',
		  'Wednesday',
		  'Thursday',
		  'Friday',
		  'Saturday'
	    ];
	    break;
	  case 'letters':
	    dayNames = [
	      'S',
		  'M',
		  'T',
		  'W',
		  'T',
		  'F',
		  'S'
	    ];
		break;
	  default:
	    dayNames = [
	      'Sun',
	      'Mon',
	      'Tue',
	      'Wed',
	      'Thu',
	      'Fri',
	      'Sat'
	    ];
	}
	
	// Set month names
	const monthNames = [
	  'January',
	  'February',
	  'March',
	  'April',
	  'May',
	  'June',
	  'July',
	  'August',
	  'September',
	  'October',
	  'November',
	  'December'
	];
	
	// Calendar day variables
	const firstDay = new Date(this.options.year, this.options.month, 1);
	const firstWeekday = firstDay.getDay();
	const lastDay = new Date(this.options.year, this.options.month + 1, 0);
	const lastWeekday = lastDay.getDay();
	const monthDays = lastDay.getDate();
	const monthStr = monthNames[this.options.month];
	
	// Construct day cells array
	let dayCells = [];
	for (let i = 0; i < firstWeekday; i++) {
	  dayCells.push('');
	}
	for (let i = 0; i < monthDays; i++) {
	  dayCells.push((i + 1).toString());
	}
	for (let i = 0; i < (6 - lastWeekday); i++) {
	  dayCells.push('');
	}
	
	// Construct day names HTML
	let dayNamesHTML = "<tr>\n";
	for (let i = 0; i < 7; i++) {
	  dayNamesHTML += `<th>${dayNames[i]}</th>\n`;
	}
	dayNamesHTML += "</tr>\n";
	
	//Construct days HTML
	let daysHTML = "<tr>\n";
	for (let i = 0; i < dayCells.length; i++) {
	  daysHTML += "<td>\n";
	  daysHTML += "<span>" + dayCells[i] + "</span>\n";
	  daysHTML += this.options.days[dayCells[i]] ? this.options.days[dayCells[i]] + "\n" : "";
	  daysHTML += "</td>\n";
	  daysHTML += (i + 1) % 7 == 0 ? "</tr>\n<tr>\n" : "";
	}
	daysHTML += "</tr>\n";
	
	// Construct calendar HTML
	const calendarHTML = `
	<div>${monthNames[this.options.month]} ${this.options.year}</div>
	<table>
	  <thead>
	    ${dayNamesHTML}
	  </thead>
	  <tbody>
	    ${daysHTML}
	  </tbody>
	</table>
	`;
	
	// Insert HTML into element
	element.innerHTML = calendarHTML;
  }
 }