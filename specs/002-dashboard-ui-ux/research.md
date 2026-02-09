# Research & Technical Decisions: Dashboard UI UX

## 1. Primary Theme Integration (#EB6824)
- **Decision**: Update `globals.css` to use `#EB6824` as the primary CSS variable.
- **Rationale**: User-mandated color for branding consistency. Using CSS variables allows easy consumption in Tailwind `primary` classes.
- **Implementation**: Set `--primary: #EB6824` and `--ring: #EB6824`.

## 2. Layout Architecture
- **Decision**: Use a single `RootLayout` or a nested `(dashboard)/layout.tsx` to provide the Sidebar and Header consistently across all sub-pages.
- **Rationale**: Removes redundancy and ensures navigation state is preserved.
- **Alternatives Considered**: Repeating the layout in each page file (Rejected for DRY violations).

## 3. UI Aesthetics & Component Design
- **Decision**: Standardize on `rounded-xl` and `shadow-md` for all cards. Background: `bg-slate-50`.
- **Rationale**: User-mandated professional look. 
- **Icons**: Standardize on Lucide-React for clear, professional vector icons.

## 4. Navigation & Routing
- **Decision**: Sidebar will contain links to `/dashboard` and `/tasks`.
- **Action Button**: A prominent '+ New Task' button will be placed in the sidebar for immediate actionability.