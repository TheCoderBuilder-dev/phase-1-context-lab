function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timestamp) {
    if (typeof timestamp !== "string" || !timestamp.includes(" ")) {
        throw new Error("Invalid timestamp format in createTimeInEvent");
    }
    let [date, hour] = timestamp.split(" ");
    if (!date || isNaN(hour)) {
        throw new Error("Invalid timestamp values in createTimeInEvent");
    }
    employee.timeInEvents.push({ type: "TimeIn", date, hour: Number(hour) });
    return employee;
}

function createTimeOutEvent(employee, timestamp) {
    if (typeof timestamp !== "string" || !timestamp.includes(" ")) {
        throw new Error("Invalid timestamp format in createTimeOutEvent");
    }
    let [date, hour] = timestamp.split(" ");
    if (!date || isNaN(hour)) {
        throw new Error("Invalid timestamp values in createTimeOutEvent");
    }
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: Number(hour) });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(e => e.date === date)?.hour;
    let timeOut = employee.timeOutEvents.find(e => e.date === date)?.hour;
    if (timeIn === undefined || timeOut === undefined) {
        return 0; // Return 0 instead of throwing an error
    }
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(e => e.date);
    return eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate(this, d), 0);
};

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, emp) => total + allWagesFor.call(emp), 0);
}

// Exporting functions if needed for testing
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
