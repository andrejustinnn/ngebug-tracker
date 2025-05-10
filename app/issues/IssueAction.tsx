import { Button } from "@/components/ui/button";
import Flex from "@/components/ui/flex";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueAction = () => {
  return (
    <Flex className="mb-5" justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">Create new issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
