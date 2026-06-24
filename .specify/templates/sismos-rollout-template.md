# Rollout: [FEATURE]

**Spec**: [link to spec.md]
**Status**: Draft
**Last updated**: [DATE]

## Deployment Order

1. [Docs/contracts]
2. [Backward-compatible producer]
3. [Consumer/API/client]
4. [Enable flag or live behavior]
5. [Cleanup old compatibility path, if safe]

## Flags And Defaults

| Flag/config | Default | Owner repo | Purpose |
|-------------|---------|------------|---------|
| [name] | [value] | [repo] | [purpose] |

## Rollback

- **Fast rollback**: [config/flag/revert]
- **Code rollback order**: [repo order]
- **User-visible effect**: [what users may see]
- **Data cleanup**: [N/A or required action]

## Monitoring Window

- **First 30 minutes**: [signals]
- **First 24 hours**: [signals]
- **Stop criteria**: [what causes rollback]

## Release Notes

- [Internal note]
- [External/app-store note if needed]
