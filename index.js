const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const emailRegex = /\S+@\.\S+/; 
const teamArray = [];
//inquirer prompts to go here
addManager = () => {
  console.log("Enter team Info");
  inquirer.prompt([
    {
      type: "input",
      message: "Enter Manager's name?",
      name: "managersName",
      validate: (answer) => {
        if (answer === "") {
          console.log("Please enter a name for the team Manager");
          return false;
        }
        return true;
      },
    },
    {
      type: "number",
      message: "Enter Manager's Id number?",
      name: "managersId",
      validate: answer => {
        if (answer <= 0) {
          console.log();("Please enter managers");
          return false;
        }
        return true;
      }
    },
    {
      type: "input",
      message: "Enter Manager's Email?",
      name: "managersEmail",
      validate: email => {
        if(emailRegex.test(email.value)) {
          return false;
        } else {
          return true;
        }
      }
    },
    {
      type: "number",
      message: "Enter Manager's office number?",
      name: "managersOfficeNum",
      validate: answer => {
        if (answer == "") {
          console.log("Please Enter a valid number?");
          return false;
        } else {
          return true;
        }
      }
    },


  ]).then((answers => {
    const manager = new Manager(
      answers.managersName,
      answers.managersId,
      answers.managersEmail,
      answers.managersOfficeNum
      );
      teamArray.push(manager);
      addEmployee();
  })
  );
};
addManager()
addEngineer = () => {
  console.log("Enter team Info");
  inquirer.prompt([
    {
      type: "input",
      message: "Enter Manager's name?",
      name: "engineersName",
      validate: (answer) => {
        if (answer === "") {
          console.log("Please enter a name for the Engineer");
          return false;
        }
        return true;
      },
    },
    {
      type: "number",
      message: "Enter Engineers's Id number?",
      name: "engineersId",
      validate: answer => {
        if (answer <= 0) {
          console.log();("Please enter managers");
          return false;
        }
        return true;
      }

    }

  ])
}
const addEmployee = () => {
  return (
    inquirer
    .prompt([
      {
        type: list,
        message: "Please enter Employee role for next memeber or select done to finsh and exit?",
        name: "employeeRole",
        choices: ["Engineer", "Intern", "Done!"]
      }
    ])
  )
}

