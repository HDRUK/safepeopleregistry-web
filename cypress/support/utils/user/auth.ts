const loginUser = () => {
  cy.login("dan.ackroyd@ghostbusters.com", "Walk26Task!");
};

export { loginUser };
