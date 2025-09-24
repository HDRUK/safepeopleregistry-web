import { Status } from "@/components/ChipStatus";
import {
  mockedCustodianHasProjectOrganisation,
  mockedCustodianHasProjectUser,
} from "@/mocks/data/custodian";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedProject } from "@/mocks/data/project";
import { EntityType } from "@/types/api";
import { formatDisplayLongDate } from "@/utils/date";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import ProjectsTable, { ProjectsTableProps } from "./ProjectsTable";

const project = mockedProject({
  organisations: [mockedOrganisation(), mockedOrganisation()],
  project_users_count: 10,
  custodian_has_project_user: [
    mockedCustodianHasProjectUser({
      model_state: {
        state: {
          slug: Status.VALIDATED,
        },
      },
    }),
  ],
  custodian_has_project_organisation: [
    mockedCustodianHasProjectOrganisation({
      model_state: {
        state: {
          slug: Status.VALIDATION_IN_PROGRESS,
        },
      },
    }),
  ],
  model_state: {
    state: {
      slug: Status.PROJECT_APPROVED,
    },
  },
});

const TestComponent = (props?: Partial<ProjectsTableProps>) => {
  const t = useTranslations("Projects");

  return (
    <ProjectsTable
      t={t}
      data={[]}
      {...props}
      total={props?.data?.length || 0}
    />
  );
};

const setupTest = (props?: Partial<ProjectsTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<ProjectsTable />", () => {
  it("renders warning message if no data", () => {
    setupTest();

    expect(
      screen.getByText(/No projects found for the current search terms./i)
    ).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [project],
      variant: EntityType.USER,
    });

    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.lay_summary)).toBeInTheDocument();
    expect(
      screen.getByText(formatDisplayLongDate(project.start_date))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDisplayLongDate(project.end_date))
    ).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(
      screen.getByText(
        `${project.organisations[0].organisation_name}, ${project.organisations[1].organisation_name}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Validated")).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [project],
      variant: EntityType.ORGANISATION,
    });

    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [project],
      variant: EntityType.CUSTODIAN,
    });

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
