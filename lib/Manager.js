// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

//class import of employee
const Employee = require("./Employee");
// creating class of manager that extends the Employee class
class Manager extends Employee {
    // creating constructor and extra properties for manager
    constructor(name, id, email, officeNumber) {
        // use super to get parameters from Employee class
        super(name, id, email);

        this.officeNumber = officeNumber;

    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole() {
        return "Manager";
    }
};











module.exports = Manager;