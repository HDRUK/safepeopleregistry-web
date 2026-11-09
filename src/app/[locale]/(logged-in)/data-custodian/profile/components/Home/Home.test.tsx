import { useStore } from "@/data/store";
import { mockedCustodian } from "@/mocks/data/custodian";
import { mockedUser } from "@/mocks/data/user";
import { commonAccessibilityTests, render } from "@/utils/testUtils";
import Home, { HomeProps } from "./Home";

jest.mock("@/services/custodians");
jest.mock("@/data/store");
// Tested in its own right.
jest.mock("@/organisms/AccessRevocations", () => () => null);

const defaultCustodian = mockedCustodian();
const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultUser,
  null,
]);

const renderHome = (props?: Partial<HomeProps>) => {
  return render(<Home custodian={defaultCustodian} {...props} />);
};

describe("<Home />", () => {
  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderHome());
  });
});
