import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { StyledListItem, StyledListItemText } from "./CheckboxList.styles";

const SkeletonCheckboxList = ({
  isLoading,
  n,
}: {
  isLoading: boolean;
  n: number;
}) => {
  const getItem = () => ({
    primary: Math.floor(Math.random() * 150) + 100,
    secondary: Math.floor(Math.random() * 500) + 200,
  });

  const [widths, setWidths] = useState(() =>
    Array.from({ length: n }, getItem)
  );

  useEffect(() => {
    setWidths(prev => {
      const diff = n - prev.length;
      if (diff > 0) {
        return [...prev, ...Array.from({ length: diff }, getItem)];
      }
      if (diff < 0) {
        return prev.slice(0, n);
      }
      return prev;
    });
  }, [isLoading, n]);

  return (
    <>
      {widths.map(({ primary, secondary }, index) => (
        <StyledListItem key={`item-${index}`}>
          <Skeleton variant="rectangular" width={20} height={20} />
          <StyledListItemText
            primary={<Skeleton width={primary} height={25} />}
            secondary={<Skeleton width={secondary} height={16} />}
          />
        </StyledListItem>
      ))}
    </>
  );
};

export default SkeletonCheckboxList;
