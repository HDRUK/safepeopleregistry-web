import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";
import _get from "lodash.get";
import { toCamelCase } from "../../utils/string";
import { ArrayElement } from "../../types/common";
import { Message } from "../Message";

interface FieldsToTextProps<T> {
  data: T;
  keys: (
    | string
    | {
        column_id?: string;
        heading?: ReactNode;
        content?: ReactNode;
      }
  )[];
  tKey: string;
}

export default function FieldsToText<T>({
  data,
  keys,
  tKey,
}: FieldsToTextProps<T>) {
  const t = useTranslations(tKey);

  const filteredKeys = useMemo(() => {
    return keys.filter(key => {
      const content =
        key !== "string" ? _get(data, key.column_id) : _get(data, key);

      return Array.isArray(content) ? content.length : content !== "";
    });
  }, [data]);

  const renderItems = (items: string | string[] | undefined) => {
    if (Array.isArray(items)) {
      return (
        <ul>
          {items?.map((value: string) => (
            <li>{value}</li>
          ))}
        </ul>
      );
    }

    return items || <Message severity="warning">{t("notSet")}</Message>;
  };

  const getHeading = (key: ArrayElement<typeof keys>) => {
    if (typeof key === "string") {
      return t(toCamelCase(key));
    }

    if (typeof key.heading === "string") {
      return t(key.heading);
    }

    return key.heading || t(toCamelCase(key.column_id));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {filteredKeys.map(key =>
        typeof key === "string" ? (
          <div key={key}>
            <Typography variant="h6">{getHeading(key)}</Typography>
            <Typography>{renderItems(_get(data, key))}</Typography>
          </div>
        ) : (
          <div key={getHeading(key)}>
            <Typography variant="h6">{getHeading(key)}</Typography>
            <Typography>
              {key.content || renderItems(_get(data, key.column_id))}
            </Typography>
          </div>
        )
      )}
    </Box>
  );
}
