import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // validate request body
  const validation = issueSchema.safeParse(body);

  // is invalidate
  if (!validation.success)
    // validation.error.errors is an array of errors too complex
    // we can use format() to get a human-readable error message
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Create the issue in the database
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
