const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

 
//inquirer prompts to go here for manager initiating questions in cli
const addManager = () => {
  console.log("Enter Team Manage's Info");
  inquirer.prompt([
    {
      type: "input",
      message: "Enter Manager's name?",
      name: "name",
      validate: (name) => {
        if (name === "") {
          console.log("Please enter a name for the team Manager");
          return false;
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter Manager's Id number?",
      name: "id",
      validate: (id) => {
        if (id == "" || id == NaN || !id > 0) {
          console.log("Please enter managers Id number");
          return false;
        }
        return true;
      }
    },
    {
      type: "input",
      message: "Enter Manager's Email?",
      name: "email",
      validate: (email) => {
        if(email) {
          return true;
        } else {
          console.log("This info is required ?");
          return false;
        }
      }
    },
    {
      type: "input",
      message: "Enter Manager's office number?",
      name: "officeNumber",
      validate: (officeNumber) => {
        if (officeNumber == "" || officeNumber == NaN || !officeNumber > 0) {
          console.log("Please Enter a valid number for Managersoffice number?");
          return false;
        } else {
          return true;
        }
      }
    },


  ]).then((answers => {
    console.log(answers);
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
      );
      team.push(manager);
      addEmployee();
  })
  );
};

// prompt list for employee role selector to then switch prompt questions.
const addEmployee = () => {
  return (
    inquirer
    .prompt([
      {
        type: "list",
        message: "Choose next employee role or selct 'DONE' to finsh building team?",
        name: "employeeRole",
        choices: ["Engineer", "Intern", "Done!"],
      }
    ])
    // switch case for list input 
    .then((chosen) => {
      switch (chosen.employeeRole) {
        case "Engineer":
        addEngineer();
        break;
        case "Intern":
        addIntern();
        break;
        default:
        writeHtml();
        
        
      }
    })
  );
};

const addEngineer = () => {
  console.log("Enter Engineers Info");
  inquirer.prompt([
    {
      type: "input",
      message: "Enter Engineers's name?",
      name: "name",
      validate: (name) => {
        if (name === "") {
          console.log("Please enter a name for the Engineer");
          return false;
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter Engineers's Id number?",
      name: "engineersId",
      validate: (id) => {
        if (id === "" || id == NaN || !id > 0) {
          console.log("Please enter Engineers Id");
          return false;
        }
        return true;
      }

    },
    {
      type: "input",
      message: "Enter Engineers Email?",
      name: "engineersEmail",
      validate: (email) => {
        if(email) {
          return true;
        } else {
          console.log("This info is required ?");
          return false;
        }
      }
    },
    {
      type: "input",
      message: "Enter Engineers GitHub username?",
      name: "github",
      validate: (github) => {
        if(github) {
          return true;
        } else {
          console.log("This info is required ?");
          return false;
        }
      }
      
    }

  ])
  .then((answers => {
    console.log(answers);
    const engineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
      );
      team.push(engineer);
      addEmployee();
  })
  );
};

const addIntern = () => {
  console.log("Enter Interns Info");
  inquirer.prompt([
    {
      type: "input",
      message: "Enter Interns name?",
      name: "name",
      validate: (name) => {
        if (name === "") {
          console.log("Please enter a name for the Intern");
          return false;
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter Interns Id number?",
      name: "idd",
      validate: (id) => {
        if (id === "" || id == NaN || !id > 0) {
          console.log("Please enter Interns Id");
          return false;
        }
        return true;
      }

    },
    {
      type: "input",
      message: "Enter Interns Email?",
      name: "email",
      validate: (email) => {
        if(email) {
          return true;
        } else {
          console.log("This info is required ?");
          return false;
        }
      }
    },
    {
      type: "input",
      message: "Enter Interns School?",
      name: "school",
      validate: (school) => {
        if(school != "") {;
          return true;
        } else {
          console.log("This info is required ?");
          return false;
        }
      }
      
    }

  ])
  .then((answers => {
    const intern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
      );
      team.push(intern);
      addEmployee();
  })
  );
};


// function to generate HTML using fs write file with team array data.

function writeHtml() {
  const dom = render(team);
  fs.writeFileSync("index.html", dom, function (err) {
    if (err) throw err;
    console.log("Files written successfully! Html has been generated to local/root folder as INDEX HTML FILE!");
  });
}


  addManager();
