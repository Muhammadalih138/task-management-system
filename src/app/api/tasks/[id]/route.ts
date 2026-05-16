import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Task from '@/models/Task';
import { getUserIdFromToken } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/tasks/[id] - Update task status or properties
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const userId = await getUserIdFromToken();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      { $set: body },
      { new: true }
    );

    if (!updatedTask) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/tasks/[id] - Remove task
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const userId = await getUserIdFromToken();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId });

    if (!deletedTask) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
