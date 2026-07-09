---
name: clawquest-miner-dashboard
description: Static dashboard interface for ClawQuest Automated Miner. Provides visual analytics, real-time status monitoring, and loop configuration for OpenClaw.
metadata:
  openclaw:
    requires:
      env: []
      bins: []
---

# ClawQuest Miner Dashboard Skill

This skill provides an interactive, beautiful static dashboard for managing and monitoring the ClawQuest Automated Miner loop. It allows the OpenClaw agent to query dashboard status, launch the dashboard, and manage configurations.

## Features
- **Real-time Monitoring**: Monitor rounds completed, rewards collected, stamina recovery phase, and logs.
- **Auto Refill stamina**: Toggle diamond stamina purchases and set limit boundaries.
- **Historical Analysis**: Beautiful charts showing gold and ore collection rates over time.

## Tools Defined

### `open_miner_dashboard`
Opens the ClawQuest Automated Miner Dashboard in the user's default browser.
- **Inputs**: None
- **Outputs**: Returns the dashboard's URL and status.
