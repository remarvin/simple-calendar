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
	
	// Set year
	if (!options.year || !(Number.isInteger(options.year))) {
	  // Use current year if given year is not valid
	  this.options.year = new Date().getFullYear();
	} else {
	  // Use given year
	  this.options.year = options.year;
	}
	
	// Set month
	if (!options.month || !(Number.isInteger(options.month) || options.month < 0 || options.month > 11)) {
	  // Use current month if given month is not valid
	  this.options.month = new Date().getMonth();
	} else {
	  // Use given month
	  this.options.month = options.month;
	}
	
	// Set day contents
	if (!options.days) {
	  this.options.days = {};
	}
	
	// Draw calendar if HTML element given
	if (options.element) {
	  this.drawCalendar(options.element);
	}
  }
  
  // Draw calendar table in given element
  drawCalendar(element) {
	// Throw error if element is not valid
	if (!element || !(element instanceof Element)) {
	  throw new Error('simple-calendar error: missing or invalid element');
	}
	
	// Month names
	const monthNames = [
	  "January",
	  "February",
	  "March",
	  "April",
	  "May",
	  "June",
	  "July",
	  "August",
	  "September",
	  "October",
	  "November",
	  "December"
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
	  dayCells.push("");
	}
	for (let i = 0; i < monthDays; i++) {
	  dayCells.push((i + 1).toString());
	}
	for (let i = 0; i < (6 - lastWeekday); i++) {
	  dayCells.push("");
	}
	
	//Construct calendar days HTML
	let daysHTML = "<tr>\n";
	for (let i = 0; i < dayCells.length; i++) {
	  daysHTML += "<td>\n";
	  daysHTML += "<div>" + dayCells[i] + "</div>\n";
	  daysHTML += this.options.days[i + 1] ? this.options.days[i + 1] + "\n" : "";
	  daysHTML += "</td>\n";
	  daysHTML += (i + 1) % 7 == 0 ? "</tr>\n<tr>\n" : "";
	}
	daysHTML += "</tr>\n";
	
	// Construct calendar HTML
	const calendarHTML = `
	<div>${monthNames[this.options.month]} ${this.options.year}</div>
	<table>
	  <thead>
	    <tr>
		  <th>Sun</th>
		  <th>Mon</th>
		  <th>Tue</th>
		  <th>Wed</th>
		  <th>Thu</th>
		  <th>Fri</th>
		  <th>Sat</th>
		</tr>
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