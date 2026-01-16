import { Link, LinkProps } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useStore } from "../../data/store";
import Text from "../../components/Text";

export default function BackToResults({
  href,
  children,
  ...restProps
}: LinkProps) {
  const storeQueryParams = useStore(state => state.getCurrentQueryParams());

  const queryKey = Object.keys(storeQueryParams).find(key => {
    return key.endsWith(href);
  });

  const queryString = new URLSearchParams(
    queryKey ? (storeQueryParams?.[queryKey] ?? {}) : {}
  ).toString();

  return (
    <Link
      href={`${href}${queryString ? `?${queryString}` : ""}`}
      {...restProps}
      mb={2}>
      <Text startIcon={<ArrowBack fontSize="small" />}>{children}</Text>
    </Link>
  );
}
