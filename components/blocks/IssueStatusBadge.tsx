import { Status } from "@prisma/client";
import React from "react";
import { Badge } from "../ui/badge";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "default" | "red" | "green" | "violet" }
> = {
  OPEN: {
    label: "Open",
    color: "red",
  },
  DONE: {
    label: "Done",
    color: "green",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "violet",
  },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge variant="default" color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
