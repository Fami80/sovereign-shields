# UAE Work Rights Core V1 Intelligence Contracts

## Status

Architecture-only. Core domain count remains 13. INT contract count remains 10. Heavy implementation is not authorized.

## UAE legal-information boundary

- Scope: UAE employment-rights information, evidence organization, entitlement calculation support, and governed case guidance.
- The system does not create a lawyer-client relationship and must not present automated output as definitive legal advice.
- Legal propositions must reference an authorized source, jurisdiction, citation, effective date, and retrieval date.
- Conflicting or outdated legal authority produces a governed HOLD, not a confident answer.
- Court, limitation, complaint, appeal, immigration, termination, safety, or other consequential deadlines require explicit human escalation.
- User-facing consequential conclusions require qualified human legal review where policy requires it.

## Contract set

1. INT-01 Canonical Evidence Object
2. INT-02 Evidence Verification Contract
3. INT-03 Employment Rights Journey Object
4. INT-04 Specialist Contribution Contract
5. INT-05 Case Room Contract
6. INT-06 Contradiction and Confidence Contract
7. INT-07 Answer Packet Contract
8. INT-08 Decision and Outcome Contract
9. INT-09 Case Memory Learning Contract
10. INT-10 Agent and Capability Access Contract

These contracts preserve evidence/interpretation separation, claim-level confidence, contradiction preservation, mandatory disconfirmation, tenant isolation, human authority, and governed learning.

---

# INT-01 — Canonical Evidence Object

Legal Evidence Engine owns immutable tenant/case-scoped Evidence Objects with identity, source/provenance, content refs, verification state, sensitivity, permitted/prohibited uses, version history, and audit refs. Legal-source evidence additionally records jurisdiction, authority level, citation, effective date, retrieval date, and supersession status.

Canonical verification states:

```text
REPORTED
INFERRED
VERIFIED
DISPUTED
SUPERSEDED
```

A missing-evidence requirement is not an Evidence Object verification state.

Rules: corrections create new versions; specialists cannot mutate verification state; REPORTED/INFERRED cannot silently become VERIFIED; superseded evidence remains auditable; raw evidence cannot cross tenant boundaries; evidence summaries do not contain downstream conclusions.

---

# INT-02 — Evidence Verification Contract

Allowed Evidence Object transitions:

```text
REPORTED → VERIFIED | DISPUTED | SUPERSEDED
INFERRED → VERIFIED only with direct supporting evidence
INFERRED → DISPUTED | SUPERSEDED
VERIFIED → DISPUTED | SUPERSEDED
DISPUTED → VERIFIED only through a new authorized verification decision
DISPUTED → SUPERSEDED
```

Agent consensus never creates VERIFIED evidence.

## Missing-evidence semantics

```text
MissingEvidenceRequirement
- requirement_id
- tenant_id
- case_id
- question_id
- required_evidence_description
- reason_required
- status: OPEN | RESOLVED | SUPERSEDED
- resolved_by_evidence_ref optional
- superseded_by_requirement_ref optional
- audit_ref
```

Required lifecycle:

```text
OPEN MissingEvidenceRequirement
→ new canonical Evidence Object obtained
→ new Evidence Object enters its own verification lifecycle
→ requirement becomes RESOLVED and references the new Evidence Object
```

If no longer relevant, the requirement may become SUPERSEDED with a reason/reference. A MissingEvidenceRequirement never becomes VERIFIED. Both objects remain in the immutable audit trail.

Canonical supersession event: `EVIDENCE_SUPERSEDED`.

---

# INT-03 — Employment Rights Journey Object

EmploymentRightsJourney remains the tenant-scoped case unit. It records rights question objective, rights outcome, stages, expected vs observed state, evidence refs, missing-evidence refs, employment formation, workplace events, complaints, employer responses, termination, entitlement, remedy, and procedural events.

Technical failure does not prove financial or legal harm without outcome evidence. Missing evidence uses MissingEvidenceRequirement refs.

---

# INT-04 — Specialist Contribution Contract

Each contribution records participant/round identity; claim; evidence, memory and approved-knowledge refs; claim-level HIGH/MEDIUM/LOW confidence with reason; contradictions; missing-evidence requirements; legal/practical implication; proportional next step; reversibility; and classification as supported, hypothesis, or unsupported.

Supported claims require authorized evidence. Hypotheses remain hypotheses. Unsupported prose cannot become verified fact. Participants cannot widen permissions, self-approve escalation, or write durable learning. Round 1 remains independent.

---

# INT-05 — Case Room Contract

CaseRoom records tenant/case/question identity, authorized context, participants, hypotheses, contributions, contradictions, missing evidence, candidate findings/decisions, budgets, human-governance state, and audit custody.

## Three-round thin-slice model

Pipeline stages are not deliberation rounds.

```text
PRE-ROUND — question classification / routing
ROUND 1 — independent specialist contributions
ROUND 2 — contradiction detection + challenge / mandatory disconfirmation
ROUND 3 — evidence reconciliation + final synthesis
POST-ROUND — human approval where required + Answer Packet custody
```

The first thin slice has a hard maximum of three deliberation rounds. PRE-ROUND and POST-ROUND are governed stages outside the round counter. No hidden fourth round is permitted.

Stopping conditions include sufficient answer, insufficient evidence, required human escalation, unsafe unresolved material contradiction, exhausted budget, unavailable capability, permission denial, or authorized human pause/close.

---

# INT-06 — Contradiction and Confidence Contract

Contradictions are first-class records with competing claim refs, supporting evidence on each side, materiality, possible explanations, evidence needed to resolve, status, resolution reason, and human-review requirement.

Confidence belongs to a claim only; no aggregate Case Room confidence average is permitted.

Consequential conclusions require a DisconfirmationRecord containing primary conclusion, strongest alternative, supporting evidence for both, evidence needed to disprove, risk if wrong, reversibility, and governed disposition.

---

# INT-07 — Answer Packet Contract

AnswerPacket records conclusion, strongest evidence, claim-confidence refs, verified facts, missing evidence, material disagreement/alternatives, legal and practical meaning, recommended action, reversibility/proportionality, validation plan, human-approval state, and audit ref.

Executive and investigator views may differ only in compression and cannot alter evidence state, confidence, disagreement, missing evidence, or approval state.

---

# INT-08 — Decision and Outcome Contract

Recommendation, decision, execution, measurement, and validation remain distinct. Decisions record APPROVED/REJECTED/MODIFIED/DEFERRED with human authority and sensitivity/reversibility context. Outcomes record action, expected/observed result, metric/evidence refs, validation result, limitations and reviewer. Inconclusive remains inconclusive.

---

# INT-09 — Case Memory Learning Contract

Case Memory reads are tenant/permission/sensitivity/relevance/recency/certification scoped. Durable learning requires HUMAN_APPROVED_FINDING, VALIDATED_OUTCOME, or EXPLICIT_KNOWLEDGE_CERTIFICATION. Learning types remain PRIVATE_CASE_LEARNING, SANITIZED_PATTERN_CANDIDATE, CERTIFIED_UAE_WORK_RIGHTS_PATTERN. Raw tenant evidence cannot enter cross-tenant patterns.

---

# INT-10 — Agent and Capability Access Contract

ParticipantAccessGrant binds one participant to one tenant/room/question with registry/capability/certification refs, authorized evidence/memory/tools/skills, prohibited actions, cost/tool-call limits, expiry and policy authority.

Participants cannot widen scope, grant tools, introduce uncertified skills, access another tenant's raw evidence, mutate verification state, promote learning, self-approve consequential recommendations, or execute user/Production actions merely because a Case Room recommends them.

---

# Domain 12 — Legal ↔ Plain-Language Translation Interface

This is an interface for existing Core Domain 12. It does not create INT-11.

## Purpose

Translate governed legal, procedural, and specialist findings into decision-useful plain-language meaning, and worker or employer questions into legally and procedurally actionable meaning, without changing underlying evidence, confidence, disagreement, authority or provenance.

## Input

```text
tenant_id
case_id
question_id / decision context
target_audience
evidence_refs[]
specialist_claim_refs[]
contradiction_refs[]
missing_evidence_refs[]
claim_confidence_refs[]
approved_terminology_or_knowledge_refs[]
```

## Output

```text
plain_language_meaning
legal_or_procedural_meaning
decision_implication
preserved_evidence_refs[]
preserved_claim_refs[]
preserved_contradiction_refs[]
preserved_missing_evidence_refs[]
preserved_claim_confidence_refs[]
limitations[]
translation_provenance
```

## Prohibited

Translation MUST NOT change evidence verification state, create VERIFIED evidence, increase confidence, suppress contradiction or missing evidence, convert hypotheses into facts, create unsupported findings, grant human approval, approve consequential action, change participant permissions, widen tenant access, silently alter legal and practical meaning, or manufacture legal, financial, or procedural impact.

## Failure / HOLD states

- `INSUFFICIENT_EVIDENCE`: HOLD; resolvable by additional authorized evidence or narrower governed scope.
- `UNRESOLVED_CONTRADICTION`: HOLD when material; resolvable by additional evidence or authorized human input.
- `OUTSIDE_AUTHORIZED_SCOPE`: terminal HOLD for current scope unless authority changes it.
- `UNSUPPORTED_TRANSLATION`: HOLD/reject; retry only with supported source meaning/evidence or narrower wording.
- `TENANT_ACCESS_DENIED`: terminal HOLD for current access context.
- `HUMAN_ESCALATION_REQUIRED`: terminal for automated progression until human input/approval is recorded.

## Ownership and persistence

Domain 12 owns translation logic and TranslationArtifact creation. Evidence Engine owns evidence integrity/verification. SpecialistContribution/Case Room owns claims, contradictions, missing evidence and claim confidence. Tenant Isolation/Governance Access owns tenant and permission policy.

Translation may be transient during reasoning. Any translation referenced by an Answer Packet, Finding, Decision or durable audit record is persisted as a tenant-scoped, append-only/versioned TranslationArtifact in the Case Store. Only the Translation Service under authorized actor context creates a new version. Source evidence/claims are never mutated. Provenance retains source refs, preserved confidence, terminology refs, service/version identity, actor and audit refs.

## Canonical audit events

```text
TRANSLATION_REQUESTED
TRANSLATION_STARTED
TRANSLATION_COMPLETED
TRANSLATION_HELD
TRANSLATION_REJECTED
TRANSLATION_HUMAN_ESCALATED
```

Every completed translation is reconstructable to the exact claims and evidence translated.

## Acceptance requirements

1. evidence refs survive unchanged;
2. contradictions survive unchanged;
3. missing evidence survives unchanged;
4. LOW confidence cannot become MEDIUM/HIGH;
5. hypotheses cannot become supported facts;
6. cross-tenant refs are rejected;
7. unsupported legal or financial implications create HOLD;
8. translation cannot grant approval;
9. provenance is auditable;
10. plain-language output remains meaning-equivalent to the technical source.

---

# Cross-contract lifecycle

```text
Case Question
→ INT-10 participant eligibility
→ INT-01 evidence refs
→ INT-02 verification / missing-evidence lifecycle
→ INT-03 employment rights journey
→ INT-04 independent contributions
→ INT-05 controlled Case Room
→ INT-06 contradiction, confidence, disconfirmation
→ Domain 12 governed translation where routed
→ INT-07 Answer Packet
→ INT-08 human/governed decision and outcome
→ INT-09 governed learning
```

Heavy implementation, runtime orchestration, database schema work, Production/Vercel changes, autonomous consequential action, cross-tenant learning and external-skill execution remain unauthorized.