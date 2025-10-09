import { ActionMenu } from "@/components/ActionMenu";
import KanbanBoardActionsMenuItems from "@/modules/KanbanBoard/KanbanBoardActionMenuItems";
import {
  CustodianProjectOrganisation,
  Translations,
  WithTranslations,
} from "@/types/application";

type ProjectOrganisationsActionsProps<T = CustodianProjectOrganisation> =
  WithTranslations<{
    data: T;
    onMoveClick: (id: number, status: string) => void;
    allowedTransitions: string[];
    tStatus: Translations;
  }>;

export default function ProjectOrganisationsActions({
  onMoveClick,
  allowedTransitions,
  data,
  tStatus,
  ...restProps
}: ProjectOrganisationsActionsProps) {
  return (
    <ActionMenu
      disabled={!data.project_organisation.organisation.system_approved}>
      {({ handleClose }) => (
        <KanbanBoardActionsMenuItems
          onMoveClick={(id: number, status: string) => {
            onMoveClick(id, status);

            handleClose();
          }}
          allowedTransitions={allowedTransitions}
          data={data}
          handleClose={handleClose}
          tStatus={tStatus}
          {...restProps}
        />
      )}
    </ActionMenu>
  );
}
