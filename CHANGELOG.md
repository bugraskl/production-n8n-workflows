# Changelog

All notable changes to this project are documented here.

## 1.0.0 - 2026-09-30

### Added

- Ten documented n8n workflows for monitoring, security, backups, GitHub automation, and human-reviewed AI triage.
- Safe first-run behavior for stateful monitors.
- Workflow validation in GitHub Actions.
- Local n8n environment with a pinned version.
- Direct import links and per-workflow setup guides.

### Security

- Exported credential references and common secret patterns fail validation.
- The service health monitor avoids Docker socket access.
- The AI ticket triage workflow never sends customer-visible replies.
