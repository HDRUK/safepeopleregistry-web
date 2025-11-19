const VALIDATION_CE_CERTIFICATION_NUMBER = /^[\w]{4}$/;

const VALIDATION_DSPTK_CERTIFICATION_NUMBER = /^DSPTK-\d{4}-\d{5}$/;

const VALIDATION_ORC_ID = /^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/;

const VALIDATION_ROR_ID = /^0[a-hj-km-np-tv-z|0-9]{6}[0-9]{2}$/;

const VALIDATION_URL = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;

const VALIDATION_CHARITY_ID = /^[A-Za-z0-9]{8}/;

const VALIDATION_INTEGRATION_ID = /^[A-Za-z0-9]{40}$/;

const ORGANISATION_SIZE_OPTIONS = [
  { value: 1, label: "Small (10 - 49 Employees)" },
  { value: 2, label: "Medium (50 - 249 Employees)" },
  { value: 3, label: "Large (250 or more Employees)" },
];

enum DefaultFormValuesMode {
  DB = "db",
  FORM = "form",
}

const MAX_FORM_WIDTH = "600px";

export {
  DefaultFormValuesMode,
  VALIDATION_CE_CERTIFICATION_NUMBER,
  VALIDATION_ISO_CERTIFICATION_NUMBER,
  VALIDATION_DSPTK_CERTIFICATION_NUMBER,
  VALIDATION_ORC_ID,
  VALIDATION_ROR_ID,
  VALIDATION_URL,
  VALIDATION_CHARITY_ID,
  VALIDATION_INTEGRATION_ID,
  ORGANISATION_SIZE_OPTIONS,
  MAX_FORM_WIDTH,
};
