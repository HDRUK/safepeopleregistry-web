import { mockedProjectDetails } from "@/mocks/data/project";
import { render, screen } from "@/utils/testUtils";
import ProjectsSafeOutputsDetails from "./ProjectsSafeOutputsDetails";

const projectDetailsData = mockedProjectDetails({
  research_outputs: { research_outputs: ["http://www.hdruk.ac.uk"] },
});

describe("<ProjectsSafeDataDetails />", () => {
  it("renders warning message if no project details", () => {
    render(<ProjectsSafeOutputsDetails projectDetailsData={null} />);

    expect(
      screen.getByText(/Data does not exist for this section yet/i)
    ).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    console.log(projectDetailsData);

    render(
      <ProjectsSafeOutputsDetails projectDetailsData={projectDetailsData} />
    );

    expect(screen.getByText("http://www.hdruk.ac.uk")).toBeInTheDocument();
    expect(screen.getByText("Not set")).toBeInTheDocument();
  });
});
