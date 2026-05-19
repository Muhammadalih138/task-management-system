import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Task from '@/models/Task';
import { getUserIdFromToken } from '@/lib/auth';

// GET /api/tasks - Fetch all tasks for logged-in user
export async function GET() {
  try {
    await connectDB();
    const userId = await getUserIdFromToken();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, tasks });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: Request) {
  try {
    await connectDB();
    const userId = await getUserIdFromToken();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, description, priority, dueDate } = await request.json();
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const newTask = await Task.create({
      userId,
      title,
      description,
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    return NextResponse.json({ success: true, task: newTask }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
