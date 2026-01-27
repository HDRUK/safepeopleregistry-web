import { mockedOrganisation } from "@/mocks/data/organisation";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { mockUseStore } from "jest.setup";
import OrganisationsAutomatedFlags from "./OrganisationsAutomatedFlags";

const mockSetOrganisation = jest.fn();

const mockOrganisation = mockedOrganisation();

describe("<OrganisationsAutomatedFlags />", () => {
  beforeEach(() => {
    mockUseStore({
      getCurrentOrganisation: () => mockOrganisation,
      setCurrentOrganisation: mockSetOrganisation,
    });
  });

  it("displays rules correctly", async () => {
    render(<OrganisationsAutomatedFlags />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /Data security compliance: Has Cyber Essentials or ISO27001 accreditation./i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /Data security compliance: Has Cyber Essentials Plus or ISO27001 accreditation./i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(/Data security compliance: Is DSPTK certified/i)
      ).toBeInTheDocument();

      expect(screen.getByText(/Delegate contacts/i)).toBeInTheDocument();

      expect(screen.getAllByText(/Fail/i)).toHaveLength(4);
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<OrganisationsAutomatedFlags />));
  });
});
