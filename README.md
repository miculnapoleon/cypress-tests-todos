# Project's details

1. Purpose
This project's purpose is to show some test scenarios regarding: 
- how you can add multiple todos and check that they were created (with valid and with special characters)
- how you can edit the todos name
- how you can edit the todos by giving an empty input
- how you can check/uncheck the todos and see that after a todo is checked, the list remains list-1
- how you can delete either using the close icon or by selecting a todo and then clicking on clear text link
Also this project is using actions mostly to highlight the user's behaviour.

2. Tools/Frameworks/Programming language
- I've used Cypress with Javascript because of my latest experience with Cypress UI tests and also because Cypress tests are faster, are running within the browser, are easier to debug and follow;
- I run the tests on Chrome, but you can choose from the Cypress UI - the browser

3. Structure
This project has in e2e -> todos folder the following:
- test-todos.cy.js - which is the file with all the tests and selectors
- routes.cy.js - which is the file with the routes/urls
- todo-testdata.cy.js - is the test data file which contains some variables which are passed within the tests
- common-todos-functions.cy.js - is a file which contains the re-usable functions
- package json - contains the dependencies related to the project
- .gitignore file ignores the node-modules

3.1 The test file has the following:
- Describe - describes what the tests are doing
- hooks : before (in here I navigate to the application)
- it - for the tests: contains the description of the test, the functions call, the assertions

4. How to run the tests?
- clone the repository
- make sure that you have installed node
- npm install
- in order to run the tests input the following command from the terminal: <npx cypress run>
- in order to open and see the cypress UI tests running input the following command: <npx cypress open> and then select the tests and then the browser
- or in package.json (from root folder) - you have the <scripts> object with test and open keys: you can also use these to run/open cypress tests: <npm run test>/<npm run open>
