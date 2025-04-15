import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const role = req.headers.get('x-user-role') || 'user';
    return NextResponse.json({ role });
  } catch (error) {
    return NextResponse.json({ role: 'unknown', error: 'Failed to determine role' }, { status: 500 });
  }
}
