# UAE Work Rights Core V1 Intelligence Architecture

## Status

- Core V1 architecture: approved for architecture definition
- Core domain count: 13 (frozen)
- Domain 13: approved
- Heavy implementation: not authorized

## UAE legal-information boundary

- Scope: UAE employment-rights information, evidence organization, entitlement calculation support, and governed case guidance.
- The system does not create a lawyer-client relationship and must not present automated output as definitive legal advice.
- Legal propositions must reference an authorized source, jurisdiction, citation, effective date, and retrieval date.
- Conflicting or outdated legal authority produces a governed HOLD, not a confident answer.
- Court, limitation, complaint, appeal, immigration, termination, safety, or other consequential deadlines require explicit human escalation.
- User-facing consequential conclusions require qualified human legal review where policy requires it.

## Core domains

1. UAE Labour Law Knowledge Library
2. Agent Registry
3. Capability Registry
4. Legal Evidence Engine
5. Agent Training Room
6. External Skill Intake & Certification
7. Employment Rights Case Assessment
8. Entitlement & Compensation Calculation
9. Rights Guidance Assistant
10. Case Memory
11. Tenant Isolation & Confidentiality
12. Legal ↔ Plain-Language Translation
13. Intelligence Orchestration & Governed Deliberation

## Core intelligence flow

Employment Rights Question
→ Tenant / Case Context
→ Evidence Intake
→ Evidence Engine
→ Employment Rights Case Assessment
→ Specialist Intelligence
→ Intelligence Orchestration & Governed Deliberation
→ Legal ↔ Plain-Language Translation
→ Human Approval where required
→ Answer Packet / Findings
→ Decision / Action
→ Outcome Evidence
→ Validation
→ Governed Learning Gate
→ Case Memory

## Domain 12 — Legal ↔ Plain-Language Translation

### Purpose

Translate governed legal, procedural, and specialist findings into decision-useful plain-language meaning, and worker or employer questions into legally and procedurally actionable meaning, without changing the underlying evidence, confidence, disagreement, authority, or provenance.

### Governed input

- tenant_id
- case_id
- question_id / decision context
- target audience
- evidence_refs[]
- specialist_claim_refs[]
- contradiction_refs[]
- missing_evidence_refs[]
- claim-level confidence
- approved terminology / knowledge refs where applicable

### Governed output

- plain_language_meaning
- legal_or_procedural_meaning
- decision_implication
- preserved evidence references
- preserved claim references
- preserved contradictions
- preserved missing evidence
- preserved uncertainty / confidence
- limitations
- translation provenance

Translation is meaning-preserving interpretation. It is not evidence verification, confidence escalation, approval, permission, or entitlement-calculation or legal-outcome authority.

The Translation Service must not change evidence verification state, create VERIFIED evidence, increase claim confidence, suppress contradictions or missing evidence, convert hypotheses into facts, create unsupported findings, grant human approval, approve consequential actions, change participant permissions, widen tenant access, silently alter legal and practical meaning, or manufacture legal, financial, or procedural impact.

### Governed hold states

- `INSUFFICIENT_EVIDENCE` — resolvable by additional authorized evidence; HOLD until resolved or explicitly accepted by human authority within scope.
- `UNRESOLVED_CONTRADICTION` — resolvable by additional authorized evidence or authorized human disposition; HOLD when material to the requested decision.
- `OUTSIDE_AUTHORIZED_SCOPE` — terminal HOLD for the current request unless scope is changed by authorized policy/human authority.
- `UNSUPPORTED_TRANSLATION` — HOLD; may be retried only with supported source meaning/evidence or narrower wording.
- `TENANT_ACCESS_DENIED` — terminal HOLD for the current access context; the Translation Service cannot widen access.
- `HUMAN_ESCALATION_REQUIRED` — terminal for automated translation progression until the required human input/approval is recorded.

### Ownership and provenance

- Service owner: Legal ↔ Plain-Language Translation domain.
- Evidence integrity and verification source of truth: Evidence Engine.
- Specialist claim source of truth: owning specialist contribution / Case Room records.
- Contradiction/confidence source of truth: governed Case Room contracts.
- Tenant boundary enforcement: Tenant Isolation.
- Translation output may be transient during reasoning; any translation used by an Answer Packet, Finding, Decision, or durable audit record must be persisted as a tenant-scoped translation artifact in the Case Store.
- Persisted translation artifacts are append-only/versioned by the Translation Service under authorized actor context; source evidence/claims are never mutated through translation.
- Every persisted translation records immutable provenance back to evidence_refs, claim_refs, contradiction_refs, missing_evidence_refs, confidence, terminology refs, actor/service version, and audit reference.

### Canonical audit events

`TRANSLATION_REQUESTED`
`TRANSLATION_STARTED`
`TRANSLATION_COMPLETED`
`TRANSLATION_HELD`
`TRANSLATION_REJECTED`
`TRANSLATION_HUMAN_ESCALATED`

Every completed translation must remain reconstructable back to the claims and evidence it translated.

## Missing-evidence semantics

A missing-evidence requirement is not evidence that later becomes VERIFIED.

```text
Missing Evidence Requirement
→ new canonical Evidence Object obtained
→ new Evidence Object enters its own verification lifecycle
→ missing requirement becomes RESOLVED or SUPERSEDED with a reference to the new Evidence Object
```

Both the requirement and the new Evidence Object remain in the immutable audit trail. History is never overwritten.

## Thin-slice deliberation-round model

Pipeline stages are not automatically deliberation rounds. The first thin slice is bounded to three deliberation rounds:

- PRE-ROUND — question classification and routing;
- ROUND 1 — independent specialist contributions;
- ROUND 2 — contradiction detection plus challenge / mandatory disconfirmation when consequential;
- ROUND 3 — evidence reconciliation plus final synthesis;
- POST-ROUND — human approval where required and Answer Packet custody.

There is no hidden fourth deliberation round. Pre-round routing and post-round custody are governed pipeline stages outside the three deliberation rounds.

## Canonical supersession event

The canonical event name across Core V1 is `EVIDENCE_SUPERSEDED`.

## Domain 13 purpose

Coordinate selected UAE Work Rights intelligence capabilities around one governed employment-rights question so they can examine shared evidence, form independent claims, challenge conclusions, expose contradictions, identify missing evidence, preserve material disagreement, recommend the next justified action, and produce one governed Answer Packet.

No unrestricted agent-to-agent conversation is authorized.

## Core controls

- minimum sufficient participant selection;
- same governed evidence references for all authorized participants;
- structured contributions: claim, evidence, confidence, contradictions, missing evidence, implication, next step;
- contradiction preservation;
- claim-level confidence only;
- mandatory disconfirmation for consequential conclusions;
- human approval for consequential decisions;
- tenant-scoped least privilege;
- cost/time/tool-call stopping controls;
- auditable decision/outcome/learning lifecycle.

## Architectural invariants

1. Evidence is separate from interpretation.
2. Claims reference evidence.
3. Confidence belongs to claims, not conversations.
4. Contradictions are preserved.
5. Material conclusions receive a disconfirmation pass.
6. Agents cannot widen their own permissions.
7. Raw evidence cannot cross tenants.
8. Case Memory is not automatically organizational knowledge.
9. A recommendation is not a decision.
10. A decision is not proof of outcome.
11. Outcome evidence determines whether learning is justified.
12. Human authority remains outside orchestration.
13. Minimum sufficient intelligence participants are used.
14. No unrestricted agent-to-agent conversation exists.
15. Every consequential answer must be reconstructable from its audit trail.

## Companion artifacts

- `docs/architecture/uae-workrights-core-v1-intelligence-contracts-v1.md` — INT-01 through INT-10 governed intelligence contracts.
- `docs/architecture/uae-workrights-core-v1-thin-slice-engineering-design-v1.md` — implementation-ready logical boundaries, interfaces, events, threat controls, acceptance tests, team review lanes, and phased sequence.

Heavy implementation remains separately gated.
