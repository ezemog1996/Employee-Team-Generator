const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

inquirer
    .prompt([
        {
            type: "input",
            message: "Name: ",
            name: "name",
            validate(answer) {
                if (parseInt(answer) || answer.trim() === "") {
                    return "Please enter a name";
                }
                return true;
            }
        },
        {
            type: "input",
            message: "ID Number: ",
            name: "id",
            validate(answer) {
                if (isNaN(answer)) {
                    return "Please enter a number";
                }
                return true;
            }
        },
        {
            type: "input",
            message: "Email Address: ",
            name: "email",
            validate(answer) {
                if (answer.includes("@") && answer.includes(".")) {
                    return true;
                } else {return "Please enter a valid email address"}
            }
        },
        {
            type: "input",
            message: "Office Number: ",
            name: "officeNumber",
            validate(answer) {
                if (isNaN(answer)) {
                    return "Please enter a number";
                }
                return true;
            }
        }
    ]).then((response) => {
        const employees = [];

        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);

        employees.push(manager);

        function addMember() {
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "What team member do you want to add?",
                        name: "role",
                        choices: ["Engineer", "Intern", "I do not want to add any more members."]
                    },
                    {
                        type: "input",
                        message: "Name:",
                        name: "name",
                        when: (answer) => answer.role !== "I do not want to add any more members.",
                        validate(answer) {
                            if (parseInt(answer) || answer.trim() === "") {
                                return "Please enter a name";
                            }
                            return true;
                        }
                    },
                    {
                        type: "input",
                        message: "ID Number: ",
                        name: "id",
                        when: (answer) => answer.role !== "I do not want to add any more members.",
                        validate(answer) {
                            if (isNaN(answer)) {
                                return "Please enter a number";
                            }
                            return true;
                        }
                    },
                    {
                        type: "input",
                        message: "Email Address: ",
                        name: "email",
                        when: (answer) => answer.role !== "I do not want to add any more members.",
                        validate(answer) {
                            if (answer.includes("@") && answer.includes(".")) {
                                return true;
                            } else {return "Please enter a valid email address"}
                        }
                    },
                    {
                        type: "input",
                        message: "GitHub Username: ",
                        name: "github",
                        when: (answers) => answers.role === "Engineer"
                    },
                    {
                        type: "input",
                        message: "School: ",
                        name: "school",
                        when: (answers) => answers.role === "Intern"
                    }
                ]).then((response) => {
                    if (response.role === "Engineer") {
                        const engineer = new Engineer(response.name, response.id, response.email, response.github);
                        employees.push(engineer);
                        addMember();
                    } else if (response.role === "Intern") {
                        const intern = new Intern(response.name, response.id, response.email, response.school);
                        employees.push(intern);
                        addMember();
                    } else {fs.writeFileSync(OUTPUT_DIR + "/team.html", render(employees), "utf8")}
                })
        }
        addMember();
    })

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



//ask manager the questions

//.then(() => {
//  creat the new instance of Manager = new Manager(answer.name,anser.id,answer.email,answer.officeNumber)
// push the new namager to the array above 
//  ask if they want to create another employee intern or engineer
    //.then(() => {
    // switch no more menbers
        //writeFileSync(redner (arrayOfEmployeeInstances): string)
    //})
//})