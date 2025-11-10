"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Plus, Trash2, Send } from "lucide-react";
import type { Schedule } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const initialSchedules: Schedule[] = [
  { id: "1", day: "Monday", startTime: "08:00", endTime: "09:00" },
  { id: "2", day: "Wednesday", startTime: "17:00", endTime: "17:30" },
  { id: "3", day: "Friday", startTime: "08:00", endTime: "09:00" },
];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function ScheduleManager() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const { toast } = useToast();

  const handleSaveSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const scheduleData = {
      day: formData.get("day") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
    };

    if (!scheduleData.day || !scheduleData.startTime || !scheduleData.endTime) {
        toast({ title: "Error", description: "All fields are required.", variant: "destructive" });
        return;
    }

    if (editingSchedule) {
      setSchedules(schedules.map(s => s.id === editingSchedule.id ? { ...editingSchedule, ...scheduleData } : s).sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day)));
      toast({ title: "Schedule Updated", description: "Your schedule has been successfully updated." });
    } else {
      setSchedules([...schedules, { id: crypto.randomUUID(), ...scheduleData }].sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day)));
      toast({ title: "Schedule Added", description: "A new schedule has been successfully added." });
    }
    setIsDialogOpen(false);
    setEditingSchedule(null);
  };

  const handleOpenDialog = (schedule: Schedule | null) => {
    setEditingSchedule(schedule);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
    toast({ title: "Schedule Deleted", description: "The schedule has been removed." });
  };
  
  const handleApplySchedules = () => {
    console.log("Applying schedules:", JSON.stringify(schedules));
    toast({
      title: "Schedules Applied",
      description: "The new pump schedule has been sent to the system.",
    });
  };

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <CardTitle>Pump Scheduler</CardTitle>
          <CardDescription>Manage automated pump operation times.</CardDescription>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto" onClick={handleApplySchedules}>
                <Send className="mr-2 h-4 w-4" /> Apply Schedule
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto" onClick={() => handleOpenDialog(null)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSaveSchedule}>
                  <DialogHeader>
                    <DialogTitle>{editingSchedule ? "Edit" : "Add"} Schedule</DialogTitle>
                    <DialogDescription>
                      Set the day and time for the pump to run automatically.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="day" className="text-right">Day</Label>
                      <Select name="day" defaultValue={editingSchedule?.day}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="startTime" className="text-right">Start Time</Label>
                      <Input id="startTime" name="startTime" type="time" defaultValue={editingSchedule?.startTime} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="endTime" className="text-right">End Time</Label>
                      <Input id="endTime" name="endTime" type="time" defaultValue={editingSchedule?.endTime} className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Day</TableHead>
                <TableHead>Jam ON</TableHead>
                <TableHead>Jam OFF</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.length > 0 ? schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.day}</TableCell>
                  <TableCell>{schedule.startTime}</TableCell>
                  <TableCell>{schedule.endTime}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(schedule)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(schedule.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No schedules set.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
