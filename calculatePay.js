function calculateYearlyPay(startDay, baseHourlyRate, startShift) {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const workCycle = 4; // 4 days on, 4 days off
    const shiftHours = 11; // 11 hours per shift
    const totalDays = 365; // Total days in a year
    let totalPay = 0;

    // Get the index of the starting day
    let currentDayIndex = daysOfWeek.indexOf(startDay);
    if (currentDayIndex === -1) {
        console.error("Invalid start day. Please use a valid day of the week.");
        return;
    }

    // Function to calculate the hourly rate for a given day
    function calculateHourlyRate(dayName, isNightShift) {
        let rate = baseHourlyRate;

        if (["Saturday", "Sunday"].includes(dayName)) {
            // Saturdays and Sundays: add 41% or 81%
            rate += dayName === "Saturday" ? baseHourlyRate * 0.41 : baseHourlyRate * 0.81;
        } else if (isNightShift) {
            // Night shifts: add 41%
            rate += baseHourlyRate * 0.41;
        }

        return rate;
    }

    // Loop through all days in the year
    for (let day = 0; day < totalDays; day++) {
        // Determine if the day is "on" or "off"
        let cyclePosition = day % (workCycle * 2); // 8-day cycle
        let isWorkingDay = cyclePosition < workCycle;

        let isNightShift = false; // Default is day shift
        if (isWorkingDay) {
            // Determine if it's a night shift
            if (startShift === "night") {
                // Adjust the first cycle to start as a night shift
                isNightShift = (cyclePosition === 0 || cyclePosition === 1); // Night shifts on Monday and Tuesday (if started on night)
            } else {
                // Default: day shift on Monday and Tuesday, night shift on Wednesday and Thursday
                isNightShift = (cyclePosition === 2 || cyclePosition === 3); // Wednesday & Thursday are night shifts
            }

            // Calculate hourly rate and daily pay
            let hourlyRate = calculateHourlyRate(daysOfWeek[currentDayIndex], isNightShift);
            let dailyPay = hourlyRate * shiftHours;

            // Add daily pay to the total pay
            totalPay += dailyPay;

            // (Optional) Log the daily pay for debugging
            console.log(
                `Day ${day + 1}: ${daysOfWeek[currentDayIndex]} - ${isNightShift ? "Night Shift" : "Day Shift"}, Pay: ${dailyPay.toFixed(2)}`
            );
        } else {
            // Log off days (optional)
            console.log(`Day ${day + 1}: ${daysOfWeek[currentDayIndex]} - Off`);
        }

        // Move to the next day in the week
        currentDayIndex = (currentDayIndex + 1) % daysOfWeek.length;
    }

    console.log(`Total pay for the year: $${totalPay.toFixed(2)}`);
    return totalPay;
}

// Example usage:
// Start on Monday, base hourly rate 12, first shift is "day"
calculateYearlyPay("Monday", 12, "day"); // First shift is Day Shift

// Example usage with a night shift starting:
// Start on Monday, base hourly rate 12, first shift is "night"
calculateYearlyPay("Monday", 12, "night"); // First shift is Night Shift
