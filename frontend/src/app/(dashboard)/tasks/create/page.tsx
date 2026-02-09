"use client";

import React from "react";
import { AddTaskForm } from "@/components/features/AddTaskForm";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CreateTaskPage() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTaskForm onTaskAdded={() => router.push("/tasks")} />
        </CardContent>
      </Card>
    </div>
  );
}
