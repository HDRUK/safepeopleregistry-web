import { Box } from "@mui/material";
import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import PageCenter from "../PageCenter";

interface PageContainerProps {
  children: ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main
        role="main"
        style={{
          backgroundColor: "#fff",
          flexGrow: 1,
        }}>
        <PageCenter>
          <Box
            sx={{
              px: 1,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}>
            {children}
          </Box>
        </PageCenter>
      </main>
      <Footer />
    </Box>
  );
}

export default PageContainer;
