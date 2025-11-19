import {
  VALIDATION_CE_CERTIFICATION_NUMBER,
  VALIDATION_DSPTK_CERTIFICATION_NUMBER,
} from "@/consts/form";
import yup from "@/config/yup";
import { Organisation } from "@/types/application";
import { getDate } from "@/utils/date";

export interface SecurityCompilanceFormData {
  ce_certification_num?: string;
  ce_expiry_date?: Date;
  ce_expiry_evidence?: number;
  ce_plus_certification_num?: string;
  ce_plus_expiry_date?: Date;
  ce_plus_expiry_evidence?: number;
  iso_27001_certification_num?: string;
  iso_expiry_date?: Date;
  iso_expiry_evidence?: number;
  dsptk_ods_code?: string;
  dsptk_expiry_date?: Date;
  dsptk_expiry_evidence?: number;
}

export const getValidation = (t: (key: string) => string) =>
  yup.object<FormData>({
    ce_certification_num: yup
      .string()
      .optional()
      .matches(VALIDATION_CE_CERTIFICATION_NUMBER, {
        message: t("ceCertificationNumberInvalid"),
        excludeEmptyString: true,
      }),
    ce_expiry_date: yup
      .date()
      .nullable()
      .when("ce_certification_num", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("ceExpiryDateRequired")),
        otherwise: schema => schema.notRequired(),
      }),
    ce_expiry_evidence: yup
      .number()
      .nullable()
      .when("ce_expiry_date", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("ceExpiryEvidenceRequired")),
        otherwise: schema => schema.notRequired(),
      }),
    ce_plus_certification_num: yup
      .string()
      .optional()
      .matches(VALIDATION_CE_CERTIFICATION_NUMBER, {
        message: t("cePlusCertificationNumberInvalid"),
        excludeEmptyString: true,
      }),
    ce_plus_expiry_date: yup
      .date()
      .nullable()
      .when("ce_plus_certification_num", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("cePlusExpiryDateRequired")),
        otherwise: schema => schema.notRequired(),
      }),
    ce_plus_expiry_evidence: yup
      .number()
      .nullable()
      .when("ce_plus_expiry_date", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("cePlusExpiryEvidenceRequired")),
        otherwise: schema => schema.notRequired(),
      }),

    iso_27001_certification_num: yup.string().optional(),
    iso_expiry_date: yup
      .date()
      .nullable()
      .when("iso_27001_certification_num", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("isoExpiryDateRequired")),
        otherwise: schema => schema.notRequired(),
      }),
    iso_expiry_evidence: yup
      .number()
      .nullable()
      .when("iso_expiry_date", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("isoExpiryEvidenceRequired")),
        otherwise: schema => schema.notRequired(),
      }),

    dsptk_ods_code: yup
      .string()
      .optional()
      .matches(VALIDATION_DSPTK_CERTIFICATION_NUMBER, {
        message: t("dsptkOdsCodeInvalid"),
        excludeEmptyString: true,
      }),
    dsptk_expiry_date: yup
      .date()
      .nullable()
      .when("dsptk_ods_code", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("dsptkExpiryDateRequired")),
        otherwise: schema => schema.notRequired(),
      }),
    dsptk_expiry_evidence: yup
      .number()
      .nullable()
      .when("dsptk_expiry_date", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("dsptkExpiryEvidenceRequired")),
        otherwise: schema => schema.notRequired(),
      }),
  });

export const getDefaultValues = (
  organisation?: Organisation
): SecurityCompilanceFormData => ({
  ce_certification_num: organisation?.ce_certification_num || "",
  ce_expiry_date: getDate(organisation?.ce_expiry_date),
  ce_expiry_evidence: organisation?.ce_expiry_evidence?.id,
  ce_plus_certification_num: organisation?.ce_plus_certification_num || "",
  ce_plus_expiry_date: getDate(organisation?.ce_plus_expiry_date),
  ce_plus_expiry_evidence: organisation?.ce_plus_expiry_evidence?.id,
  iso_27001_certification_num: organisation?.iso_27001_certification_num || "",
  iso_expiry_date: getDate(organisation?.iso_expiry_date),
  iso_expiry_evidence: organisation?.iso_expiry_evidence?.id,
  dsptk_ods_code: organisation?.dsptk_ods_code || "",
  dsptk_expiry_date: getDate(organisation?.dsptk_expiry_date),
  dsptk_expiry_evidence: organisation?.dsptk_expiry_evidence?.id,
});

export type Certification = {
  name: string;
  certificationNum: keyof SecurityCompilanceFormData;
  certificationExpiryDate: keyof SecurityCompilanceFormData;
  certificationEvidence: keyof SecurityCompilanceFormData;
};

export const certificationRows: Certification[] = [
  {
    name: "ceCertified",
    certificationNum: "ce_certification_num",
    certificationExpiryDate: "ce_expiry_date",
    certificationEvidence: "ce_expiry_evidence",
  },
  {
    name: "cePlusCertified",
    certificationNum: "ce_plus_certification_num",
    certificationExpiryDate: "ce_plus_expiry_date",
    certificationEvidence: "ce_plus_expiry_evidence",
  },
  {
    name: "iso27001Certified",
    certificationNum: "iso_27001_certification_num",
    certificationExpiryDate: "iso_expiry_date",
    certificationEvidence: "iso_expiry_evidence",
  },
  {
    name: "dsptkCertified",
    certificationNum: "dsptk_ods_code",
    certificationExpiryDate: "dsptk_expiry_date",
    certificationEvidence: "dsptk_expiry_evidence",
  },
];

export type CertificationName = (typeof certificationRows)[number]["name"];
