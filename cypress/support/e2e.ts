Cypress.on("uncaught:exception", err => {
  return !/unknown/i.test(err.message);
});
Cypress.on("window:before:load", (win) => {
  const style = win.document.createElement("style");
  style.innerHTML = `
    input[type="date"] {
      -webkit-appearance: none !important;
      -moz-appearance: textfield !important;
    }
  `;
  win.document.head.appendChild(style);
});
import "./commands";
