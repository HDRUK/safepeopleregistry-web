import { useState } from "react";
import { Typography, Button, Box, List } from "@mui/material";
import { useTranslations } from "next-intl";
import {
  mockedTermsAndConditionsBusiness,
  mockedTermsAndConditionsConsumer,
} from "@/mocks/data/terms_and_conditions/index";
import descriptionContent from "@/mocks/data/terms_and_conditions/description.md";
import FormModal, { FormModalProps } from "../FormModal";
import Markdown from "../Markdown";
import {
  StyledListItemButton,
  StyledRadio,
  StyledListItemText,
} from "./TermsAndConditionsModal.styles";

export interface TermsAndConditionsModalProps
  extends Omit<FormModalProps, "children"> {
  accountType: string | null;
  onAccept: () => void;
  onDecline: () => void;
}

const NAMESPACE_TRANSLATION_TERMS = "TermsAndConditions";
type TermsKey =
  | keyof typeof mockedTermsAndConditionsConsumer
  | keyof typeof mockedTermsAndConditionsBusiness;

export default function TermsAndConditionsModal({
  accountType,
  onAccept,
  onDecline,
  ...restProps
}: TermsAndConditionsModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_TERMS);
  const [selectedItem, setSelectedItem] = useState<TermsKey>("understanding");

  const handleListItemClick = (item: TermsKey) => {
    setSelectedItem(item);
  };

  const mockedTermsAndConditions =
    accountType === "user"
      ? mockedTermsAndConditionsConsumer
      : mockedTermsAndConditionsBusiness;

  const renderContent = () => {
    const item =
      mockedTermsAndConditions[
        selectedItem as keyof typeof mockedTermsAndConditions
      ];

    if (!item || !item.content) {
      return null;
    }
    return item.content;
  };

  const termsItems: TermsKey[] = Object.keys(
    mockedTermsAndConditions
  ) as TermsKey[];

  if (accountType === null)
    return (
      <FormModal {...restProps} variant="content">
        {t("pleaseSelect")}
      </FormModal>
    );

  return (
    <FormModal {...restProps} variant="content">
      <Box
        sx={{
          display: "flex",
          height: "60vh",
          borderBottom: 1,
          borderColor: "divider",
          pb: 1,
        }}>
        <Box
          sx={{
            width: "35%",
            borderRight: 1,
            borderColor: "divider",
            overflowY: "scroll",
          }}>
          <List component="nav" sx={{ py: 0 }}>
            {termsItems.map((item, index) => (
              <StyledListItemButton
                key={item}
                selected={selectedItem === item}
                onClick={() => handleListItemClick(item)}>
                <StyledRadio
                  checked={selectedItem === item}
                  onChange={() => handleListItemClick(item)}
                />
                <StyledListItemText
                  primary={`${index + 1}. ${t(item)}`}
                  isSelected={selectedItem === item}
                />
              </StyledListItemButton>
            ))}
          </List>
        </Box>
        <Box sx={{ width: "65%", p: 3, overflowY: "auto" }}>
          {/* This section is a placeholder until we have content sign off from legal team */}
          <>
            <Typography variant="h4" gutterBottom>
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
              <Markdown>{descriptionContent}</Markdown>
            </Typography>
            {renderContent()}
          </>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          px: 3,
          pb: 2,
        }}>
        <Box>
          <Button variant="outlined" onClick={onDecline} sx={{ mr: 1 }}>
            {t("decline")}
          </Button>
          <Button variant="contained" color="primary" onClick={onAccept}>
            {t("accept")}
          </Button>
        </Box>
      </Box>
    </FormModal>
  );
}
