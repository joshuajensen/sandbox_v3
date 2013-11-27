// FileName : DateUtil.js
define(
    [],
    function () {
        var DateUtil = function () {
        };

        // Function to get the timestamp
        DateUtil.prototype.getTimeParting = function () {
            console.log("triggered");
            var day, time, timeParting, week;
            var weekdays = new Array(7);
            weekdays[0] = "Sunday";
            weekdays[1] = "Monday";
            weekdays[2] = "Tuesday";
            weekdays[3] = "Wednesday";
            weekdays[4] = "Thursday";
            weekdays[5] = "Friday";
            weekdays[6] = "Saturday";
            var currentDate = new Date();
            var currentDay = currentDate.getDay();
            var minutes = currentDate.getMinutes();
            var hours = currentDate.getHours();
            if ((weekdays[currentDay] == "Sunday") || (weekdays[currentDay] == "Saturday")) {
                week = "Weekend";
                day = weekdays[currentDay];
            }
            else {
                week = "Weekday";
                day = weekdays[currentDay];
            }
            if ((minutes >= 0) && (minutes < 30)) {
                time = hours + ":00"
            }
            else {
                time = hours + ":30"
            }
            timeParting = week + ":" + day + ":" + time;
            console.log("timeparting", timeParting);
            return timeParting;
        }

        return DateUtil;
    }
);