import { Status } from "@/consts/application";
import {
  mockedCustodianHasProjectUser,
  mockedProjectHasUser,
} from "@/mocks/data/custodian";
import { mockedUser } from "@/mocks/data/user";
import { render, screen } from "@/utils/testUtils";
import ProjectUsersBoard from "./ProjectUsersBoard";

const routes = {
  name: { path: "/projects/:id/users/:userId" },
};

type ItemsByTransitions = Parameters<
  typeof ProjectUsersBoard
>[0]["itemsByTransitions"];

function setupTest(itemsByTransitions: ItemsByTransitions) {
  return render(
    <ProjectUsersBoard
      itemsByTransitions={itemsByTransitions}
      onMove={jest.fn()}
      onDragEnd={jest.fn()}
      updateQueryState={{ isError: false, isSuccess: false }}
      routes={routes}
    />
  );
}

describe("<ProjectUsersBoard />", () => {
  it("shows users who have been invited to the project", () => {
    // Fixed name: the mocks default to faker values, which can collide with
    // other text on the card
    const projectUser = mockedProjectHasUser({ id: 24 });
    const invitedUser = mockedCustodianHasProjectUser({
      id: 24,
      project_has_user: {
        ...projectUser,
        registry: {
          ...projectUser.registry,
          user: mockedUser({ first_name: "Jane", last_name: "Doe" }),
        },
      },
      model_state: { state: { slug: Status.INVITED } },
    });

    setupTest({
      [Status.INVITED]: [invitedUser],
      [Status.PENDING]: [],
    });

    expect(screen.getByText("Invited (1)")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });
});
