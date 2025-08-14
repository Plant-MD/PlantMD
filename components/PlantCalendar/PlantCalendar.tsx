"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, CheckCircle, Clock, Droplets, Sun, Leaf, X, Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTasks, Task } from '@/hooks/useTasks';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import { Trash2 } from 'lucide-react';

// Remove the local Task interface since we're importing it from the hook

const taskTypes = {
  watering: { icon: Droplets, color: 'bg-blue-500', label: 'Watering' },
  fertilizing: { icon: Leaf, color: 'bg-green-500', label: 'Fertilizing' },
  pruning: { icon: CheckCircle, color: 'bg-orange-500', label: 'Pruning' },
  repotting: { icon: Sun, color: 'bg-purple-500', label: 'Repotting' },
  harvesting: { icon: Leaf, color: 'bg-yellow-500', label: 'Harvesting' },
  other: { icon: Clock, color: 'bg-gray-500', label: 'Other' }
};

export default function PlantCalendar() {
  const { tasks, loading, error, isAuthenticated, createTask, toggleTaskComplete, deleteTask } = useTasks();
  const { toast } = useToast();
  const [hoveredTask, setHoveredTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    type: 'watering' as Task['type'],
    plantName: ''
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTasksForDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const addNewTask = async () => {
    if (newTask.title && newTask.date) {
      const result = await createTask({
        title: newTask.title,
        description: newTask.description,
        date: newTask.date,
        type: newTask.type,
        plantName: newTask.plantName
      });
      
      if (result) {
        setNewTask({ title: '', description: '', date: '', type: 'watering', plantName: '' });
        setIsAddTaskOpen(false);
        toast({
          title: "Success",
          description: "Task created successfully!",
        });
      }
    }
  };

  const handleTaskComplete = async (task: Task) => {
    await toggleTaskComplete(task.id);
    setIsTaskDetailOpen(false);
    setSelectedTask(null);
    toast({
      title: "Success",
      description: task.completed ? "Task marked as incomplete" : "Task completed!",
    });
  };

  const handleTaskDelete = async (task: Task) => {
    const success = await deleteTask(task.id);
    if (success) {
      setIsTaskDetailOpen(false);
      setSelectedTask(null);
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    }
  };

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayTasks = getTasksForDate(dateString);
      const isToday = dateString === new Date().toISOString().split('T')[0];

      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-2 relative ${
            isToday ? 'bg-green-50 border-green-300' : 'bg-white'
          }`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-green-700' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
                         {dayTasks.map(task => {
               const taskType = taskTypes[task.type];
               const Icon = taskType.icon;
               return (
                 <div key={task.id}>
                   {/* Hover popup for quick info */}
                   <Popover>
                     <PopoverTrigger asChild>
                       <div
                         className={`p-1.5 rounded-full cursor-pointer transition-all hover:scale-110 ${
                           task.completed 
                             ? 'bg-gray-200 text-gray-500' 
                             : `${taskType.color} text-white`
                         }`}
                         onMouseEnter={() => setHoveredTask(task)}
                         onMouseLeave={() => setHoveredTask(null)}
                       >
                         <Icon size={12} />
                       </div>
                     </PopoverTrigger>
                     <PopoverContent className="w-64 p-3" align="start">
                       <div className="space-y-2">
                         <div className="flex items-center gap-2">
                           <div className={`p-1.5 rounded-full ${taskType.color}`}>
                             <Icon className="w-3 h-3 text-white" />
                           </div>
                           <div>
                             <h4 className="font-medium text-sm text-gray-900 truncate">{task.title}</h4>
                             <p className="text-xs text-gray-500">{taskType.label}</p>
                           </div>
                         </div>
                         
                         {task.plantName && (
                           <div className="flex items-center gap-1 text-xs text-gray-600">
                             <Leaf className="w-3 h-3" />
                             <span>{task.plantName}</span>
                           </div>
                         )}
                         
                         <div className="flex items-center gap-1 text-xs text-gray-600">
                           <Calendar className="w-3 h-3" />
                           <span>{formatDate(task.date)}</span>
                         </div>
                         
                         <Badge variant={task.completed ? "secondary" : "default"} className="text-xs">
                           {task.completed ? "Completed" : "Pending"}
                         </Badge>
                       </div>
                     </PopoverContent>
                   </Popover>
                   
                   {/* Click to open detailed view */}
                   <div
                     className="absolute inset-0 cursor-pointer"
                     onClick={() => openTaskDetail(task)}
                   />
                 </div>
               );
             })}
            {dayTasks.length === 0 && (
              <div className="text-xs text-gray-400 mt-2">
                No tasks
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingTasks = tasks
    .filter(task => !task.completed && new Date(task.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plant Calendar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay organized with your plant care routine. Schedule watering, fertilizing, and other important tasks to keep your plants healthy and thriving.
          </p>
          {!isAuthenticated && (
            <Dialog open>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-center text-green-900 font-semibold text-lg">Sign in required</DialogTitle>
                </DialogHeader>
                <p className="text-center text-gray-500 mb-6">
                  Sign in to access and participate in the PlantBook community.
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => signIn('google')}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-6 py-3 flex items-center gap-2 text-base border-0"
                    style={{ boxShadow: 'none' }}
                  >
                    <LogIn className="w-5 h-5" />
                    Sign in with Google
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          {loading && (
            <div className="flex items-center justify-center mt-4">
              <Loader2 className="w-6 h-6 animate-spin text-green-600 mr-2" />
              <span className="text-green-600">Loading tasks...</span>
            </div>
          )}
        </div>

        {isAuthenticated && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </CardTitle>
                  <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Plant Task</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Task Title</Label>
                          <Input
                            id="title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            placeholder="e.g., Water Tomato Plants"
                          />
                        </div>
                        <div>
                          <Label htmlFor="plantName">Plant Name (Optional)</Label>
                          <Input
                            id="plantName"
                            value={newTask.plantName}
                            onChange={(e) => setNewTask({...newTask, plantName: e.target.value})}
                            placeholder="e.g., Tomato, Corn"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            placeholder="Add any additional notes..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newTask.date}
                            onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Task Type</Label>
                          <Select value={newTask.type} onValueChange={(value: Task['type']) => setNewTask({...newTask, type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(taskTypes).map(([key, { icon: Icon, label }]) => (
                                <SelectItem key={key} value={key}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={addNewTask} className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Task
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendar()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Clock className="w-5 h-5" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.length > 0 ? (
                                         upcomingTasks.map(task => {
                       const taskType = taskTypes[task.type];
                       const Icon = taskType.icon;
                       return (
                         <div
                           key={task.id}
                           className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors cursor-pointer"
                           onClick={() => openTaskDetail(task)}
                         >
                           <div className={`p-2 rounded-full ${taskType.color}`}>
                             <Icon className="w-4 h-4 text-white" />
                           </div>
                           <div className="flex-1 min-w-0">
                             <div className="font-medium text-sm text-gray-900 truncate">
                               {task.title}
                             </div>
                             <div className="text-xs text-gray-500">
                               {formatDate(task.date)}
                               {task.plantName && ` • ${task.plantName}`}
                             </div>
                           </div>
                           <Badge variant={task.completed ? "secondary" : "default"} className="text-xs">
                             {task.completed ? "Done" : taskType.label}
                           </Badge>
                         </div>
                       );
                     })
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No upcoming tasks</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Task Statistics */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-700">Task Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Tasks</span>
                    <span className="font-semibold text-gray-900">{tasks.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="font-semibold text-green-600">
                      {tasks.filter(t => t.completed).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="font-semibold text-orange-600">
                      {tasks.filter(t => !t.completed).length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0}%` 
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
                 )}

         {/* Task Detail Dialog */}
         <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
           <DialogContent className="sm:max-w-md">
             {selectedTask && (
               <>
                 <DialogHeader>
                   <DialogTitle className="flex items-center gap-2">
                     <div className={`p-2 rounded-full ${taskTypes[selectedTask.type].color}`}>
                       {React.createElement(taskTypes[selectedTask.type].icon, { className: "w-4 h-4 text-white" })}
                     </div>
                     Task Details
                   </DialogTitle>
                 </DialogHeader>
                 <div className="space-y-4">
                   <div className="space-y-3">
                     <div className="flex items-center justify-between">
                       <div>
                         <h4 className="font-semibold text-gray-900 text-lg">{selectedTask.title}</h4>
                         <p className="text-sm text-gray-500">{taskTypes[selectedTask.type].label}</p>
                       </div>
                       <Badge variant={selectedTask.completed ? "secondary" : "default"}>
                         {selectedTask.completed ? "Completed" : "Pending"}
                       </Badge>
                     </div>
                     
                     {selectedTask.plantName && (
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                         <Leaf className="w-4 h-4" />
                         <span>Plant: {selectedTask.plantName}</span>
                       </div>
                     )}
                     
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <Calendar className="w-4 h-4" />
                       <span>Date: {formatDate(selectedTask.date)}</span>
                     </div>
                     
                     {selectedTask.description && (
                       <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                         <p className="font-medium mb-1">Description:</p>
                         <p>{selectedTask.description}</p>
                       </div>
                     )}
                   </div>
                   
                   <div className="flex gap-3 pt-4">
                     <Button 
                       onClick={() => handleTaskComplete(selectedTask)}
                       className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                     >
                       {selectedTask.completed ? "Mark Incomplete" : "Complete Task"}
                     </Button>
                     <Button 
                       onClick={() => handleTaskDelete(selectedTask)}
                       variant="destructive"
                       className="flex-1"
                     >
                       <Trash2 className="w-4 h-4 mr-2" />
                       Delete
                     </Button>
                   </div>
                 </div>
               </>
             )}
           </DialogContent>
         </Dialog>
       </div>
     </section>
   );
} 