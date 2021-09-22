///
/// Convert Date objects into a string according to a specified format.
///
/// The dateToString(format, date) function in this file replaces the
/// Date.toLocaleFormat() method which has been removed in recent
/// versions of JavaScript.
///
/// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleFormat
///
/// However, dateToString(format, date) does not currently (and
/// probably never will) replicate all the features of the old
/// Date.toLocaleFormat().
///
/// The following format control codes have not been implemented:
///
/// %C = Century number
/// %G = ISO 8601 week-based year with century
/// %g = Same as G with 2 digit year
/// %U = Week number 00-53 Sunday based
/// %V = ISO 8601 week number 01-53
/// %W = Week number 00-53 Monday based
/// %j = Day of the year 001-366
/// %u = Day of the week 1-7
/// %Z = Timezone name or abbreviation
/// %n = Newline
/// %t = Tab
/// %% = %
/// _ = Space pad numeric result 
/// - = Do not pad numeric result
/// 0 = Zero pad numeric result
/// ^ = Convert alphabetic characters to upper case
/// # = Swap the case
/// 1, 2, ... = Decimal width specifier
/// E, O = Alternative format specifier
///
/// Some extra format control codes have been implemented:
///
/// %f = Day of the month 1-31 not zero or space padded
///

///
/// Convert a JavaScript Date object to a formatted string.
///
/// @param {string} format - The format string.
/// @param {Date} date - The date to convert, defaults to Date representation of now.
/// @return {string} The formatted date string.
/// @todo Implement more control codes, e.g. Timezones.
/// @todo Reorder switch so commonest codes are at the top.
/// @todo Consider a refactor where we "compile" a date format which is stored and eval'ed.
///
function dateToString(format, date = new Date()) {
    const LENGTH = format.length;
    let i = 0;
    let ch = '';
    let output = '';
    
    while (i < LENGTH) {
        ch = format.charAt(i);
        
        if (ch == '%' && ++i < LENGTH) {
            switch (format.charAt(i)) {
            case 'A':
                output += _getWeekdayLong(date.getDay());
                break;
            case 'B':
                output += _getMonthLong(date.getMonth());
                break;
            case 'D':
                output += date.getMonth().toString().padStart(2, '0')
                    + '/' + date.getDate().toString().padStart(2, '0')
                    + '/' + date.getFullYear().toString().slice(-2);
                break;
            case 'F':
                output += date.getFullYear()
                    + '-' + date.getMonth().toString().padStart(2, '0')
                    + '-' + date.getDate().toString().padStart(2, '0');
                break;
            case 'H':
                output += date.getHours().toString().padStart(2, '0');
                break;
            case 'I':
                output += _get12Hour(date.getHours()).toString().padStart(2, '0');
                break;
            case 'M':
                output += date.getMinutes().toString().padStart(2, '0');
                break;
            case 'P':
                output += (date.getHours() < 12) ? 'am' : 'pm';
                break;
            case 'R':
                output += date.getHours().toString().padStart(2, '0')
                    + ':' + date.getMinutes().toString().padStart(2, '0');
                break;
            case 'S':
                output += date.getSeconds().toString().padStart(2, '0');
                break;
            case 'T':
                output += date.getHours().toString().padStart(2, '0')
                    + ':' + date.getMinutes().toString().padStart(2, '0') 
                    + ':' + date.getSeconds().toString().padStart(2, '0');
                break;
            case 'X':
                output += date.toLocaleTimeString();
                break;
            case 'Y':
                output += date.getFullYear();
                break;
            case 'a':
                output += _getWeekdayShort(date.getDay())
                break;
            case 'b':
                output += _getMonthShort(date.getMonth());
                break;
            case 'c':
                output += date.toLocaleString();
                break;
            case 'd':
                output += date.getDate().toString().padStart(2, '0');
                break;
            case 'e':
                output += date.getDate().toString().padStart(2, ' ');
                break;
            case 'f':
                output += date.getDate();
                break;
            case 'k':
                output += date.getHours();
                break;
            case 'l':
                output += _get12Hour(date.getHours())
                break;
            case 'm':
                let month = date.getMonth() + 1;
                output += month.toString().padStart(2, '0');
                break;
            case 'n':
                output += '\n'
                break;
            case 'p':
                output += (date.getHours() < 12) ? 'AM' : 'PM';
                break;
            case 'r':
                const MERIDIEM = (date.getHours() < 12) ? 'AM' : 'PM'
                output += _get12Hour(date.getHours()).toString().padStart(2, '0')
                    + ':' + date.getMinutes().toString().padStart(2, '0')
                    + ':' + date.getSeconds().toString().padStart(2, '0')
                    + ' ' + MERIDIEM;
                break;
            case 's':
                output += date.getTime();
                break;
            case 'w':
                output += date.getDay();
                break;
            case 'x':
                output += date.toLocaleDateString();
                break;
            case 'y':
                output += date.getFullYear().toString().slice(-2);
                break;
            case 'z':
                let timeoffset = date.toString().match(/([-\+][0-9]+)\s/)[1];
                output += timeoffset;
                break;
            default:
                output += '%' + format.charAt(i);
                break;
            }
        } else {
            output += ch;
        }

        i++;
    }

    return output;
}

///
/// Get the full weekday name.
///
/// @param {number} dayAsInt - Weekday as an integer where: 0=Sunday, ..., 6=Saturday.
/// @return {string} Full weekday e.g. Sunday, Monday, etc.
/// @todo Return localised strings.
///
function _getWeekdayLong(dayAsInt) {
    switch(dayAsInt) {
    case 0:
        return 'Sunday';

    case 1:
        return 'Monday';

    case 2:
        return 'Tuesday';

    case 3:
        return 'Wednesday';

    case 4:
        return 'Thursday';

    case 5:
        return 'Friday';

    case 6:
        return 'Saturday';

    default:
        throw 'Illegal value for dayAsInt.' 
    }
}

///
/// Get an abbreviated weekday name.
///
/// @param {number} dayAsInt - Weekday as an integer where: 0=Sun, ..., 6=Sat.
/// @return {string} Abbreviated weekday e.g. Sun, Mon, etc.
/// @todo Return localised strings.
///
function _getWeekdayShort(dayAsInt) {
    switch(dayAsInt) {
    case 0:
        return 'Sun';

    case 1:
        return 'Mon';

    case 2:
        return 'Tue';

    case 3:
        return 'Wed';

    case 4:
        return 'Thu';

    case 5:
        return 'Fri';

    case 6:
        return 'Sat';

    default:
        throw 'Illegal value for dayAsInt.' 
    }
}

///
/// Get the full month name.
///
/// @param {number} monthAsInt - Month as an integer where: 0=January, ..., 11=December.
/// @return {string} Full month e.g. January, February, etc.
/// @todo Return localised strings.
///
function _getMonthLong(monthAsInt) {
    switch(monthAsInt) {
    case 0:
        return 'January';
        
    case 1:
        return 'February';
        
    case 2:
        return 'March';
        
    case 3:
        return 'April';
        
    case 4:
        return 'May';
        
    case 5:
        return 'June';
        
    case 6:
        return 'July';
        
    case 7:
        return 'August';
                          
    case 8:
        return 'September';
           
    case 9:
        return 'October';
                          
    case 10:
        return 'November';
        
    case 11:
        return 'December';

    default:
        throw 'Illegal value for monthAsInt.';
    }
}

///
/// Get the abbreviated month name.
///
/// @param {number} monthAsInt - Month as an integer where: 0=January, ..., 11=December.
/// @return {string} Abbreviated month e.g. Jan, Feb, etc.
/// @todo Return localised strings.
///
function _getMonthShort(monthAsInt) {
    switch(monthAsInt) {
    case 0:
        return 'Jan';
        
    case 1:
        return 'Feb';
        
    case 2:
        return 'Mar';
        
    case 3:
        return 'Apr';
        
    case 4:
        return 'May';
        
    case 5:
        return 'Jun';
        
    case 6:
        return 'Jul';
        
    case 7:
        return 'Aug';
                          
    case 8:
        return 'Sep';
           
    case 9:
        return 'Oct';
                          
    case 10:
        return 'Nov';
        
    case 11:
        return 'Dec';

    default:
        throw 'Illegal value for monthAsInt.';
    }
}

///
/// Get the 12-hour clock hour.
///
/// @param {number} hourAsInt - The hour in 24-hour clock style.
/// @return {number} Hour in 12-hour clock style.
/// @todo Return localised strings.
///
function _get12Hour(hourAsInt) {
    if (hourAsInt > 12) {
        return hourAsInt - 12;
    }

    if (hourAsInt == 0) {
        return 12;
    }

    return hourAsInt;
}
