# Directory Page Plan

## Goal
Add a dedicated Directory page linked in top navigation, with list, edit, and delete capabilities.

## Plan
1. Reuse existing server actions for user data and mutations.
2. Add a new route at /directory that renders all users.
3. Add Directory to main navbar.
4. Ensure UI updates after add/edit/delete.

## Implementation Status
- Completed: Added /directory page with user list and edit/delete controls.
- Completed: Added Directory link to navbar and footer.
- Completed: Added route refresh after successful add/edit/delete.
- Completed: Added revalidation for both / and /directory in user mutations.
