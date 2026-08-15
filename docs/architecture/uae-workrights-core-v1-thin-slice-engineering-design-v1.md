# UAE Work Rights Core V1 Thin-Slice Engineering Design Package

## Status

- Architecture / engineering design only
- Core domain count remains 13
- Heavy implementation is not authorized
- No runtime orchestration, database migration, Production action, Vercel change, or autonomous decision is authorized by this document
- INT-01 through INT-10 remain the governed contract set

## UAE legal-information boundary

- Scope: UAE employment-rights information, evidence organization, entitlement calculation support, and governed case guidance.
- The system does not create a lawyer-client relationship and must not present automated output as definitive legal advice.
- Legal propositions must reference an authorized source, jurisdiction, citation, effective date, and retrieval date.
- Conflicting or outdated legal authority produces a governed HOLD, not a confident answer.
- Court, limitation, complaint, appeal, immigration, termination, safety, or other consequential deadlines require explicit human escalation.
- User-facing consequential conclusions require qualified human legal review where policy requires it.

## Design objective

Translate the approved intelligence architecture into an implementation-ready thin-slice design without reopening the Core V1 domain model.

```text
Evidence Intake
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
```

---

# 1. Engineering principles

1. Evidence is immutable by reference; corrections create new versions.
2. Interpretation is separate from evidence.
3. Every cross-domain object is tenant/case scoped.
4. No participant has ambient access to all case data.
5. Orchestration is policy-driven and budget bounded.
6. Consequential conclusions require disconfirmation.
7. Human approval is a separate gate.
8. Decisions, actions, outcomes and learning are separate records.
9. Every state transition is auditable.
10. Failure degrades to governed HOLD, INSUFFICIENT_EVIDENCE, or HUMAN_ESCALATION.

---

# 2. Logical component map

```text
Intake Adapters
→ Evidence Service
→ Verification Service
→ Employment Rights Journey / Assessment Service
→ Specialist Runtime
→ Orchestration Service
→ Translation Service
→ Approval Gate
→ Answer / Finding Service
→ Decision / Outcome Service
→ Learning Gate
→ Case Memory Service

Cross-cutting:
Tenant / Permission Policy
Agent Registry
Capability Registry
Audit Log
Cost / Time Budgeting
```

These are logical boundaries, not mandatory microservices.

---

# 3. Storage ownership

Evidence Store owns EvidenceObject, VerificationRecord, MissingEvidenceRequirement, evidence version history and provenance.

Case Store owns CaseQuestion, EmploymentRightsJourney, CaseRoom, SpecialistContribution, Contradiction, ClaimConfidence, DisconfirmationRecord, TranslationArtifact and AnswerPacket.

Governance Store owns ParticipantAccessGrant, human approval records, permission decisions, capability/certification refs, and budget/stopping records.

Decision / Outcome Store owns DecisionRecord, action execution refs, OutcomeRecord and validation results.

Case Memory Store owns private case learning, sanitized pattern candidates, certified patterns, and promotion/certification history.

One physical database may later host these stores, but logical ownership and service boundaries must remain explicit.

---

# 4. INT-01 — Evidence engineering interface

```text
createEvidence(input, actorContext) -> EvidenceObjectRef
supersedeEvidence(evidenceId, replacementInput, actorContext) -> EvidenceObjectRef
recordMissingEvidence(requirement, actorContext) -> MissingEvidenceRequirementRef
resolveMissingEvidenceRequirement(requirementId, newEvidenceRef, actorContext)
supersedeMissingEvidenceRequirement(requirementId, reason, actorContext)
getEvidence(evidenceId, accessContext) -> EvidenceObject
listCaseEvidence(caseId, filters, accessContext) -> EvidenceObjectRef[]
```

Tenant is derived from authenticated case context. Evidence versions are immutable. Provenance is mandatory. Interpretation cannot be stored as evidence verification state.

## Missing-evidence lifecycle

```text
OPEN MissingEvidenceRequirement
→ new canonical EvidenceObject obtained
→ new EvidenceObject follows its own verification lifecycle
→ requirement becomes RESOLVED and references that EvidenceObject
```

A missing requirement never becomes VERIFIED. If no longer relevant it becomes SUPERSEDED with a reason/reference. Both requirement and evidence remain in history.

Events:

```text
EVIDENCE_CREATED
EVIDENCE_SUPERSEDED
MISSING_EVIDENCE_RECORDED
MISSING_EVIDENCE_RESOLVED
MISSING_EVIDENCE_SUPERSEDED
```

---

# 5. INT-02 — Verification engineering interface

```text
requestVerification(evidenceId, method, actorContext)
recordVerificationResult(verificationInput, authorizedVerifierContext)
getVerificationState(evidenceId, accessContext)
```

Unsupported state transitions fail closed. Specialist contributors cannot self-promote evidence to VERIFIED. Conflicting evidence may move VERIFIED to DISPUTED without deleting history.

Events:

```text
VERIFICATION_REQUESTED
EVIDENCE_VERIFIED
EVIDENCE_DISPUTED
EVIDENCE_SUPERSEDED
```

`EVIDENCE_MARKED_SUPERSEDED` is non-canonical and must not be emitted.

---

# 6. INT-03 — Employment Rights Journey engineering interface

```text
createEmploymentRightsJourney(caseId, journeyInput, actorContext)
updateJourneyStructure(journeyId, patch, actorContext)
attachEvidenceToJourneyStage(journeyId, stageId, evidenceRefs, actorContext)
getEmploymentRightsJourney(journeyId, accessContext)
getJourneyStageEvidence(journeyId, stageId, accessContext)
```

Expected and observed states remain separate. Missing evidence uses requirement refs. Technical failure cannot auto-create a rights-impact finding.

Event: `EMPLOYMENT_RIGHTS_JOURNEY_UPDATED`.

---

# 7. INT-04 — Specialist Contribution engineering interface

```text
submitSpecialistContribution(roomId, contribution, participantContext)
```

Validation checks participant grant, room/tenant, round eligibility, evidence authorization, support classification, claim-level confidence and immutable custody. Round 1 contributions remain independent until collection closes.

Events: `SPECIALIST_CONTRIBUTION_ACCEPTED`, `SPECIALIST_CONTRIBUTION_REJECTED`.

---

# 8. INT-05 — Case Room engineering interface

```text
openCaseRoom(caseQuestionId, routingDecision, orchestrationContext)
selectParticipants(roomId, participantPlan, orchestrationContext)
startRound(roomId, roundType, orchestrationContext)
closeRound(roomId, reason, orchestrationContext)
closeCaseRoom(roomId, stoppingCondition, orchestrationContext)
getCaseRoom(roomId, accessContext)
getAuthorizedRoomContext(roomId, participantId, accessContext)
```

RoutingDecision includes question type, required/optional/excluded capabilities, participant limit, max rounds, cost/time/tool budgets, mandatory challenge, and human-approval precondition.

## Three-round thin-slice controller

Pipeline stages and deliberation rounds are not automatically the same thing. For the first executable slice, `max_rounds = 3`:

```text
PRE-ROUND
Question classification / routing / participant selection

ROUND 1
Independent specialist contributions

ROUND 2
Contradiction detection + challenge / mandatory disconfirmation

ROUND 3
Evidence reconciliation + final synthesis

POST-ROUND
Human approval where required + Answer Packet custody
```

PRE-ROUND and POST-ROUND do not increment the deliberation-round counter. No hidden fourth round is permitted. Independence, contradiction detection, disconfirmation, reconciliation, synthesis and final Answer Packet custody must fit this model.

Stop on sufficient answer, insufficient evidence, human escalation, unsafe unresolved contradiction, exhausted budget, unavailable capability, permission denial, or authorized human pause/close.

Events: `CASE_ROOM_OPENED`, `PARTICIPANTS_SELECTED`, `ROUND_STARTED`, `ROUND_CLOSED`, `CASE_ROOM_STOPPED`.

---

# 9. INT-06 — Contradiction, Confidence, Disconfirmation

```text
recordContradiction(roomId, claimA, claimB, evidenceRefs, orchestrationContext)
resolveContradiction(contradictionId, resolution, authorizedContext)
recordClaimConfidence(claimId, level, reason, refs, participantContext)
runDisconfirmationPass(roomId, candidateConclusion, orchestrationContext)
```

No aggregate room confidence is permitted. Consequential synthesis requires a conforming DisconfirmationRecord.

Events: `CONTRADICTION_RECORDED`, `CONTRADICTION_RESOLVED`, `DISCONFIRMATION_COMPLETED`.

---

# 10. INT-07 — Answer Packet engineering interface

```text
synthesizeAnswerPacket(roomId, orchestrationContext) -> AnswerPacket
renderAnswer(answerId, mode: EXECUTIVE | INVESTIGATOR, accessContext)
```

Preconditions: evidence refs valid; required thin-slice controls complete; consequential conclusions disconfirmed; contradictions/missing evidence retained; claim confidence attached; human approval requirement calculated but not self-approved.

Event: `ANSWER_PACKET_CREATED`.

---

# 11. INT-08 — Decision and Outcome engineering interface

```text
recordDecision(answerId, decisionInput, humanContext)
recordActionExecution(decisionId, actionRef, executionContext)
recordOutcome(decisionId, outcomeInput, reviewerContext)
validateOutcome(outcomeId, validationInput, reviewerContext)
```

```text
RECOMMENDED → DECIDED → EXECUTED → MEASURED → VALIDATED
```

Skipping states is prohibited for governed learning.

Events: `DECISION_RECORDED`, `ACTION_RECORDED`, `OUTCOME_RECORDED`, `OUTCOME_VALIDATED`.

---

# 12. INT-09 — Case Memory Learning engineering interface

```text
retrieveCaseMemory(query, participantAccessGrant) -> MemoryRef[]
createPrivateCaseLearning(sourceRefs, learningInput, authorizedContext)
proposeSanitizedPattern(learningId, sanitizedInput, authorizedContext)
certifyUAEWorkRightsPattern(patternCandidateId, certificationInput, authorizedHumanContext)
```

Retrieval is tenant/role/permission/sensitivity/certification/applicability/recency filtered. Promotion is explicit and auditable. Raw tenant evidence cannot enter cross-tenant certified patterns.

Events: `PRIVATE_CASE_LEARNING_CREATED`, `PATTERN_CANDIDATE_CREATED`, `PATTERN_CERTIFIED`.

---

# 13. INT-10 — Agent / Capability Access engineering interface

```text
resolveParticipantEligibility(roomId, requestedRole, policyContext)
issueParticipantAccessGrant(roomId, participantId, scopedAccess, policyAuthority)
revokeParticipantAccessGrant(grantId, policyAuthority)
```

Every invocation checks active grant, tenant, room, role/capability, evidence/memory/tool scope, skill certification, budget and expiry.

Events: `PARTICIPANT_ACCESS_GRANTED`, `PARTICIPANT_ACCESS_DENIED`, `PARTICIPANT_ACCESS_REVOKED`.

---

# 13A. Domain 12 — Legal ↔ Plain-Language Translation engineering interface

This is the governed interface for existing Domain 12; it does not create INT-11.

## Purpose

Translate governed technical/specialist findings into decision-useful plain-language meaning, and worker or employer questions into legally and procedurally actionable meaning, without changing evidence, confidence, disagreement, authority or provenance.

## Interface

```text
requestTranslation({
  tenant_id,
  case_id,
  question_id_or_decision_context,
  target_audience,
  evidence_refs[],
  specialist_claim_refs[],
  contradiction_refs[],
  missing_evidence_refs[],
  claim_confidence_refs[],
  approved_terminology_or_knowledge_refs[]
}, actorContext) -> TranslationRequestRef

executeTranslation(translationRequestId, translationContext)
  -> TranslationArtifact | TranslationHold

getTranslation(translationId, accessContext) -> TranslationArtifact
```

## TranslationArtifact

```text
translation_id
tenant_id
case_id
question_id_or_decision_context
target_audience
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
created_by
created_at
audit_ref
```

## Prohibited transformations

Translation MUST NOT change evidence verification state, create VERIFIED evidence, increase claim confidence, suppress contradictions or missing evidence, convert hypotheses to facts, create unsupported findings, grant human approval, approve consequential action, change permissions, widen tenant access, silently alter legal and practical meaning, or manufacture legal, financial, or procedural impact.

## Failure / HOLD states

- `INSUFFICIENT_EVIDENCE`: HOLD; resolvable through authorized evidence or narrower governed scope.
- `UNRESOLVED_CONTRADICTION`: HOLD when material; resolvable through evidence or authorized human input.
- `OUTSIDE_AUTHORIZED_SCOPE`: terminal HOLD for current scope unless authority changes scope.
- `UNSUPPORTED_TRANSLATION`: HOLD/reject; retry only with supported source meaning/evidence or narrower wording.
- `TENANT_ACCESS_DENIED`: terminal HOLD for current access context.
- `HUMAN_ESCALATION_REQUIRED`: terminal for automated progression until human input/approval exists.

## Ownership / persistence

Domain 12 owns translation logic and TranslationArtifact creation. Evidence Engine owns evidence integrity/verification. SpecialistContribution/Case Room records own claims, contradictions, missing evidence and confidence. Tenant Isolation/Governance Access owns tenant/permission enforcement.

Translation may be transient during deliberation. Any translation referenced by an Answer Packet, Finding, Decision or durable audit record is persisted in the Case Store as append-only/versioned custody. New versions may only be created by the Translation Service under authorized actor context. Source evidence and claims are never mutated.

Provenance records source evidence/claim/contradiction/missing-evidence/confidence refs, terminology refs, service/version identity, actor, causation/correlation and audit ref.

Canonical events:

```text
TRANSLATION_REQUESTED
TRANSLATION_STARTED
TRANSLATION_COMPLETED
TRANSLATION_HELD
TRANSLATION_REJECTED
TRANSLATION_HUMAN_ESCALATED
```

Every completed translation must reconstruct to the exact claims and evidence translated.

---

# 14. Canonical event backbone

```text
EVIDENCE_CREATED
EVIDENCE_SUPERSEDED
MISSING_EVIDENCE_RECORDED
MISSING_EVIDENCE_RESOLVED
MISSING_EVIDENCE_SUPERSEDED
VERIFICATION_REQUESTED
EVIDENCE_VERIFIED
EVIDENCE_DISPUTED
EMPLOYMENT_RIGHTS_JOURNEY_UPDATED
PARTICIPANT_ACCESS_GRANTED
CASE_ROOM_OPENED
PARTICIPANTS_SELECTED
ROUND_STARTED
SPECIALIST_CONTRIBUTION_ACCEPTED
CONTRADICTION_RECORDED
DISCONFIRMATION_COMPLETED
TRANSLATION_REQUESTED
TRANSLATION_STARTED
TRANSLATION_COMPLETED
TRANSLATION_HELD
TRANSLATION_REJECTED
TRANSLATION_HUMAN_ESCALATED
ANSWER_PACKET_CREATED
DECISION_RECORDED
ACTION_RECORDED
OUTCOME_RECORDED
OUTCOME_VALIDATED
PRIVATE_CASE_LEARNING_CREATED
PATTERN_CANDIDATE_CREATED
PATTERN_CERTIFIED
CASE_ROOM_STOPPED
```

`EVIDENCE_SUPERSEDED` is the single canonical supersession event.

Each GovernedEvent retains event_id, event_type, tenant_id, case_id, optional room_id, aggregate_ref, actor_ref, occurred_at, causation_id, correlation_id, payload_version and audit_ref.

---

# 15. Logical API boundaries

```text
EvidenceAPI
VerificationAPI
EmploymentRightsJourneyAPI
OrchestrationAPI
ContributionAPI
TranslationAPI
AnswerAPI
DecisionOutcomeAPI
CaseMemoryAPI
GovernanceAccessAPI
```

Cross-domain direct persistence access is prohibited.

---

# 16. Threat model

- T-01 cross-tenant leakage: derive tenant from case context, authorize every ref, test IDOR substitution.
- T-02 self-escalation: participants cannot alter access grants; enforcement sits outside model output.
- T-03 evidence inflation: Evidence Engine alone changes verification state.
- T-04 contradiction suppression: contradictions persist independently and flow into Answer Packet.
- T-05 false confidence averaging: confidence is claim-scoped only.
- T-06 runaway deliberation: hard participant/round/time/tool/cost budgets; thin slice max 3 rounds.
- T-07 unauthorized action: Answer Packet recommends only; human DecisionRecord required; no autonomous consequential executor.
- T-08 memory poisoning: learning gates, certification, applicability bounds, no raw tenant evidence in cross-tenant patterns.
- T-09 stale/superseded evidence: freshness/supersession checked during query/synthesis.
- T-10 audit tampering: append-only audit/event records.
- T-11 translation meaning inflation: translation preserves source refs, confidence, contradiction and missing evidence; unsupported implication returns HOLD.

---

# 17. Human approval matrix

Human approval is mandatory for financially material, legal/regulatory, security-sensitive, user-facing, irreversible/hard-to-reverse, low-confidence, materially disputed, permission-changing, tenant-sensitive-disclosure, or consequential durable-learning recommendations.

Approval requirement is deterministically derived from policy/case metadata. Translation or specialist models cannot satisfy or suppress it.

---

# 18. Acceptance test matrix

## Evidence integrity
- require jurisdiction, authority level, citation, effective date and retrieval date for legal propositions;
- hold conclusions that rely on conflicting, expired or superseded legal authority;
- create evidence with provenance;
- reject missing tenant/case context;
- prevent in-place mutation;
- preserve superseded evidence;
- deny cross-tenant read;
- prevent specialist verification mutation;
- prove MissingEvidenceRequirement never becomes VERIFIED;
- resolve it only by reference to a separate new EvidenceObject and preserve both histories.

## Contribution discipline
- reject supported claim with zero evidence refs;
- accept labeled hypothesis;
- reject unauthorized evidence ref;
- preserve claim confidence;
- isolate Round 1.

## Case Room governance
- eligible participants only;
- enforce budgets;
- enforce max 3 deliberation rounds;
- Round 1 independence;
- Round 2 contradiction + disconfirmation;
- Round 3 reconciliation + synthesis;
- PRE/POST stages do not increment round count;
- no hidden fourth round;
- stop on insufficient evidence/human escalation;
- no unrestricted agent exchange.

## Contradiction / challenge
- persist competing claims;
- retain unresolved material disagreement;
- require disconfirmation for consequential conclusions;
- reject synthesis without required challenge.

## Translation integrity
1. evidence refs survive unchanged;
2. contradictions survive unchanged;
3. missing evidence survives unchanged;
4. LOW confidence cannot become MEDIUM/HIGH;
5. hypotheses cannot become supported facts;
6. cross-tenant refs are rejected;
7. unsupported legal or financial implications create HOLD;
8. translation cannot grant approval;
9. provenance reconstructs exact source refs;
10. plain-language output remains meaning-equivalent to the technical source.

## Answer / decision / outcome
- executive/investigator views preserve evidence state/confidence/disagreement;
- recommendation cannot auto-create DecisionRecord;
- validation cannot precede measured outcome;
- INCONCLUSIVE preserved;
- learning blocked without gate.

## Auditability
Reconstruct question → evidence/missing requirements → participants → contributions → contradictions → disconfirmation → translation → answer → human decision → outcome → learning without hidden model memory.

---

# 19. Future implementation sequence

Heavy implementation is not authorized now.

Phase 1: tenant/case context, audit envelope, INT-01, INT-02 including missing-evidence lifecycle, INT-10.

Phase 2: INT-03, Employment Rights Case Assessment adapter, Domain 12 Translation interface.

Phase 3: INT-04, INT-05, bounded routing, exact three-round controller.

Phase 4: INT-06, mandatory disconfirmation, Domain 12 translation where routed, INT-07, human escalation calculation.

Phase 5: INT-08, validation, INT-09, learning promotion gates.

---

# 20. First future implementation candidate

```text
One tenant
One case
One employment-rights question
One employment rights journey
3–5 evidence objects
2 specialist participants
Maximum 3 deliberation rounds
Mandatory disconfirmation
One Answer Packet
Human approval only
No autonomous action
No cross-tenant learning
```

---

# 21. Non-goals

No all-13-domain invocation, autonomous remediation, Production action, spend changes, unrestricted browser/data access, continuous inter-agent chat, self-modifying permissions/prompts, open-ended skill intake, cross-client raw memory, universal confidence score, automatic pattern certification, or autonomous consequential action.

---

# 22. Five-lane review

Architecture Review: ownership, boundaries, event lifecycle, round model, no circular authority.

Security / Tenant Review: least privilege, IDOR resistance, no self-escalation/cross-tenant path, Translation tenant enforcement.

Evidence / Methodology Review: evidence/interpretation separation, corrected missing-evidence semantics, verification integrity, contradiction/disconfirmation, translation meaning preservation.

Employment Rights / Legal Review: journey maps to real decisions, translation does not manufacture legal and practical meaning/legal, financial, or procedural impact, outcomes remain legally and practically meaningful.

QA / Validation Review: acceptance tests executable, three-round limit and translation tests executable, audit reconstruction/HOLD states testable.

These are review lanes, not Core domains.

---

# 23. Engineering readiness gate

```text
[ ] INT-01 through INT-10 reviewed
[ ] Domain 12 translation interface reviewed
[ ] missing-evidence lifecycle reviewed
[ ] three-round thin-slice model reviewed
[ ] canonical event vocabulary reviewed
[ ] storage ownership reviewed
[ ] tenant-isolation threat model reviewed
[ ] human-approval matrix reviewed
[ ] acceptance tests reviewed
[ ] first vertical slice bounded
[ ] Core domain count remains 13
[ ] heavy implementation remains separately gated
```

## Verdict

- Thin-slice engineering design: DEFINED
- INT-01 through INT-10 mapped: YES
- Domain 12 translation contract: COMPLETE
- Missing-evidence model: CORRECTED
- Three-round model: RECONCILED
- Canonical supersession event: EVIDENCE_SUPERSEDED
- Core domain count: 13
- Heavy implementation: NOT AUTHORIZED
