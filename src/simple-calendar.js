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
  constructor(year, month, contents = {}) {
	// Set year
	if (!year || !(Number.isInteger(year))) {
	  // Use current year if given year is not valid
	  this.year = new Date().getFullYear();
	} else {
	  // Use given year
	  this.year = year;
	}
	
	// Set month
	if (!month || !(Number.isInteger(month) || month < 0 || month > 11)) {
	  // Use current month if given month is not valid
	  this.month = new Date().getMonth();
	} else {
	  // Use given month
	  this.month = month;
	}
	
	// Set contents
	this.contents = contents;
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
	const firstDay = new Date(this.year, this.month, 1);
	const firstWeekday = firstDay.getDay();
	const lastDay = new Date(this.year, this.month + 1, 0);
	const lastWeekday = lastDay.getDay();
	const monthDays = lastDay.getDate();
	const monthStr = monthNames[this.month];
	
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
	  daysHTML += this.contents[i + 1] ? this.contents[i + 1] + "\n" : "";
	  daysHTML += "</td>\n";
	  daysHTML += (i + 1) % 7 == 0 ? "</tr>\n<tr>\n" : "";
	}
	daysHTML += "</tr>\n";
	
	// Construct calendar HTML
	const calendarHTML = `
	<div>${monthNames[this.month]} ${this.year}</div>
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