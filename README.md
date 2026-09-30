# Production n8n Workflows

Small, readable n8n automations for self-hosters and small teams. Each workflow has a focused job, safe first-run behavior, retry handling, an English setup guide, and no exported credentials.

[![Validate workflows](https://github.com/bugraskl/production-n8n-workflows/actions/workflows/validate.yml/badge.svg)](https://github.com/bugraskl/production-n8n-workflows/actions/workflows/validate.yml)
[![n8n](https://img.shields.io/badge/n8n-2.41.4-EA4B71)](https://github.com/n8n-io/n8n/releases/tag/n8n%402.41.4)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Workflows

| Workflow | What it does | External services |
|---|---|---|
| [CVE security digest](docs/cve-security-digest.md) | Sends one daily digest of newly published high-severity CVEs | NVD, Discord-compatible webhook |
| [Domain expiry monitor](docs/domain-expiry-monitor.md) | Warns before domain registration expires | RDAP, Discord-compatible webhook |
| [GitHub issue triage](docs/github-issue-triage.md) | Applies deterministic labels to new issues | GitHub webhook and REST API |
| [Backup failure alert](docs/backup-failure-alert.md) | Normalizes backup events and alerts only on failure | Any backup tool, Discord-compatible webhook |

The fifth workflow, a stateful website change monitor, is developed through a real pull request so the repository history stays reviewable.

## Quick start

1. Download a workflow from [`workflows/`](workflows/).
2. In n8n, choose **Workflows → Import from File**.
3. Open the `Config` node and replace every placeholder.
4. Connect credentials when the guide asks for them. Credentials are never included in exports.
5. Execute manually once and inspect every output.
6. Activate only after the test run succeeds.

## Local n8n

The included Compose file pins the version used for schema validation:

```bash
cp .env.example .env
# Replace N8N_ENCRYPTION_KEY before first start.
docker compose up -d
```

Open `http://localhost:5678`. The volume keeps your local n8n data between restarts.

## Design rules

- **No credential exports.** Authentication is connected after import.
- **Safe first run.** Monitors establish a baseline or remain inactive after import.
- **One visible Config node.** Important values are not scattered across the canvas.
- **Failure-aware.** Network calls use retries and bounded timeouts.
- **No AI dependency by default.** Deterministic workflows remain useful offline and cheap to run.
- **Small enough to audit.** This is not a scraped “thousands of workflows” dump.

## Validation

```bash
npm test
```

The validator checks JSON syntax, required workflow fields, node/connection integrity, duplicate IDs and names, exported credential references, and common secret formats. GitHub Actions runs it on every push and pull request.

## Compatibility

Workflow exports use built-in nodes available in n8n 2.x and are maintained against `2.41.4`. APIs outside n8n can change; each guide links to the relevant upstream documentation and describes the expected payload.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Production experience, reproducible bug reports, and small improvements are preferred over workflow count.

## License

[MIT](LICENSE)
