import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

export default async function Home() {

  const open = await prisma.issue.count({
    where: {
      status: 'OPEN'
    }
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS'
    }
  });
  const done = await prisma.issue.count({
    where: {
      status: 'DONE'
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <IssueSummary open={open} inProgress={inProgress} done={done} />
        <IssueChart open={open} inProgress={inProgress} done={done} />
      </div>
      <LatestIssues />
    </div>
    // <IssueSummary open={open} inProgress={inProgress} done={done} />
  );
}
