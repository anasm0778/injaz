import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

interface BootstrapTooltipProps {
  title: string;
  children: React.ReactNode;
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "12px",
  },
}));

export default function CustomizedTooltips({
  title,
  children,
}: BootstrapTooltipProps) {
  return (
    <BootstrapTooltip title={title}>
      <div className="int_icon"> {children}</div>
    </BootstrapTooltip>
  );
}
