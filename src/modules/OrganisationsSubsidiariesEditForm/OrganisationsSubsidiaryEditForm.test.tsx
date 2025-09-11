import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";

import { useTranslations } from "next-intl";
import { mockedSubsidiary } from "@/mocks/data/organisation";
import OrganisationsSubsidiaryEditForm, {
  OrganisationsSubsidiaryEditFormProps,
} from "./OrganisationsSubsidiaryEditForm";

const defaultProps: OrganisationsSubsidiaryEditFormProps = {
  mutateState: { isPending: false, isError: false, isSuccess: false },
  onSubmit: jest.fn(),
  defaultValues: mockedSubsidiary(),
};

const TestComponent = (
  props?: Partial<OrganisationsSubsidiaryEditFormProps>
) => {
  const t = useTranslations("Organisations.Subsidiaries");

  return <OrganisationsSubsidiaryEditForm {...defaultProps} {...props} t={t} />;
};

const setupTest = (props?: Partial<OrganisationsSubsidiaryEditFormProps>) => {
  return render(<TestComponent {...props} />);
};

function getAllInputs() {
  return [
    /Name/i,
    /Address 1/i,
    /Address 2/i,
    /Town \/ City/i,
    /County/i,
    /Postcode/i,
    /Organisation website/i,
  ];
}

describe("<OrganisationsSubsidiaryEditForm />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getByLabelText(selector)).toBeInTheDocument();
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", { name: "Edit subsidiary" });
    fireEvent.submit(form);

    const {
      address_1,
      address_2,
      country,
      county,
      postcode,
      name,
      town,
      website,
    } = defaultProps.defaultValues;

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith({
        address_1,
        address_2,
        country,
        county,
        postcode,
        name,
        town,
        website,
      });
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    clearInputsByLabelText(getAllInputs());

    const form = await screen.findByRole("form", { name: "Edit subsidiary" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
