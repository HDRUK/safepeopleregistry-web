import {
  mockedValidationComment,
  mockedValidationLog,
} from "@/mocks/data/validation_log";
import { faker } from "@faker-js/faker";
import { useMutation } from "@tanstack/react-query";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { ValidationLog } from "../../types/logs";
import {
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
} from "../../utils/testUtils";
import ActionValidationPanel from "./ActionValidationPanel";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const mockedValidationLogs = (count = 5): ValidationLog[] =>
  Array.from({ length: count }, () => mockedValidationLog());

const renderActionValidationPanel = (
  logs = mockedValidationLogs(),
  isLoading = false
) => {
  return render(
    <ActionValidationPanel
      variant="ProjectUser"
      logs={logs}
      queryState={{ isLoading, isError: false }}
    />
  );
};

describe("<ActionValidationPanel/>", () => {
  let mockUpdateLog: jest.Mock;
  let mockCreateComment: jest.Mock;

  beforeEach(() => {
    mockUseStore({
      getCurrentOrganisation: () =>
        mockedOrganisation({
          system_approved: true,
        }),
    });

    mockUpdateLog = jest.fn().mockImplementation(query => {
      return Promise.resolve({
        data: {
          id: faker.number.int(),
          completed_at:
            query === "more" ? null : faker.date.recent().toISOString(),
          manually_confirmed: query === "pass" ? 1 : 0,
        },
      });
    });
    mockCreateComment = jest.fn().mockImplementation(() => Promise.resolve({}));

    (useMutation as jest.Mock).mockImplementation(queryFn => {
      const name = queryFn.mutationKey[0];
      if (name === "putValidationLogQuery")
        return { mutateAsync: mockUpdateLog };
      if (name === "postValidationLogCommentQuery")
        return { mutateAsync: mockCreateComment };
      return {
        mutateAsync: jest.fn().mockImplementation(() => Promise.resolve({})),
      };
    });
  });

  it("test it can pass a validation check", async () => {
    const log = mockedValidationLog({ completed_at: null, comments: [] });

    renderActionValidationPanel([log]);
    let passButton = screen.getByTestId("validation-log-initial-pass");
    expect(passButton).toBeInTheDocument();

    const failButton = screen.getByTestId("validation-log-initial-fail");
    expect(failButton).toBeInTheDocument();

    await userEvent.click(passButton);

    let confirmPassButton = screen.getByTestId("validation-log-confirm-button");
    expect(confirmPassButton).toBeInTheDocument();

    const cancelPassButton = screen.getByTestId(
      "validation-log-cancel-confirm-button"
    );
    expect(cancelPassButton).toBeInTheDocument();

    await userEvent.click(cancelPassButton);

    passButton = screen.getByTestId("validation-log-initial-pass");
    expect(passButton).toBeInTheDocument();

    await userEvent.click(passButton);

    confirmPassButton = screen.getByTestId("validation-log-confirm-button");

    await userEvent.click(confirmPassButton);

    const commentInput = screen.getByRole("textbox", {
      name: /add any further comment/i,
    });

    expect(commentInput).toBeInTheDocument();
    await userEvent.type(commentInput, "This is a test comment");

    await userEvent.click(confirmPassButton);

    const passedChip = screen.getByTestId("VerifiedUserOutlinedIcon");
    expect(passedChip).toBeInTheDocument();

    const passedText = screen.getByText(/Passed/i);
    expect(passedText).toBeInTheDocument();
  });

  it("test it can fail a validation check", async () => {
    const log = mockedValidationLog({ completed_at: null, comments: [] });
    renderActionValidationPanel([log]);

    const failButton = screen.getByTestId("validation-log-initial-fail");
    expect(failButton).toBeInTheDocument();

    await userEvent.click(failButton);

    const commentInput = screen.getByRole("textbox", {
      name: /add any further comment/i,
    });

    expect(commentInput).toBeInTheDocument();
    await userEvent.type(commentInput, "This is a test comment");

    const confirmFailButton = screen.getByTestId(
      "validation-log-confirm-button"
    );

    await userEvent.click(confirmFailButton);

    const failedChip = screen.getByTestId("GppBadOutlinedIcon");
    expect(failedChip).toBeInTheDocument();

    const failedText = screen.getByText(/Failed/i);
    expect(failedText).toBeInTheDocument();
  });

  it("test it can change a decision check", async () => {
    const log = mockedValidationLog({ completed_at: null, comments: [] });
    renderActionValidationPanel([log]);

    const failButton = screen.getByTestId("validation-log-initial-fail");
    expect(failButton).toBeInTheDocument();

    await userEvent.click(failButton);

    let commentInput = screen.getByRole("textbox", {
      name: /add any further comment/i,
    });
    expect(commentInput).toBeInTheDocument();
    await userEvent.type(commentInput, "This is a test comment");

    let confirmButton = screen.getByTestId("validation-log-confirm-button");

    await userEvent.click(confirmButton);

    const failedChip = screen.getByTestId("GppBadOutlinedIcon");
    expect(failedChip).toBeInTheDocument();

    const failedText = screen.getByText(/Failed/i);
    expect(failedText).toBeInTheDocument();

    const changeDecisionButton = screen.getByTestId(
      "validation-log-change-decision"
    );
    expect(changeDecisionButton).toBeInTheDocument();

    await userEvent.click(changeDecisionButton);

    const passButton = screen.getByTestId("validation-log-initial-pass");
    expect(passButton).toBeInTheDocument();

    await userEvent.click(passButton);

    commentInput = screen.getByRole("textbox", {
      name: /add any further comment/i,
    });
    expect(commentInput).toBeInTheDocument();
    await userEvent.type(commentInput, "Changing my descision");

    confirmButton = screen.getByTestId("validation-log-confirm-button");

    await userEvent.click(confirmButton);

    const passedChip = screen.getByTestId("VerifiedUserOutlinedIcon");
    expect(passedChip).toBeInTheDocument();

    const passedText = screen.getByText(/Passed/i);
    expect(passedText).toBeInTheDocument();
  });

  it("test it can just add a comment", async () => {
    const log = mockedValidationLog({ completed_at: null, comments: [] });
    renderActionValidationPanel([log]);

    const moreButton = screen.getByTestId("validation-log-initial-comment");
    expect(moreButton).toBeInTheDocument();

    await userEvent.click(moreButton);

    const addCommentButton = await screen.findByTestId(
      "validation-log-add-more-info"
    );
    expect(addCommentButton).toBeInTheDocument();

    await userEvent.click(addCommentButton);

    const commentInput = screen.getByRole("textbox", {
      name: /add any further comment/i,
    });
    expect(commentInput).toBeInTheDocument();
    await userEvent.type(commentInput, "This is a test comment");

    const confirmButton = screen.getByTestId("validation-log-confirm-button");

    await userEvent.click(confirmButton);

    const passButton = screen.getByTestId("validation-log-initial-pass");
    expect(passButton).toBeInTheDocument();
  });

  it("test it can pass a validation check", async () => {
    const log = mockedValidationLog({
      id: 1,
      completed_at: faker.date.recent().toISOString(),
      comments: Array.from({ length: 10 }, () => mockedValidationComment()),
    });

    renderActionValidationPanel([log]);
    const viewMoreBox = screen.getByTestId("view-more-box");
    expect(viewMoreBox).toBeInTheDocument();

    const items = viewMoreBox.children;

    expect(items.length).toBe(3);

    const viewMoreButton = screen.getByTestId("view-more-button");
    expect(viewMoreButton).toBeInTheDocument();

    await userEvent.click(viewMoreButton);

    expect(items.length).toBe(11);
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderActionValidationPanel());
  });
});
