import {
  render,
  screen,
  fireEvent,
  waitFor,
  commonAccessibilityTests,
} from "@/utils/testUtils";
import { useMutation } from "@tanstack/react-query";
import { mockedCustodian } from "@/mocks/data/custodian";
import { getRandomString } from "@/utils/string";
import { mockUseStore } from "jest.setup";
import Integrations from "./Integrations";

const gatewayAppId = getRandomString(40);
const gatewayClientId = getRandomString(40);

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

function getAllInputs() {
  return [/Application ID/, /Client ID/];
}

describe("<Integrations />", () => {
  const mockMutateAsync = jest.fn().mockResolvedValue({ success: true });

  beforeEach(() => {
    mockUseStore({
      getCustodian: () =>
        mockedCustodian({
          id: 1,
          gateway_app_id: gatewayAppId,
          gateway_client_id: gatewayClientId,
        }),
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    jest.clearAllMocks();
  });

  it("renders the form with default values", () => {
    render(<Integrations />);

    expect(screen.getByDisplayValue(gatewayAppId)).toBeInTheDocument();
    expect(screen.getByDisplayValue(gatewayClientId)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Link your Gateway Team profile via a custom integration to the Safe People Registry so that you can sync your project information without needing to enter it in two places."
      )
    ).toBeInTheDocument();

    getAllInputs().forEach(selector => {
      expect(screen.getByLabelText(selector)).toBeInTheDocument();
    });
  });

  it("submits the form with updated values", async () => {
    render(<Integrations />);

    const inputs = getAllInputs();
    const id = getRandomString(40);

    inputs.forEach(value => {
      const element = screen.getByLabelText(value);
      fireEvent.change(element, { target: { value: id } });
    });

    const submitButton = screen.getByRole("button", {
      name: "Save",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        gateway_app_id: id,
        gateway_client_id: id,
      });
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Integrations />));
  });
});
