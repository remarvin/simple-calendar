"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * simple-calendar v1.0.0
 *
 * A simple JavaScript calendar with no dependencies.
 * By Ripley Marvin
 * At https://github.com/remarvin/simple-calendar
 *
 */

var SimpleCalendar = function () {
	// Constructor
	function SimpleCalendar(year, month) {
		var contents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		_classCallCheck(this, SimpleCalendar);

		// Set year
		if (!year || !Number.isInteger(year)) {
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


	_createClass(SimpleCalendar, [{
		key: "drawCalendar",
		value: function drawCalendar(element) {
			// Throw error if element is not valid
			if (!element || !(element instanceof Element)) {
				throw new Error('simple-calendar error: missing or invalid element');
			}

			// Month names
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			// Calendar day variables
			var firstDay = new Date(this.year, this.month, 1);
			var firstWeekday = firstDay.getDay();
			var lastDay = new Date(this.year, this.month + 1, 0);
			var lastWeekday = lastDay.getDay();
			var monthDays = lastDay.getDate();
			var monthStr = monthNames[this.month];

			// Construct day cells array
			var dayCells = [];
			for (var i = 0; i < firstWeekday; i++) {
				dayCells.push("");
			}
			for (var _i = 0; _i < monthDays; _i++) {
				dayCells.push((_i + 1).toString());
			}
			for (var _i2 = 0; _i2 < 6 - lastWeekday; _i2++) {
				dayCells.push("");
			}

			//Construct calendar days HTML
			var daysHTML = "<tr>\n";
			for (var _i3 = 0; _i3 < dayCells.length; _i3++) {
				daysHTML += "<td>\n";
				daysHTML += "<div>" + dayCells[_i3] + "</div>\n";
				daysHTML += this.contents[_i3 + 1] ? this.contents[_i3 + 1] + "\n" : "";
				daysHTML += "</td>\n";
				daysHTML += (_i3 + 1) % 7 == 0 ? "</tr>\n<tr>\n" : "";
			}
			daysHTML += "</tr>\n";

			// Construct calendar HTML
			var calendarHTML = "\n\t<div>" + monthNames[this.month] + " " + this.year + "</div>\n\t<table>\n\t  <thead>\n\t    <tr>\n\t\t  <th>Sun</th>\n\t\t  <th>Mon</th>\n\t\t  <th>Tue</th>\n\t\t  <th>Wed</th>\n\t\t  <th>Thu</th>\n\t\t  <th>Fri</th>\n\t\t  <th>Sat</th>\n\t\t</tr>\n\t  </thead>\n\t  <tbody>\n\t    " + daysHTML + "\n\t  </tbody>\n\t</table>\n\t";

			// Insert HTML into element
			element.innerHTML = calendarHTML;
		}
	}]);

	return SimpleCalendar;
}();