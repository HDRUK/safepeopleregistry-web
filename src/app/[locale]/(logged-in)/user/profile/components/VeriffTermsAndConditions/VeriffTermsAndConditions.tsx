import FormModal from "@/components/FormModal";
import { Checkbox, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import FormActions from "@/components/FormActions";
import FormModalBody from "@/components/FormModalBody";
import StartVeriffFrameButton from "./StartVeriffFrameButton";

interface VeriffTermsAndConditionsProps {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION = "VeriffTermsAndConditions";
const NAMESPACE_TRANSLATION_FORM = "Form";

export default function VeriffTermsAndConditions({
  open,
  onSuccess,
  onClose,
}: VeriffTermsAndConditionsProps) {
  const [agreed, setAgreed] = useState(false);
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const handleClose = () => {
    onClose();
    setAgreed(false);
  };

  return (
    <FormModal
      heading={t("title")}
      aria-label="verriff_terms_and_conditions_modal"
      variant="content"
      open={open}
      onClose={onClose}>
      <FormModalBody>
        <Typography>
          {t.rich("descriptionPart1", {
            ourLink: chunks => (
              <a target="_blank" href="/privacy-policy">
                {chunks}
              </a>
            ),
          })}
        </Typography>
        <Typography>
          {t.rich("descriptionPart2", {
            veriffprivacyLink: chunks => (
              <a
                target="_blank"
                href="https://www.veriff.com/privacy-notice"
                rel="noreferrer">
                {chunks}
              </a>
            ),
          })}
        </Typography>
        <Checkbox value={agreed} onChange={e => setAgreed(e.target.checked)} />
        {t("checkboxLabel")}
      </FormModalBody>
      <FormActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose} variant="outlined">
          {tForm("cancelButton")}
        </Button>
        <StartVeriffFrameButton
          onSuccess={onSuccess}
          onClose={handleClose}
          disabled={!agreed}
        />
      </FormActions>
    </FormModal>
  );
}
