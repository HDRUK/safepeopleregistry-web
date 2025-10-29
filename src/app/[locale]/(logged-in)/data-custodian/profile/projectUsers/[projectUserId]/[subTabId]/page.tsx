import CustodianProjectUser from "./components/CustodianProjectUser";

interface PageProps {
  params: Promise<{
    id: number;
    projectUserId: number;
    subTabId: string;
  }>;
}

async function CustodianProjectUserPage({ params }: PageProps) {
  const { projectUserId, subTabId } = await params;

  return (
    <CustodianProjectUser projectUserId={projectUserId} subTabId={subTabId} />
  );
}

export default CustodianProjectUserPage;
