import React from "react";
import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import DirectoryLink from "./DirectoryLink";

let lastRichKey: string | null = null;

// Mock next-intl
jest.mock("next-intl", () => ({
  __esModule: true,
  useTranslations: () => {
    const t = () => "";
    t.rich = (
      key: string,
      values: { link: (chunks: React.ReactNode) => JSX.Element }
    ) => {
      lastRichKey = key;

      return (
        <>
          You can use your {values.link("directory page")} to fill in the rest
        </>
      );
    };
    return t;
  },
}));

function camelCaseFromSnake(fieldName: string) {
  return fieldName.replace(/_([a-zA-Z0-9])/g, g => g[1].toUpperCase());
}

function renderWithForm({
  defaultValues,
  baseUrl,
  fieldName,
}: {
  defaultValues: Record<string, string>;
  baseUrl: string;
  fieldName: string;
}) {
  function Wrapper() {
    const methods = useForm({ defaultValues });
    return (
      <FormProvider {...methods}>
        <DirectoryLink baseUrl={baseUrl} fieldName={fieldName} />
      </FormProvider>
    );
  }

  return render(<Wrapper />);
}

describe("<DirectoryLink />", () => {
  beforeEach(() => {
    lastRichKey = null;
  });

  it("renders nothing when the watched field is undefined", () => {
    renderWithForm({
      defaultValues: {},
      baseUrl: "https://example.com?q=",
      fieldName: "ico_registration_id",
    });

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(lastRichKey).toBeNull();
  });

  it("renders a link with encoded + trimmed value appended to baseUrl", () => {
    const fieldName = "ico_registration_id";
    const baseUrl = "https://example.com/search?ref=";
    const raw = "  ABC 123/45  ";
    const trimmed = "ABC 123/45";
    const encoded = encodeURIComponent(trimmed);
    const expectedHref = `${baseUrl}${encoded}`;

    renderWithForm({
      defaultValues: { [fieldName]: raw },
      baseUrl,
      fieldName,
    });

    const link = screen.getByRole("link", { name: /directory page/i });
    expect(link).toHaveAttribute("href", expectedHref);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");

    const expectedKey = `${camelCaseFromSnake(fieldName)}DirectoryLink`;
    expect(lastRichKey).toBe(expectedKey);
  });

  it("uses baseUrl as href when value exists but trims to empty", () => {
    const fieldName = "ico_registration_id";
    const baseUrl = "https://example.com/search?ref=";

    renderWithForm({
      defaultValues: { [fieldName]: "   " },
      baseUrl,
      fieldName,
    });

    const link = screen.getByRole("link", { name: /directory page/i });
    expect(link).toHaveAttribute("href", baseUrl);
  });
});
