---
name: playwright-skill
description: Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts to /tmp. Test pages, fill forms, take screenshots, check responsive design, validate UX, test login flows, check links, automate any browser task. Use when user wants to test websites, automate browser interactions, validate web functionality, or perform any browser-based testing.
---

**IMPORTANT - Path Resolution:**
This skill is installed at: `C:/Users/Pc/.claude/skills/playwright-skill`
Use this path as `$SKILL_DIR` in all commands.

# Playwright Browser Automation

**CRITICAL WORKFLOW:**

1. **Auto-detect dev servers** first:
   ```bash
   cd C:/Users/Pc/.claude/skills/playwright-skill && node -e "require('./lib/helpers').detectDevServers().then(s => console.log(JSON.stringify(s)))"
   ```
2. **Write scripts to /tmp**
3. **Execute via**: `cd C:/Users/Pc/.claude/skills/playwright-skill && node run.js /tmp/playwright-test-*.js`
