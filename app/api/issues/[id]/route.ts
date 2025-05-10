import { issueSchema, patchIssueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH (request: NextRequest, {params} : {params: {id: string}}) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);

  if(!validation.success) return NextResponse.json(validation.error.format(), {status: 400});

  const {title, description, assignedToUserId} = body

  if(assignedToUserId){
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId
      }
    })

    if(!user) return NextResponse.json({error: 'User not found.'}, {status: 400});
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  if(!issue) return NextResponse.json("Issue not found", {status: 404});
  
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId
      // ketika salah satu ini undefined, gak akan ke update menjadi null atau undefined 
    }
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, {params} : {params: {id: string}}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })


  if(!issue) return NextResponse.json({error: "Issue not found"}, {status: 404});

  await prisma.issue.delete({
    where: {
      id: issue.id
    }
  });

  return NextResponse.json({message: "Issue deleted"});
}