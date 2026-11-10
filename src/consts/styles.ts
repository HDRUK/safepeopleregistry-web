const dndDragRotate = {
  animation: "spin 0.2s linear",
  "@keyframes spin": {
    "100%": {
      transform: "rotate(10deg)",
    },
  },
};

const statusTooltipSlotProps = {
  tooltip: { sx: { backgroundColor: "neutralGrey.contrastText" } },
  arrow: { sx: { color: "neutralGrey.contrastText" } },
};

export { dndDragRotate, statusTooltipSlotProps };
