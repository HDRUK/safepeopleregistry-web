import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import FormControlDescription from "../FormControlDescription";
import PageHeading from "../PageHeading";

interface MarkdownProps {
  children: string;
  components?: Components;
  variant?: "plain" | "subtitle" | "legal";
}

const subtitleComponents: Components = {
  p({ children }) {
    return <FormControlDescription>{children}</FormControlDescription>;
  },
};

const tableComponents: Components = {
  table({ children }) {
    return (
      <TableContainer
        component={Paper}
        sx={{ my: 2, width: "70%", mx: "auto" }}>
        <Table
          sx={{
            borderCollapse: "collapse",
          }}>
          {children}
        </Table>
      </TableContainer>
    );
  },
  thead({ children }) {
    return <TableHead>{children}</TableHead>;
  },
  tbody({ children }) {
    return <TableBody>{children}</TableBody>;
  },
  tr({ children }) {
    return <TableRow>{children}</TableRow>;
  },
  th({ children }) {
    return <TableCell component="th">{children}</TableCell>;
  },
  td({ children }) {
    return <TableCell component="td">{children}</TableCell>;
  },
};

const defaultComponents: Components = {
  ...tableComponents,
  h1({ children }) {
    return <PageHeading heading={children} mb={3} />;
  },
  h2({ children }) {
    return <Typography variant="h2">{children}</Typography>;
  },
  h3({ children }) {
    return <Typography variant="h3">{children}</Typography>;
  },
  h4({ children }) {
    return <Typography variant="h4">{children}</Typography>;
  },
  h5({ children }) {
    return <Typography variant="h5">{children}</Typography>;
  },
  h6({ children }) {
    return <Typography variant="h6">{children}</Typography>;
  },
  ul({ children }) {
    return (
      <Box component="ul" mb={2}>
        {children}
      </Box>
    );
  },
  ol({ children }) {
    return (
      <Box component="ul" mb={2}>
        {children}
      </Box>
    );
  },
  p({ children }) {
    return <Typography mb={2}>{children}</Typography>;
  },
};

const legalComponents: Components = {
  h1({ node: _node, children, ...rest }) {
    return (
      <h3 style={{ fontWeight: "bold" }} {...rest}>
        {children}
      </h3>
    );
  },
  h2({ node: _node, children, ...rest }) {
    return (
      <h4 style={{ fontWeight: "normal" }} {...rest}>
        {children}
      </h4>
    );
  },

  h3({ node: _node, children, ...rest }) {
    return (
      <p style={{ marginLeft: "20px" }} {...rest}>
        {children}
      </p>
    );
  },
};

export default function Markdown({
  children,
  variant = "plain",
  ...props
}: MarkdownProps) {
  let selectedComponents: Components;

  switch (variant) {
    case "subtitle":
      selectedComponents = {
        ...defaultComponents,
        ...subtitleComponents,
      };
      break;
    case "legal":
      selectedComponents = {
        ...defaultComponents,
        ...legalComponents,
      };
      break;
    default:
      selectedComponents = {
        ...defaultComponents,
      };
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={selectedComponents}
      {...props}>
      {children}
    </ReactMarkdown>
  );
}
