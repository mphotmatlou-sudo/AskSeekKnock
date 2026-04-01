import { NextResponse } from 'next/server';

// Send a friend request
export async function POST(request: Request) {
  const body = await request.json();
  console.log('Friend request sent:', body);
  return NextResponse.json({ message: 'Friend request sent' });
}

// Accept a friend request
export async function PUT(request: Request) {
  const body = await request.json();
  console.log('Friend request accepted:', body);
  return NextResponse.json({ message: 'Friend request accepted' });
}

// Decline or remove a friend
export async function DELETE(request: Request) {
  const body = await request.json();
  console.log('Friend removed:', body);
  return NextResponse.json({ message: 'Friend removed' });
}
