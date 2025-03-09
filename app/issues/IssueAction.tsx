import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const IssueAction = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">Create new issue</Link>
      </Button>
    </div>
  );
};

export default IssueAction;
