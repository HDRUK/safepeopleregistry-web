import { mockedValidationLog } from "@/mocks/data/validation_log";
import { faker } from "@faker-js/faker";
import { useMutation } from "@tanstack/react-query";
import { render, screen } from "../../utils/testUtils";
import useIsCustodianViewOnly from "@/hooks/useIsCustodianViewOnly";
import ActionValidationMakeDecision from "./ActionValidationMakeDecision";

jest.mock("@/hooks/useIsCustodianViewOnly");

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const completedLog = () =>
  mockedValidationLog({
    completed_at: faker.date.recent().toISOString(),
    manually_confirmed: 1,
    comments: [],
  });

describe("<ActionValidationMakeDecision />", () => {
  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({ mutateAsync: jest.fn() });
    (useIsCustodianViewOnly as jest.Mock).mockReturnValue(false);
  });

  it("still lets the decision be changed when only disabled", () => {
    render(<ActionValidationMakeDecision log={completedLog()} disabled />);

    expect(
      screen.getByTestId("validation-log-change-decision")
    ).toBeInTheDocument();
  });

  it("hides change decision for viewers", () => {
    (useIsCustodianViewOnly as jest.Mock).mockReturnValue(true);

    render(<ActionValidationMakeDecision log={completedLog()} />);

    expect(
      screen.queryByTestId("validation-log-change-decision")
    ).not.toBeInTheDocument();
  });
});
