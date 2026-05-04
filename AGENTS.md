# Project Agent Rules

Before making any code change, read this file and apply these rules.

## Engineering Standard

- Review code like a senior engineer: identify the actual problem, choose the smallest correct fix, and preserve the existing architecture.
- Keep changes scoped to the requested behavior. Do not touch unrelated files, formatting, copy, assets, or structure.
- If the fix is only a few lines, keep it compact. Do not stretch simple logic into unnecessary abstractions.
- Prefer readable, direct code over cleverness. Add abstractions only when they remove real complexity or match an existing pattern.
- Preserve file encoding and existing text. For Russian content, read files as UTF-8 and avoid tools or workflows that can corrupt encoding.
- Edit manually with targeted patches. Avoid broad automated rewrites unless the change is purely mechanical and verified.
- Do not revert user changes or unrelated local work.

## Verification

- After each change, run checks that match the risk: syntax validation, browser verification, console checks, and focused tests when available.
- For UI changes, verify desktop and mobile behavior in the browser.
- Confirm that new or changed behavior does not break navigation, layout, responsiveness, or existing interactive states.
- If a feature or fix deserves test coverage and the project has a test setup, add focused tests. If no test setup exists, state what was verified manually.
