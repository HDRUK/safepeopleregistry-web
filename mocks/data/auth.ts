import { UserGroup } from "@/consts/user";
import { Auth } from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedUser } from "./user";

const mockedJwt = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlc3RlVnhBcktnT3FUNldub05CUm9KZVNyN3FNN21qMVktTWh3R0dxYzU4In0.eyJleHAiOjE3Mzc3NTcxNzYsImlhdCI6MTczNzMyNTE3NywiYXV0aF90aW1lIjoxNzM3MzI1MTc2LCJqdGkiOiJhZmI1NTE0Ny01NTA0LTQyODQtYWVhNy04MmQxYmE0NWMwM2UiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmRldi5oZHJ1ay5jbG91ZC9yZWFsbXMvU09VUlNEIiwic3ViIjoiZjhhZWE2ODctYTMwYi00NzJjLWE0ZDctYjhhMDdiOWFkZjU2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3BlZWRpLXJlZ2lzdHJ5LWFwcCIsInNlc3Npb25fc3RhdGUiOiI3NmFkZTFlMC1jMjYxLTRiN2YtYjJiYi0xYmZkNzA4NTE4NDgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIG1pY3JvcHJvZmlsZS1qd3QgZW1haWwiLCJzaWQiOiI3NmFkZTFlMC1jMjYxLTRiN2YtYjJiYi0xYmZkNzA4NTE4NDgiLCJ1cG4iOiJ3aG9AZW1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJXIEhvIiwiZ3JvdXBzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1yZWdpc3RyeSIsInVtYV9hdXRob3JpemF0aW9uIl0sInByZWZlcnJlZF91c2VybmFtZSI6Indob0BlbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiVyIsImZhbWlseV9uYW1lIjoiSG8iLCJlbWFpbCI6Indob0BlbWFpbC5jb20ifQ.sYFb0rmcqTd9jgUjWUzuRX8g-jg1VQ4HZY5e41fC6IvB5_63mbuPDIezpav80am3-dikp62_nh8eIfxdHa5jzO_5q1RW8sgRTHxEKsYmN0_8eyHh0Wm6timHv3WTslWwTdoT4WP7QlIWoQva5joR7Iv9dctydjE8MLZe0rvHfrSRl-A6Gnf4TlKXTHsYkQ9BxHZqESITG8JiUXYvblUlVJsMMj_JtF4Z00gXMz8YSYXexeroeg-OpOF_Keie3UAT9rQaMyMvmup54_Jv7BdUlRsr8lyJiy6ZBtHQCBrRKOstu44wle6ptc86o_kXSHmecyacT-2iPXbm4jKwJsPkEw`;

const mockedRegistration = () => ({
  email: faker.internet.email().toLowerCase(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  password: "Password123!",
  password_confirm: "Password123!",
});

const mockedUserAuth = (auth?: Partial<Auth>) => ({
  access_token: mockedJwt,
  expires: 300,
  refresh_expires_in: 1800,
  refresh_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzYjZkOTViZi1lODIzLTQ3YWUtOGI4NC01MWI1ZmU1MWViZTkifQ.eyJleHAiOjE3MTc0MTI5MjgsImlhdCI6MTcxNzQxMTEyOCwianRpIjoiYjBkMzVmYmEtNzk5NS00MzM0LWEyYmMtNWMyN2VlN2FiYmVkIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuaGRydWsuY2xvdWQvcmVhbG1zL1NQZWVESS1SZWdpc3RyeSIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuZGV2LmhkcnVrLmNsb3VkL3JlYWxtcy9TUGVlREktUmVnaXN0cnkiLCJzdWIiOiJjZWZmYzMyMi05YzI5LTQyOTMtYWFkNi1hZmRiZjI4MmU2MmMiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoic3BlZWRpLXJlZ2lzdHJ5LWFwcCIsInNlc3Npb25fc3RhdGUiOiJhNmRkMWIwZi04NjIwLTQ1YWYtOTljNS1jNTIzZWM2Yjg1ZTUiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJhNmRkMWIwZi04NjIwLTQ1YWYtOTljNS1jNTIzZWM2Yjg1ZTUifQ.ocZYxtfXlRuAhseyWoWbE6xZFOOYtFMaTF9BiwkvQgY",
  token_type: "Bearer",
  "not-before-policy": 0,
  session_state: "a6dd1b0f-8620-45af-99c5-c523ec6b85e5",
  scope: "profile email",
  user: mockedUser({
    id: 2,
    first_name: "Peter",
    last_name: "Hammans",
    email: "peter.hammans@hdruk.ac.uk",
    user_group: UserGroup.USERS,
    ...auth?.user,
  }),
  ...auth,
});

export { mockedJwt, mockedUserAuth, mockedRegistration };
