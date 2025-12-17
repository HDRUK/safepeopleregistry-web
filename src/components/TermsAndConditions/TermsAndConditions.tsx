import { UserGroup } from "@/consts/user";
import descriptionContent from "@/mocks/data/terms_and_conditions/description.md";
import {
  mockedTermsAndConditionsBusiness,
  mockedTermsAndConditionsConsumer,
} from "@/mocks/data/terms_and_conditions/index";
import { Box, Button, List, ListItemText, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Markdown from "../Markdown";
import { StyledListItemButton, StyledRadio } from "./TermsAndConditions.styles";

export interface TermsAndConditionsProps {
  userGroup: UserGroup | null;
  onAccept: () => void;
  onDecline: () => void;
}

const NAMESPACE_TRANSLATION_TERMS = "TermsAndConditions";
type TermsKey =
  | keyof typeof mockedTermsAndConditionsConsumer
  | keyof typeof mockedTermsAndConditionsBusiness;

export default function TermsAndConditions({
  userGroup,
  onAccept,
  onDecline,
}: TermsAndConditionsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_TERMS);
  const [selectedItem, setSelectedItem] = useState<TermsKey>("understanding");

  const handleListItemClick = (item: TermsKey) => {
    setSelectedItem(item);
  };

  const mockedTermsAndConditions =
    userGroup === UserGroup.USERS
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

  return (
    <>
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
                onClick={() => handleListItemClick(item)}
                sx={{ width: "100%", m: 0 }}
                label={
                  <ListItemText
                    primary={`${index + 1}. ${t(item)}`}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.875rem",
                        fontWeight: selectedItem === item ? 500 : 400,
                      },
                    }}
                  />
                }
                control={
                  <StyledRadio
                    checked={selectedItem === item}
                    inputProps={{ "aria-label": `test-${index}` }}
                  />
                }
              />
            ))}
          </List>
        </Box>
        <Box
          sx={{ width: "65%", p: 3, overflowY: "auto" }}
          data-cy="terms-and-conditions_content">
          {/* This section is a placeholder until we have content sign off from legal team */}
          <>
            <Typography variant="h4" gutterBottom>
              {t("title")}
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
              <Markdown>{descriptionContent}</Markdown>
            </Box>
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
    </>
  );
}
