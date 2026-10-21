import { render, screen } from "@/utils/testUtils";
import KanbanBoard, { KanbanBoardProps } from "./KanbanBoard";

interface Item {
  id: number;
  name: string;
}

const Card = ({ data }: { data: Item }) => <div>{data.name}</div>;

const defaultProps: KanbanBoardProps<Item> = {
  t: (key: string) => key,
  queryState: { isError: false, isSuccess: false },
  stateWorkflow: { transitions: {} },
  options: undefined,
  // KanbanBoard renders the card as <cardComponent data={item} />, but types the
  // prop as ComponentType<T> (the item itself as props), so a cast is needed
  cardComponent: Card as unknown as KanbanBoardProps<Item>["cardComponent"],
  initialData: {
    hidden_column: [{ id: 1, name: "Hidden item" }],
    read_only_column: [{ id: 2, name: "Read only item" }],
    open_column: [{ id: 3, name: "Open item" }],
  },
};

// DndItem only signals draggability through the cursor on its outer wrapper
function getDraggableWrapper(text: string) {
  return screen.getByText(text).closest("[tabindex='0']")?.parentElement
    ?.parentElement as HTMLElement;
}

function setupTest(props?: Partial<KanbanBoardProps<Item>>) {
  return render(<KanbanBoard<Item> {...defaultProps} {...props} />);
}

describe("<KanbanBoard />", () => {
  it("does not render disabled columns or their items", () => {
    setupTest({ disabledContainers: ["hidden_column"] });

    expect(screen.queryByText(/hidden_column/)).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden item")).not.toBeInTheDocument();
    expect(screen.getByText("open_column (1)")).toBeInTheDocument();
  });

  it("renders read-only columns with items that cannot be dragged", () => {
    setupTest({
      disabledContainers: ["hidden_column"],
      readOnlyContainers: ["read_only_column"],
    });

    expect(screen.getByText("read_only_column (1)")).toBeInTheDocument();
    expect(getDraggableWrapper("Read only item")).toHaveStyle({
      cursor: "not-allowed",
    });
    expect(getDraggableWrapper("Open item")).toHaveStyle({ cursor: "grab" });
  });
});
