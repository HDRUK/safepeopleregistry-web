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
    disabled?: boolean;
  }>;

export default function ProjectOrganisationsActions({
  onMoveClick,
  allowedTransitions,
  data,
  tStatus,
  disabled,
  ...restProps
}: ProjectOrganisationsActionsProps) {
  return (
    <ActionMenu disabled={disabled}>
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
