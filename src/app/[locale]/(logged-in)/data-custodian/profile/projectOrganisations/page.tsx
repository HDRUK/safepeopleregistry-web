import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function ProjectOrganisationsPage() {
  return (
    <Page
      params={Promise.resolve({
        tabId: PageTabs.ORGANISATIONS,
      })}
    />
  );
}

export default ProjectOrganisationsPage;
