# Security

Workflow exports must never contain real credentials, tokens, personal webhook URLs, customer data, or execution history.

If you find exposed sensitive information, please report it privately through GitHub's **Report a vulnerability** feature instead of opening a public issue.

Import workflows disabled, review every node, connect credentials inside n8n, run once manually, and only then activate the schedule or webhook.
