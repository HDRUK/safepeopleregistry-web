import { mockedUser } from "@/mocks/data/user";
import { fireEvent, render, screen } from "@/utils/testUtils";
import EditDelegate from "./EditDelegate";

describe("<EditDelegate />", () => {
  it("renders the edit menu item", () => {
    render(<EditDelegate user={mockedUser()} onClick={jest.fn()} />);

    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("calls onClick with the user when clicked", () => {
    const user = mockedUser();
    const onClick = jest.fn();

    render(<EditDelegate user={user} onClick={onClick} />);

    fireEvent.click(screen.getByText("Edit"));

    expect(onClick).toHaveBeenCalledWith(user);
  });
});
