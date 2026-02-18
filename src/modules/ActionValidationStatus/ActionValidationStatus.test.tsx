import { mockedCustodianHasProjectUser } from "@/mocks/data/custodian";
import { render, screen, userEvent } from "../../utils/testUtils";
import ActionValidationStatus, {
  UseApprovalHook,
} from "./ActionValidationStatus";

describe("<ActionValidationStatus />", () => {
  const changeValidationStatusMock = jest.fn();
  const refetchMock = jest.fn();

  const createMockHook = (
    status = "test1",
    isLoading = false
  ): UseApprovalHook<{ organisationId: number; custodianId: number }> => {
    return () => ({
      data: mockedCustodianHasProjectUser({
        model_state: { state: { slug: status } },
      }),
      changeValidationStatus: changeValidationStatusMock,
      statusOptions: [
        { label: "Test #1", value: "test1" },
        { label: "Test #2", value: "test2" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      isLoading,
      isError: false,
      refetch: refetchMock,
    });
  };

  const renderComponent = (
    hook: UseApprovalHook<{ organisationId: number; custodianId: number }>,
    hookParams = { organisationId: 1, custodianId: 2 }
  ) =>
    render(
      <ActionValidationStatus
        useApprovalHook={hook}
        hookParams={hookParams}
        disabledStatus={[]}
      />
    );

  it("it can approve", async () => {
    renderComponent(createMockHook("not_approved", false));

    expect(
      await screen.findByRole("textbox", { name: /comment/i })
    ).toBeInTheDocument();

    const commentBox = screen.getByRole("textbox", { name: /comment/i });
    const statusSelect = screen.getByRole("combobox");
    await userEvent.click(statusSelect);

    const approvedOption = await screen.findByRole("option", {
      name: /^Approved$/,
    });
    await userEvent.click(approvedOption);

    await userEvent.type(commentBox, "Approving this");

    const button = screen.getByRole("button", { name: /update status/i });
    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(changeValidationStatusMock).toHaveBeenCalledWith({
      status: "approved",
      comment: "Approving this",
    });
  });
  it("it can reject", async () => {
    renderComponent(createMockHook("approved", false));

    const commentBox = await screen.findByRole("textbox", { name: /comment/i });
    const statusSelect = screen.getByRole("combobox");
    await userEvent.click(statusSelect);

    const notApprovedOption = await screen.findByRole("option", {
      name: /^Rejected$/,
    });
    await userEvent.click(notApprovedOption);

    await userEvent.type(commentBox, "Rejecting this");

    const button = screen.getByRole("button", { name: /update status/i });
    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(changeValidationStatusMock).toHaveBeenCalledWith({
      status: "rejected",
      comment: "Rejecting this",
    });
  });
});
