import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { AffiliationEndDateSource } from "@/consts/user";
import { mockedAffiliation } from "@/mocks/data/user";
import { EntityType } from "@/types/api";
import AffiliationsForm from "./AffiliationsForm";

const mockSubmit = jest.fn();
const mockOnClose = jest.fn();

const renderAffiliationsComponent = () => {
  const rendered = render(
    <AffiliationsForm
      onSubmit={mockSubmit}
      queryState={{
        isPending: false,
        isError: false,
        error: "",
      }}
      onClose={mockOnClose}
    />
  );

  const button = screen.getByRole("button", { name: /save/i });

  act(() => {
    fireEvent.click(button);
  });

  return rendered;
};

describe("<AffiliationsForm />", () => {
  it.each(["organisation_id", "member_id", "relationship"])(
    "does not submit when %s is not defined",
    async fieldName => {
      const { container } = renderAffiliationsComponent();

      const input = container.querySelector(`input[name=${fieldName}]`);

      if (input) {
        fireEvent.change(input, { target: { value: faker.string.sample() } });

        const button = screen.getByRole("button", { name: /save/i });

        await act(() => {
          fireEvent.submit(button);
        });

        expect(button).not.toBeDisabled();

        await waitFor(() => {
          expect(mockSubmit).not.toHaveBeenCalled();
        });
      } else {
        fail("Could not find input");
      }
    }
  );

  it("does not ask whether the affiliation is current", () => {
    renderAffiliationsComponent();

    expect(
      screen.queryByLabelText(/current employer/i)
    ).not.toBeInTheDocument();
  });

  it("locks the end date once the Organisation has recorded it", () => {
    render(
      <AffiliationsForm
        onSubmit={mockSubmit}
        queryState={{
          isPending: false,
          isError: false,
          error: "",
        }}
        onClose={mockOnClose}
        entityId={1}
        entityType={EntityType.USER}
        initialValues={mockedAffiliation({
          to: "2030-06-30",
          end_date_source: AffiliationEndDateSource.ORGANISATION,
        })}
      />
    );

    expect(
      screen.getByText(/Your Organisation has recorded this end date/)
    ).toBeInTheDocument();
  });

  it("offers no cancel button when there is nothing to cancel back to", () => {
    render(
      <AffiliationsForm
        onSubmit={mockSubmit}
        queryState={{ isPending: false, isError: false, error: "" }}
        entityId={1}
        entityType={EntityType.USER}
      />
    );

    expect(
      screen.queryByRole("button", { name: /cancel/i })
    ).not.toBeInTheDocument();
  });

  it("locks the organisation when asked to", () => {
    const { container } = render(
      <AffiliationsForm
        onSubmit={mockSubmit}
        queryState={{ isPending: false, isError: false, error: "" }}
        entityId={1}
        entityType={EntityType.USER}
        initialValues={{ organisation_id: 1 }}
        lockOrganisation
      />
    );

    expect(
      container.querySelector("input[name=organisation_id]")
    ).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderAffiliationsComponent());
  });
});
