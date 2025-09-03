import {
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
        sx={{ my: 2, width: "70%", margin: "0 auto" }}>
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
    return (
      <TableCell
        component="th"
        sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          backgroundColor: "default.main",
          color: "default.contrastText",
          border: "1px solid #ccc",
        }}>
        {children}
      </TableCell>
    );
  },
  td({ children }) {
    return (
      <TableCell
        component="td"
        sx={{
          fontSize: "1.2rem",
          border: "1px solid #ccc",
        }}>
        {children}
      </TableCell>
    );
  },
};

const defaultComponents: Components = {
  ...tableComponents,
  h1({ children }) {
    return <PageHeading heading={children} />;
  },
  h3({ node: _node, children, ...rest }) {
    return (
      <h3 style={{ fontWeight: "normal" }} {...rest}>
        {children}
      </h3>
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
