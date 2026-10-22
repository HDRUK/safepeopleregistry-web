import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  commonAccessibilityTests,
  render,
  screen,
  fireEvent,
} from "../../utils/testUtils";
import Table from ".";

interface TestData {
  id: number;
  name: string;
}

const mockRows = (count: number): TestData[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
  }));

describe("<Table />", () => {
  const columns: ColumnDef<TestData>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: info => info.getValue(),
    },
  ];

  const data: TestData[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  test("renders table with data", () => {
    render(
      <Table
        total={2}
        data={data}
        columns={columns}
        queryState={{ isLoading: false, isError: false }}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  test("displays error message when isError is true", () => {
    render(
      <Table
        data={[]}
        columns={columns}
        queryState={{ isLoading: false, isError: true }}
        errorMessage="Error loading data"
      />
    );

    expect(screen.getByText("Error loading data")).toBeInTheDocument();
  });

  test("handles pagination correctly", () => {
    const setPage = jest.fn();
    render(
      <Table
        data={data}
        columns={columns}
        isPaginated
        page={1}
        setPage={setPage}
        last_page={2}
        total={2}
        queryState={{ isLoading: false, isError: false }}
      />
    );

    const nextPageButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextPageButton);
    expect(setPage).toHaveBeenCalledWith(2);
  });

  test("splits the data into pages itself when setPage is not passed", () => {
    render(
      <Table
        data={mockRows(30)}
        columns={columns}
        isPaginated
        queryState={{ isLoading: false, isError: false }}
      />
    );

    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.queryByText("User 26")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.queryByText("User 1")).not.toBeInTheDocument();
    expect(screen.getByText("User 26")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(
      render(
        <Table
          data={data}
          columns={columns}
          queryState={{ isLoading: false, isError: false }}
        />
      )
    );
  });
});
