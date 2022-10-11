/// <reference types="Cypress" />
import { addTodoVariables } from './todo-testdata.cy'
const { generateTodos, removeTodos, checkTodo } = require("./common-todos-functions.cy");

const selectors = {
    footer: 'footer.info',
    formTitle: 'input.new-todo',
    todoInput: 'input[placeholder="What needs to be done?"]',
    totalTodosCountText: 'span.todo-count',
    listOfTodosContainer: 'ul.todo-list',
    todoItem: ' > li',
    todoLabel: ' label',
    checkbox: ' [type="checkbox"]',
    removeBtn: 'button.destroy',
    clearComplete: '.clear-completed',
    number: ' strong'
}

describe('Add todos into the listing', () => {

    before(() => {
        cy.navigateTo();
        cy.get(selectors.footer).should('be.visible');
    })

    it('Add 5 items and check them', () => {
        generateTodos(addTodoVariables.index, selectors.todoInput, addTodoVariables.todoInputName);
        cy.get(selectors.listOfTodosContainer + selectors.todoLabel).should('contain.text', addTodoVariables.todoInputName);
        cy.get(selectors.totalTodosCountText).should('have.text', addTodoVariables.index + ' items left');
        cy.get(selectors.listOfTodosContainer + selectors.todoItem).should('have.length', addTodoVariables.index);
    })

    it('Add 5 more items with special characters and check them', () => {
        generateTodos(addTodoVariables.index, selectors.todoInput, addTodoVariables.specialCharacters);
        cy.get(selectors.listOfTodosContainer + selectors.todoLabel).should('contain.text', addTodoVariables.todoInputName);
        cy.get(selectors.listOfTodosContainer + selectors.todoItem).its('length').should('be.gt', addTodoVariables.index);
    })

    it('Edit items name and check them', () => {
        cy.get(selectors.listOfTodosContainer + selectors.todoItem).each((item, i) => {
            cy.wrap(item).find('label').dblclick().then((el) => {
                cy.get(el[0])
                    .parent().parent().find('input.edit')
                    .clear()
                    .type(addTodoVariables.newInputName + '{enter}');
            })
            cy.get(item).find('label').should('have.text', addTodoVariables.newInputName);
        })
    })

    it('Edit items with emptying the value name and check that they are removed from the list', () => {
        cy.get(selectors.listOfTodosContainer + selectors.todoItem).each((item, i) => {
            cy.wrap(item).find('label').dblclick().then((el) => {
                cy.get(el[0])
                    .parent().parent().find('input.edit')
                    .clear()
                    .type('{enter}');
            })
        })
        cy.get(selectors.listOfTodosContainer + selectors.todoItem).should('not.exist');
    })

    it('Complete todos and then uncheck them', () => {
        generateTodos(addTodoVariables.index, selectors.todoInput, addTodoVariables.todoInputName);
        cy.get(selectors.listOfTodosContainer + selectors.checkbox)
            .not('[disabled]')
            .check()
            .should('be.checked');
        cy.get(selectors.listOfTodosContainer + selectors.checkbox)
            .not('[disabled]')
            .uncheck()
            .should('not.be.checked');
    })

    it('Remove item from the list', () => {
        removeTodos(selectors.listOfTodosContainer + selectors.todoItem);
        cy.get(selectors.listOfTodosContainer + selectors.todoItem, { timeout: 100 }).should('have.length', 0)
    })

    it('Remove item from the list using clear', () => {
        generateTodos(addTodoVariables.index, selectors.todoInput, addTodoVariables.todoInputName);

        checkTodo(selectors.listOfTodosContainer + selectors.todoItem, 'Todo 1');
        cy.get(selectors.clearComplete).should('be.visible');
        cy.get(selectors.listOfTodosContainer + selectors.todoItem).not('.completed').then((el) => {
            let countTodoAfterCheck = el.length;
            console.log(countTodoAfterCheck)
            cy.get(selectors.clearComplete).click().should('not.exist');
            cy.get(selectors.totalTodosCountText + selectors.number).invoke('text').then(parseInt)
                .should('be.a', 'number').and('equal', countTodoAfterCheck);
        })
    })
})
