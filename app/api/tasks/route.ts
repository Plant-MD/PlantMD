import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/(authentication)/auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import TaskModel from '@/models/Task';

// Force this route to be dynamic (not prerendered)
export const dynamic = 'force-dynamic';

// GET - Fetch all tasks
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const completed = searchParams.get('completed');
    
    let query: any = {
      userID: session.user.email // Always filter by authenticated user
    };
    
    // Filter by date if provided
    if (date) {
      query.date = date;
    }
    
    // Filter by completion status if provided
    if (completed !== null) {
      query.completed = completed === 'true';
    }
    
    const tasks = await TaskModel.find(query).sort({ date: 1, createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      tasks: tasks.map(task => ({
        id: task._id,
        title: task.title,
        description: task.description,
        date: task.date,
        type: task.type,
        completed: task.completed,
        plantName: task.plantName,
        userID: task.userID,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      }))
    });
    
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST - Create a new task
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const body = await request.json();
    const { title, description, date, type, plantName } = body;
    
    // Validate required fields
    if (!title || !date || !type) {
      return NextResponse.json(
        { success: false, error: 'Title, date, and type are required' },
        { status: 400 }
      );
    }
    
    // Validate task type
    const validTypes = ['watering', 'fertilizing', 'pruning', 'repotting', 'harvesting', 'other'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid task type' },
        { status: 400 }
      );
    }
    
    const newTask = new TaskModel({
      title,
      description: description || '',
      date,
      type,
      plantName: plantName || '',
      userID: session.user.email, // Always use authenticated user's email
      completed: false
    });
    
    const savedTask = await newTask.save();
    
    return NextResponse.json({
      success: true,
      task: {
        id: savedTask._id,
        title: savedTask.title,
        description: savedTask.description,
        date: savedTask.date,
        type: savedTask.type,
        completed: savedTask.completed,
        plantName: savedTask.plantName,
        userID: savedTask.userID,
        createdAt: savedTask.createdAt,
        updatedAt: savedTask.updatedAt
      }
    });
    
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

// PUT - Update a task
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const body = await request.json();
    const { id, title, description, date, type, plantName, completed } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      );
    }
    
    // First check if the task belongs to the authenticated user
    const existingTask = await TaskModel.findById(id);
    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    if (existingTask.userID !== session.user.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to modify this task' },
        { status: 403 }
      );
    }
    
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.date = date;
    if (type !== undefined) updateData.type = type;
    if (plantName !== undefined) updateData.plantName = plantName;
    if (completed !== undefined) updateData.completed = completed;
    
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      task: {
        id: updatedTask._id,
        title: updatedTask.title,
        description: updatedTask.description,
        date: updatedTask.date,
        type: updatedTask.type,
        completed: updatedTask.completed,
        plantName: updatedTask.plantName,
        userID: updatedTask.userID,
        createdAt: updatedTask.createdAt,
        updatedAt: updatedTask.updatedAt
      }
    });
    
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a task
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      );
    }
    
    // First check if the task belongs to the authenticated user
    const existingTask = await TaskModel.findById(id);
    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    if (existingTask.userID !== session.user.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to delete this task' },
        { status: 403 }
      );
    }
    
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    
    if (!deletedTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    );
  }
} 