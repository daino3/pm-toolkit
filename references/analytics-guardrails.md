# Analytics guardrails

Before running SQL, state:
- Question and decision supported.
- Unit of analysis/grain.
- Population and exclusions.
- Timeframe and timezone.
- Metric definitions.
- Required joins and expected cardinality.

Use approved schemas and stored queries first. Apply row limits for exploration. Avoid SELECT * in production-scale tables. Validate joins for duplication. Return aggregate results unless row-level detail is necessary and authorized.
