'use strict';

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
	function SimpleCalendar() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, SimpleCalendar);

		// Save options
		this.options = options;

		// Use current year if year is not valid
		if (!this.options.year || !Number.isInteger(this.options.year)) {
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


	_createClass(SimpleCalendar, [{
		key: 'drawCalendar',
		value: function drawCalendar(element) {
			// Throw error if element is not valid
			if (!element || !(element instanceof Element)) {
				throw new Error('simple-calendar error: missing or invalid element');
			}

			// Set day names
			var dayNames = [];
			switch (this.options.dayNames) {
				case 'long':
					dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					break;
				case 'letters':
					dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
					break;
				default:
					dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			}

			// Set month names
			var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			// Calendar day variables
			var firstDay = new Date(this.options.year, this.options.month, 1);
			var firstWeekday = firstDay.getDay();
			var lastDay = new Date(this.options.year, this.options.month + 1, 0);
			var lastWeekday = lastDay.getDay();
			var monthDays = lastDay.getDate();
			var monthStr = monthNames[this.options.month];

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
				daysHTML += "<span>" + dayCells[_i4] + "</span>\n";
				daysHTML += this.options.days[dayCells[_i4]] ? this.options.days[dayCells[_i4]] + "\n" : "";
				daysHTML += "</td>\n";
				daysHTML += (_i4 + 1) % 7 == 0 ? "</tr>\n<tr>\n" : "";
			}
			daysHTML += "</tr>\n";

			// Construct calendar HTML
			var calendarHTML = '\n\t<div>' + monthNames[this.options.month] + ' ' + this.options.year + '</div>\n\t<table>\n\t  <thead>\n\t    ' + dayNamesHTML + '\n\t  </thead>\n\t  <tbody>\n\t    ' + daysHTML + '\n\t  </tbody>\n\t</table>\n\t';

			// Insert HTML into element
			element.innerHTML = calendarHTML;
		}
	}]);

	return SimpleCalendar;
}();