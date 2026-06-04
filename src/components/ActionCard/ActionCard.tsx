import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExternalLink from "@/components/ExternalLink";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export default function ActionCard({
  icon,
  title,
  description,
  href,
  ctaLabel,
}: ActionCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.100",
        border: "none",
        borderRadius: 3,
      }}>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 3,
        }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
          {icon}
          <Typography variant="h3" component="h2">
            {title}
          </Typography>
        </Box>
        <Typography sx={{ flexGrow: 1 }}>{description}</Typography>
        <Box>
          <Button
            component={ExternalLink}
            href={href}
            variant="outlined"
            size="small"
            endIcon={<OpenInNewIcon />}>
            {ctaLabel}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
