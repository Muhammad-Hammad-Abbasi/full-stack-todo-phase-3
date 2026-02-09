# UI Data Models

## 1. Dashboard Stats
Represents the data for the 3 summary cards.

| Field | Type | Description |
|-------|------|-------------|
| total | number | All tasks |
| completed | number | Tasks where is_completed = true |
| pending | number | Tasks where is_completed = false |

## 2. Nav Item
Represents a sidebar link.

| Field | Type | Description |
|-------|------|-------------|
| label | string | "Dashboard" or "Tasks" |
| icon | LucideIcon | Lucide-React component |
| href | string | Destination route |

## 3. Status Badge Mapping
Used for consistent coloring.

| Status | Color | Label |
|--------|-------|-------|
| Pending | #EB6824 (10% opacity bg) | "To Do" |
| Completed | #22C55E (10% opacity bg) | "Completed" |