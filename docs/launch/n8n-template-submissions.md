# n8n template submission copy

Use the matching title and description when submitting each workflow to the n8n Creator Portal. Upload the JSON file from `workflows/` and use the repository documentation URL as the detailed guide.

## Service health monitor

**Title:** Monitor Dockerized service health endpoints and alert on failures

**Description:** Check a configurable list of HTTP health endpoints every five minutes and notify a Discord-compatible webhook only when a service is unhealthy. This template avoids Docker socket access, includes bounded retries, and keeps all targets in one Config node.

## Domain and TLS monitor

**Title:** Monitor domain registration expiry and HTTPS/TLS availability

**Description:** Use RDAP to track domain registration expiry and perform a real HTTPS request to catch invalid, expired, or mismatched TLS certificates. Send one clear alert when a domain needs attention.

## PostgreSQL backup verifier

**Title:** Verify PostgreSQL backups with checksum and restore-test evidence

**Description:** Receive a backup completion webhook and reject backups that are stale, too small, missing a verified checksum, or missing a successful restore test. Failed verification is routed to a Discord-compatible alert webhook.

## GitHub release watcher

**Title:** Track new GitHub releases without duplicate notifications

**Description:** Monitor a list of public GitHub repositories, store a private baseline, and alert only when the latest published release tag changes. No token is required for small public repository lists.

## Human-reviewed AI ticket triage

**Title:** Classify support tickets with AI and require human review

**Description:** Classify incoming tickets, calculate a review policy from model confidence and risk terms, and send the summary plus a suggested reply to a human review channel. The workflow intentionally never sends a customer-visible response.
