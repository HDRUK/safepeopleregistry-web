import ActionsPanel from "@/components/ActionsPanel";
import { mockedSponsorshipsGuidance } from "@/mocks/data/cms";
import { CheckOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

export type ActionValidationSponsorshipStatus = "approved" | "rejected";
export interface ActionValidationSponsorshipProps {
  onStatusChange: (status: ActionValidationSponsorshipStatus) => void;
}

export default function ActionValidationSponsorship({
  onStatusChange,
}: ActionValidationSponsorshipProps) {
  const [decision, setDecision] = useState<ActionValidationSponsorshipStatus>();

  const handleChange = (_: ChangeEvent<HTMLInputElement>, status: string) => {
    setDecision(status);
  };

  return (
    <ActionsPanel>
      <Typography variant="h3">Pending sponsorship</Typography>
      {mockedSponsorshipsGuidance()}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
        <RadioGroup
          aria-labelledby="sponsorship-decision"
          name="sponsorship-decision"
          onChange={handleChange}
          sx={{ display: "flex", flexDirection: "row", columnGap: 5, mb: 2 }}>
          <FormControlLabel
            value="approved"
            control={<Radio />}
            label="Confirm sponsorship"
          />
          <FormControlLabel
            value="rejected"
            control={<Radio />}
            label="Decline sponsorship"
          />
        </RadioGroup>
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
          startIcon={<CheckOutlined />}
          onClick={() => {
            onStatusChange(decision);
          }}>
          Save decision
        </Button>
      </Box>
    </ActionsPanel>
  );
}
