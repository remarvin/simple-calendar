# simple-calendar
A simple JavaScript calendar with no dependencies.

Version: `1.0.0`

## Install
Download the simple-calendar JavaScript file in the `dist` folder and include
`<script src="path/to/simple-calendar.min.js"></script>`
in the page.

## Usage
Call simple-calendar like so:
```js
simpleCalendar(element[, {options}]);
```

The default option values are:
```js
simpleCalendar(element, {
  year:         new Date().getFullYear(),   // year, defaults to current year
  month:        new Date().getMonth(),      // zero-based index month, defaults to current month
  days:         {},                         // optional content for day cells
  dayDisplay:   'short',                    // display of day names in header row
  monthDisplay: 'long'                      // display of month name in title
});
```

Note: Anything already in the given element will be overwritten by the calendar.

### Days
Use the `days` option to include additional content on specific days like so:
```js
days: {
  1: 'Stuff',
  15: 'More stuff'
}
```

### Day Display
Use the `dayDisplay` option to set the display of the day names in the header row. Options include:
```
'short'    // 'Sun', 'Mon', 'Tues', etc. -- default
'long'     // 'Sunday', 'Monday', 'Tuesday', etc.
'letter'   // 'S', 'M', 'T', etc.
```

### Month Display
Use the `monthDisplay` option to set the display of the month name in the title. Options include:
```
'long'     // 'January', 'February', 'March', etc. -- default
'short'    // 'Jan', 'Feb', 'Mar', etc.
'number'   // '1', '2', '3', etc.
```

### Styling
Styling is up to you! The calendar HTML includes classes for the `month` display, `year` display, and `day` display numbers for easier styling.