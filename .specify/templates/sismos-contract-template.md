# Contract: [FEATURE / BOUNDARY]

**Spec**: [link to spec.md]
**Status**: Draft
**Last updated**: [DATE]

## Boundary

- **Producer**: [repo/service/component]
- **Consumer(s)**: [repo/service/component]
- **Runtime path**: [push/API/deep link/webhook/background worker/etc.]

## Compatibility

- **Current behavior**: [old payload/endpoint/flow]
- **New behavior**: [new payload/endpoint/flow]
- **Backward compatibility**: [how old consumers continue to work]
- **Versioning**: [payload version, endpoint version, flag, or N/A]

## Schema / Payload

```json
{
  "example": "replace with real payload"
}
```

## Failure Behavior

- **Producer failure**: [retry/drop/log/alert]
- **Consumer failure**: [fallback/default rendering/no-op]
- **Idempotency**: [event ID, dedup key, or N/A]

## Observability

- **Logs/traces**: [fields allowed]
- **Metrics**: [neutral labels only; bounded cardinality]
- **Public health impact**: [N/A or endpoint]

## Verification

- [ ] Producer contract test
- [ ] Consumer contract test
- [ ] Backward compatibility check
- [ ] Rollback behavior check
