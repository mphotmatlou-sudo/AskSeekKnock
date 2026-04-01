import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // In a real application, you would save the post to a database here.
  console.log(body);
  return NextResponse.json({ message: 'Post created successfully' });
}
