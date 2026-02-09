---
id: "014"
title: "Fix Backend URL Proxy Robustness"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: none
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: npm run dev (Fix)
labels: [fix, bug, proxy, environment-variables, url-parsing]
links:
  spec: null
files:
  - frontend/src/app/api/auth/signup/route.ts
  - frontend/src/app/api/auth/login/route.ts
  - frontend/src/lib/api.ts
tests: []
---

# User Prompt

```text
Signup proxy error: TypeError: Failed to parse URL from ["http://127.0.0.1:8000"]/api/v1/auth/signup
...
The BACKEND_URL was parsed as an array. I've fixed the .env. Now, ensure that the signup route correctly forwards requests to the FastAPI backend as per the Phase 3 Spec.
```

# Assistant Response

Resolved the URL parsing error in frontend proxy routes and library utilities.

**Root Cause:**
The `BACKEND_URL` was being derived from an environment variable (`NEXT_PUBLIC_API_URL`) that occasionally contained stringified array markers (`[` , `]`) or extra quotes, leading to invalid URL construction (e.g., `["http://..."]/api/v1/...`).

**Actions Taken:**
- **URL Sanitization:** Implemented a robust URL cleaning logic in `signup/route.ts`, `login/route.ts`, and `lib/api.ts`.
- **Logic:** The cleaner removes square brackets and quotes using regex `/[\[\]"]/g` and trims trailing slashes.
- **Consistency:** Ensured all forwarding logic to the FastAPI backend uses the sanitized base URL.

**Result:** The application now correctly constructs and forwards requests to the backend even if environment variables are slightly misformatted.
