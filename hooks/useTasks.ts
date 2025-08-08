import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'repotting' | 'harvesting' | 'other';
  completed: boolean;
  plantName?: string;
  userID: string; // Required - each task belongs to a specific user
  createdAt?: string;
  updatedAt?: string;
}

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fetchTasks: (filters?: { date?: string; completed?: boolean }) => Promise<void>;
  createTask: (taskData: Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt' | 'userID'>) => Promise<Task | null>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<boolean>;
  toggleTaskComplete: (id: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
    const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = status === 'authenticated' && !!session?.user?.email;

  const fetchTasks = async (filters?: { date?: string; completed?: boolean }) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (filters?.date) params.append('date', filters.date);
      if (filters?.completed !== undefined) params.append('completed', filters.completed.toString());
      
      const response = await fetch(`/api/tasks?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.tasks);
      } else {
        setError(data.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('Network error while fetching tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt' | 'userID'>): Promise<Task | null> => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => [...prev, data.task]);
        return data.task;
      } else {
        setError(data.error || 'Failed to create task');
        return null;
      }
    } catch (err) {
      setError('Network error while creating task');
      console.error('Error creating task:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>): Promise<Task | null> => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.map(task => 
          task.id === id ? data.task : task
        ));
        return data.task;
      } else {
        setError(data.error || 'Failed to update task');
        return null;
      }
    } catch (err) {
      setError('Network error while updating task');
      console.error('Error updating task:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.filter(task => task.id !== id));
        return true;
      } else {
        setError(data.error || 'Failed to delete task');
        return false;
      }
    } catch (err) {
      setError('Network error while deleting task');
      console.error('Error deleting task:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    await updateTask(id, { completed: !task.completed });
  };

  // Load tasks when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]); // Clear tasks when not authenticated
    }
  }, [isAuthenticated]);

  return {
    tasks,
    loading,
    error,
    isAuthenticated,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  };
}; 