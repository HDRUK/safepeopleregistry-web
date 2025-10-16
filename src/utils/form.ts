import { Status } from "@/consts/application";
import { TEXT_LIST_SEPARATOR } from "../config/db";
import yup from "../config/yup";
import { DefaultFormValuesMode } from "../consts/form";
import { RequestFrequency } from "../consts/projects";
import { ProjectDetails, ResearcherProject } from "../types/application";
import { DataUse } from "../types/gateway";
import { formatStringToISO, getDate } from "./date";
import { parseValidJSON } from "./json";

function getCheckboxFormValuesFromIntersection(
  parent: { label: string; id: number | string }[],
  subset: { id: number | string }[]
) {
  return parent.reduce((accumulator, currentValue) => {
    const { id } = currentValue;

    return {
      ...accumulator,
      [id]: !!subset.find(
        ({ id: subsetId }) => subsetId.toString() === id.toString()
      ),
    };
  }, {});
}

function isFieldRequired(
  schema: yup.AnyObjectSchema,
  fieldPath: string
): boolean {
  const fields = fieldPath.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentSchema: any = schema.describe();

  currentSchema = fields.reduce((acc, field) => {
    if (!acc) return null;

    if (acc.type === "array" && !Number.isNaN(Number(field))) {
      return acc.innerType || null;
    }

    return acc.fields?.[field] || null;
  }, currentSchema);

  return currentSchema ? !currentSchema.optional : false;
}

function toFieldArrayData(data: string) {
  return data
    ? decodeURIComponent(data)
        .split(TEXT_LIST_SEPARATOR)
        .map((value: string) => ({
          value,
        }))
    : [];
}

function toFieldArrayString(data: { value: string }[]) {
  return data
    .map(({ value }) => value && encodeURIComponent(value))
    .filter(value => !!value)
    .join(TEXT_LIST_SEPARATOR);
}

function transformBooleanToYesNo(value: boolean | null | undefined | number) {
  return value ? "Yes" : "No";
}

function createDataUseDefaultValues(data: DataUse) {
  return {
    ...data,
    datasets: data.datasets
      ?.map(dataset => (typeof dataset === "string" ? dataset : dataset.name))
      .filter(value => !!value) || [""],
    data_sensitivity_level: data.data_sensitivity_level || "",
    legal_basis_for_data_article6: data.legal_basis_for_data_article6 || "",
    duty_of_confidentiality: data.duty_of_confidentiality || false,
    national_data_optout: data.national_data_optout || false,
    request_frequency: data.request_frequency || RequestFrequency.ONE_OFF,
    dataset_linkage_description: data.dataset_linkage_description || "",
    access_date: data.access_date
      ? getDate(formatStringToISO(data.access_date))
      : "",
    request_category_type: data.request_category_type || "",
    lay_summary: data.lay_summary || "",
    technical_summary: data.technical_summary || "",
  };
}

function createProjectDetailDefaultValues(
  data: ProjectDetails,
  options?: { transformToReadable: boolean }
) {
  const national_data_optout = data.national_data_optout || false;
  const duty_of_confidentiality = data.duty_of_confidentiality || false;

  return {
    datasets: options?.transformToReadable
      ? parseValidJSON(data.datasets)
      : parseValidJSON(data.datasets)?.map(v => ({
          value: v,
        })) || [{ value: "" }],
    data_sensitivity_level: data.data_sensitivity_level || "",
    legal_basis_for_data_article6: data.legal_basis_for_data_article6 || "",
    duty_of_confidentiality: options?.transformToReadable
      ? transformBooleanToYesNo(duty_of_confidentiality)
      : duty_of_confidentiality,
    national_data_optout: options?.transformToReadable
      ? transformBooleanToYesNo(national_data_optout)
      : national_data_optout,
    request_frequency: data.request_frequency || RequestFrequency.ONE_OFF,
    dataset_linkage_description: data.dataset_linkage_description || "",
    access_date: data.access_date
      ? getDate(formatStringToISO(data.access_date))
      : "",
    data_minimisation: data?.data_minimisation || "",
    data_use_description: data?.data_use_description || "",
    access_type: data?.access_type || "",
    data_privacy: data?.data_privacy || "",
    research_outputs: parseValidJSON(data?.research_outputs) || [],
    data_assets: data?.data_assets || "",
  };
}

function createProjectDefaultValues(
  data?: Partial<ResearcherProject>,
  mode: DefaultFormValuesMode = DefaultFormValuesMode.FORM
) {
  const otherApprovalCommittees =
    (data?.other_approval_committees &&
      parseValidJSON(data.other_approval_committees)) ||
    [];

  return {
    ...data,
    id: data?.id,
    unique_id: data?.unique_id,
    title: data?.title || "",
    request_category_type: data?.request_category_type || "",
    start_date: data?.start_date || "",
    end_date: data?.end_date || "",
    lay_summary: data?.lay_summary || "",
    public_benefit: data?.public_benefit || "",
    technical_summary: data?.technical_summary || "",
    status: data?.model_state?.state.slug || Status.PROJECT_PENDING,
    other_approval_committees:
      mode === DefaultFormValuesMode.DB
        ? JSON.stringify(otherApprovalCommittees)
        : otherApprovalCommittees,
  };
}

export {
  createDataUseDefaultValues,
  createProjectDefaultValues,
  createProjectDetailDefaultValues,
  getCheckboxFormValuesFromIntersection,
  isFieldRequired,
  toFieldArrayData,
  toFieldArrayString,
};
