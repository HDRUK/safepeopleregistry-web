import Box from "@mui/material/Box";

function InfoPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        px: {
          xs: "24px",
          md: "12px",
        },
        paddingBottom: "48px",
      }}>
      {children}
    </Box>
  );
}

export default InfoPageWrapper;
