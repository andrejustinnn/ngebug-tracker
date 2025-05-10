import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// untuk menghindari caching dari browser maka parameter next request ttp dipakai. walaupun tidak digunakan
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({orderBy: {name: 'asc'}});
  return NextResponse.json(users);
}