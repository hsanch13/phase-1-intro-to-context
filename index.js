// Your code here
let employeeRecords = {
    firstName: "",
    familyName: "",
    title: "",
    payPerHour: "",
    timeInEvents: [],
    timeOutEvents: [],
}
// single employee record below
function createEmployeeRecord(employeeArray){
    return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
    };
}
// a collection of mulitple employee records
function createEmployeeRecords(employeeArrays){
    let employeeRecordsArray = [];

    for (let employeeArray of employeeArrays){
        let employeeRecord = createEmployeeRecord(employeeArray);
        employeeRecordsArray.push(employeeRecord);
    }
    return employeeRecordsArray
}

function createTimeInEvent(employeeRecord, dateTimeString){
    let createTimeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0],
    }
    employeeRecord.timeInEvents.push(createTimeInEvent);
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString){
    let createTimeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0],
    }
    employeeRecord.timeOutEvents.push(createTimeOutEvent);
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord) {
    let timeIn = employeeRecord.timeInEvents[0].hour;
    let timeOut = employeeRecord.timeOutEvents[0].hour;
    let hoursWorked = (timeOut - timeIn)/100;

    return hoursWorked;
}
//

function wagesEarnedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked * employeeRecord.payPerHour;
    }

    return 0;
}


// function wagesEarnedOnDate(employeeRecord) {
//     let timeIn = employeeRecord.timeInEvents[0].hour;
//     let timeOut = employeeRecord.timeOutEvents[0].hour;
//     return (timeOut - timeIn)/100 * employeeRecord.payPerHour
// }

//

function allWagesFor(employeeRecord) {
    let totalWages = 0;

    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        let date = employeeRecord.timeInEvents[i].date;

        totalWages += wagesEarnedOnDate(employeeRecord, date);
    }

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
        return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
}