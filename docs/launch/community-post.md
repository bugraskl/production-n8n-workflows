# n8n Community showcase post

## Title

I built 10 small production-oriented n8n workflows for self-hosters

## Body

I kept running into workflow collections with impressive counts but very little information about credentials, failure paths, or first-run behavior, so I built a smaller collection around a different constraint: every workflow should be understandable in a few minutes.

The repository currently includes service health monitoring, domain and TLS checks, PostgreSQL backup verification, GitHub release tracking, CVE digests, website change monitoring, deterministic issue triage, and a human-reviewed AI ticket workflow.

The design rules are:

- no exported credentials;
- one visible Config node;
- retries and bounded timeouts for network calls;
- safe first runs for stateful monitors;
- no automatic customer-facing action from AI output;
- validation on every push.

Everything is MIT licensed, with individual JSON downloads and setup guides:

https://github.com/bugraskl/production-n8n-workflows

I would especially appreciate feedback from people running n8n on their own infrastructure: which failure cases or operational workflows are still missing?
