/*
 * simple-calendar v1.0.0
 *
 * A simple JavaScript calendar with no dependencies.
 * By Ripley Marvin
 * At https://github.com/remarvin/simple-calendar
 *
 */
 
function simpleCalendar (element, options = {}) {
  // Throw error if element is not valid
  if (!element || !(element instanceof Element)) {
	throw new Error('simple-calendar error: missing or invalid element');
  }
	
  // Default values
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let days = {};
  let dayDisplay = 'short';
  let monthDisplay = 'long';
  
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
  let dayNames = [];
  switch (dayDisplay) {
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
	case 'letter':
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
	  break;
  }
  
  // Set month names
  let monthNames = [];
  switch (monthDisplay) {
	case 'short':
	  monthNames = [
	    'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'July',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec'
	  ];
	  break;
	case 'number':
	  monthNames = [
	    '1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12'
	  ];
	  break;
	default:
	  monthNames = [
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
	  break;
  }
  
  // Calendar day variables
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const lastDay = new Date(year, month + 1, 0);
  const lastWeekday = lastDay.getDay();
  const monthDays = lastDay.getDate();
  const monthStr = monthNames[month];

  // Construct day cells array
  let dayCells = [];
  for (let counter = 0; counter < firstWeekday; counter++) {
	dayCells.push('');
  }
  for (let counter = 0; counter < monthDays; counter++) {
	dayCells.push((counter + 1).toString());
  }
  for (let counter = 0; counter < (6 - lastWeekday); counter++) {
	dayCells.push('');
  }

  // Construct day names HTML
  let dayNamesHTML = "<tr>\n";
  for (let counter = 0; counter < 7; counter++) {
	dayNamesHTML += `<th>${dayNames[counter]}</th>\n`;
  }
  dayNamesHTML += "</tr>\n";

  //Construct days HTML
  let daysHTML = "<tr>\n";
  for (let counter = 0; counter < dayCells.length; counter++) {
	daysHTML += "<td>\n";
	daysHTML += dayCells[counter] === '' ? '' : `<span class='day'>${dayCells[counter]}</span>\n`;
	daysHTML += days[dayCells[counter]] ? days[dayCells[counter]] + "\n" : '';
	daysHTML += "</td>\n";
	daysHTML += (counter + 1) % 7 == 0 && counter != dayCells.length - 1 ? "</tr>\n<tr>\n" : '';
  }
  daysHTML += "</tr>\n";

  // Construct calendar HTML
  const calendarHTML = `
    <div class='header'><span class='month'>${monthNames[month]}</span> <span class='year'>${year}</span></div>
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