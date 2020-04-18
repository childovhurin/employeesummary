//variables
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//libraries
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//fs to write file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//render function
const render = require("./lib/htmlRenderer");
//array of question prompts
const questionsArray = [
    "What is this team member's name?",
    "What is this team member's ID number?",
    "What is this team member's email?",
    "What is this team member's role?",
    "What is the office number?",
    "What is this team member's GitHub username?",
    "What is the name of this team member's school?"
];
const teamArray = [];

//create team fucntion
function createTeam() {
    inquirer
        .prompt([
            {
                type: "input",
                message: questionsArray[0],
                name: "name",
                validate: function validateName(answer) {
                    if (answer === "") {
                        console.log("Enter a valid name.")
                    }
                    return answer !== "";
                }
            },

            {
                type: "input",
                message: questionsArray[1],
                name: "id",
                validate: function validateId(answer) {
                    if (answer.trim() === "") {
                        console.log("Please enter a valid ID.")
                    }
                    return answer.trim() !== "";
                }
            },
            {
                type: "input",
                message: questionsArray[2],
                name: "email",
                validate: function validateEmail(answer) {
                    if (answer.trim() === "") {
                        console.log("Please enter a valid email.")
                    }
                    return answer.trim() !== "";
                }
            },
            {
                type: "list",
                message: questionsArray[3],
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]
            },
      
            {
                type: "input",
                message: questionsArray[4],
                name: "officeNumber",
                when: function (answer) {
                    return answer.role === "Manager"
                },
                validate: function validateOfficeNumber(answer) {
                    if (answer.trim() === "") {
                        console.log("Enter an ID.")
                    }
                    return answer.trim() !== "";
                }
            },
            {
                type: "input",
                message: questionsArray[5],
                name: "github",
                when: function (answer) {
                    return answer.role === "Engineer"
                },
                validate: function validateGithub(answer) {
                    if (answer.trim() === "") {
                        console.log("Enter your GitHub username.")
                    }
                    return answer.trim() !== "";
                }
            },
            {
                type: "input",
                message: questionsArray[6],
                name: "school",
                when: function (answer) {
                    return answer.role === "Intern"
                },
                validate: function validateOfficeNumber(answer) {
                    if (answer.trim() === "") {
                        console.log("Enter your school name.")
                    }
                    return answer.trim() !== "";
                }
            }
        ]).then((response) => {
            //the runAgain() to add new employee
            const runAgain = () => {
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Would you like to add another team member?",
                            name: "runAgain",
                            choices: ["Yes", "No"]
                        }
                    ]).then((response) => {
                        if (response.runAgain === "Yes") {
                            console.log("Creating a new team member profile");
                            createTeam();
                        } else {
                            const renderedTeamData = render(teamArray);

                            fs.writeFile(outputPath, renderedTeamData, function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Team page written!");
                                }
                            });;
                        }
                    })
            }
            //teamArray and runAgain() functions
            if (response.role === "Engineer") {
                const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
                teamArray.push(newEngineer);
                runAgain();
            } else if (response.role === "Manager") {
                const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
                teamArray.push(newManager);
                runAgain();
            } else {
                const newIntern = new Intern(response.name, response.id, response.email, response.school);
                teamArray.push(newIntern);
                runAgain();
            }
        }).catch((err) => console.log(err));
}

createTeam();
