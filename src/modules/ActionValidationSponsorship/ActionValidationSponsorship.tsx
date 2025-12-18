import ActionsPanel from "@/components/ActionsPanel";
import { mockedSponsorshipsGuidance } from "@/mocks/data/cms";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

interface ActionValidationSponsorshipProps {
  onStatusChange: (status: "approved" | "rejected") => void;
}

export default function ActionValidationSponsorship({
  onStatusChange,
}: ActionValidationSponsorshipProps) {
  return (
    <ActionsPanel>
      <Typography variant="h3">Pending sponsorship</Typography>
      {mockedSponsorshipsGuidance()}
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
          startIcon={<CheckOutlined />}
          onClick={() => {
            onStatusChange("approved");
          }}>
          Confirm sponsorship
        </Button>
        <Button
          variant="outlined"
          sx={{ alignSelf: "flex-start" }}
          startIcon={<CloseOutlined />}
          onClick={() => {
            onStatusChange("rejected");
          }}>
          Decline sponsorship
        </Button>
      </Box>
    </ActionsPanel>
  );
}
