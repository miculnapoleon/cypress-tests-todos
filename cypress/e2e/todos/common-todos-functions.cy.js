export function typeInput(selector, text) {
    cy.get(selector).type(`${text}{enter}`);
}

export function generateTodos(index, selector, text) {
    for (let i = 0; i < index; i++) {
        typeInput(selector, `${text} ${i}`);
    }
}

export function removeTodos(selector) {
    cy.get(selector)
        .should('have.length.gte', 0)
        .then(function (todos) {
            if (!todos.length) {
                cy.log('nothing to delete')
                return
            }
            cy.wrap(todos)
                .find('.destroy')
                .click({ force: true, multiple: true })
        });
}

export function checkTodo(selector, todo) {
    cy.contains(selector, todo)
        .find('[type="checkbox"]')
        .not('[disabled]')
        .check()
        .should('be.checked');
} 