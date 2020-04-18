//variables
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//libraries
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//These are used in the fs.writeFile
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//render function used to create the team page is required in
//htmlRenderer.js
const render = require("./lib/htmlRenderer");
//questions asked in the inquirer prompts
const questionsArray = ["What is this team member's name?", "What is this team member's ID number?", "What is this team member's email?",
    "What is this team member's role?", "What is the office number?", "What is this team member's GitHub username?",
    "What is the name of this team member's school?"];
//The array to which employee objects are pushed after all 
//inquirer prompts are answered
const teamArray = [];