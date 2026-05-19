import { Box } from "@mui/system";

const YOUTUBE_MAX_WIDTH = 854;

interface YoutubeVideoProps {
  videoId?: string;
}

export default function YoutubeVideo({
  videoId = "kYLO_7gtBRo?si=sfXW1gOBlgS-5Str",
}: YoutubeVideoProps) {
  return (
    <Box
      sx={{
        mt: 2,
        mb: 3,
        width: "100%",
        maxWidth: YOUTUBE_MAX_WIDTH,
        mx: "auto",
        aspectRatio: "16 / 9",
      }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        style={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </Box>
  );
}
