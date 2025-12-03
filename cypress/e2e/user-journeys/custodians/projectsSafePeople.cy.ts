//     /** This currently isn't working due to observers not finishing */
//     // hasNewProjectUsers({
//     //   ...dataProjectUser,
//     //   model_state: {
//     //     state: {
//     //       slug: Status.PENDING,
//     //     },
//     //   },
//     // });

// import { Status } from "@/consts/application";
// import { mockedCustodianHasProjectUser } from "@/mocks/data/custodian";
// import { logout } from "cypress/support/utils/common";
// import { loginCustodian } from "cypress/support/utils/custodian/auth";
// import {
//   changePrimaryContactProjectUsers,
//   changeStatusProjectUsers,
//   goToProjectUsersList,
//   hasPrimaryContact,
//   hasProjectUsers,
//   inviteNewProjectUser,
//   removeFromProjectUsers,
// } from "cypress/support/utils/custodian/projects";
// import {
//   DEFAULT_PROJECT_INVITE_USERS,
//   DEFAULT_PROJECT_USERS_CUSTODIANS,
// } from "cypress/support/utils/data";

// const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;
// const { first_name, last_name } = dataProjectInviteUser;

// const dataProjectUser = mockedCustodianHasProjectUser({
//   ...DEFAULT_PROJECT_USERS_CUSTODIANS,
//   project_has_user: {
//     ...DEFAULT_PROJECT_USERS_CUSTODIANS.project_has_user,
//     registry: {
//       user: {
//         first_name,
//         last_name,
//       },
//     },
//   },
// });

// describe("Projects safe people journey", () => {
//   beforeEach(() => {
//     loginCustodian();

//     goToProjectUsersList();
//   });

//   after(() => {
//     logout();
//   });

// //   it("Invites a user to the project", () => {
// //     inviteNewProjectUser(dataProjectInviteUser);

// //     /** This currently isn't working due to observers not finishing */
// //     // hasNewProjectUsers({
// //     //   ...dataProjectUser,
// //     //   model_state: {
// //     //     state: {
// //     //       slug: Status.PENDING,
// //     //     },
// //     //   },
// //     // });
// //   });

//   it("Has added a user to the project", () => {
//     // Delay for observers to finish
//     cy.wait(3000);

//     hasProjectUsers({
//       ...dataProjectUser,
//       model_state: {
//         state: {
//           slug: Status.PENDING,
//         },
//       },
//     });
//   });

//   it("Changes status of an user", () => {
//     changeStatusProjectUsers(
//       { first_name, last_name },
//       Status.MORE_USER_INFO_REQ_ESCALATION_MANAGER
//     );

//     hasProjectUsers({
//       ...dataProjectUser,
//       model_state: {
//         state: {
//           slug: Status.MORE_USER_INFO_REQ_ESCALATION_MANAGER,
//         },
//       },
//     });
//   });

//   it("Makes a user a primary contact", () => {
//     changePrimaryContactProjectUsers(dataProjectUser);

//     hasPrimaryContact(dataProjectUser);
//   });

//   it("Removes a user from the project", () => {
//     removeFromProjectUsers({ first_name, last_name });

//     cy.getResultsRow().should("not.exist");
//   });
// });
