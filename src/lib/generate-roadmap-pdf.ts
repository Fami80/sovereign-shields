import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  COMPANY_LABELS,
  CONTRACT_LABELS,
  DISPUTE_LABELS,
  type ExposureState,
} from "./exposure-store";

// Kinetic Luxury palette (corporate)
const PRIMARY: [number, number, number] = [3, 43, 36]; // #032B24
const SLATE: [number, number, number] = [74, 107, 98]; // #4A6B62
const INK: [number, number, number] = [10, 34, 28]; // #0A221C
const PAPER: [number, number, number] = [244, 247, 245]; // #F4F7F5
const MUTED: [number, number, number] = [120, 134, 128];

const MARGIN = 20; // mm
const PAGE_W = 210;
const PAGE_H = 297;

function fmt(n: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(n);
}

function riskColor(label: ExposureState["riskLabel"]): [number, number, number] {
  if (label === "Low Risk") return [22, 101, 78];
  if (label === "Moderate Risk") return [180, 95, 6];
  return [153, 27, 27];
}

function footer(doc: jsPDF, page: number, total: number) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    `UAE Workrights  |  Confidential Report  |  Page ${page} of ${total}`,
    PAGE_W / 2,
    PAGE_H - 10,
    { align: "center" },
  );
  doc.setDrawColor(...SLATE);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, PAGE_H - 14, PAGE_W - MARGIN, PAGE_H - 14);
}

function sectionTitle(doc: jsPDF, eyebrow: string, title: string, y = 40) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...SLATE);
  doc.text(eyebrow.toUpperCase(), MARGIN, y, { charSpace: 0.8 });
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text(title, MARGIN, y + 9);
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y + 13, MARGIN + 18, y + 13);
}

export function generateRoadmapPDF(s: ExposureState) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const TOTAL_PAGES = 6;

  // ===== Page 1: Cover =====
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, PAGE_W, 70, "F");
  doc.setFillColor(0, 229, 153);
  doc.rect(0, 70, PAGE_W, 1.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(0, 229, 153);
  doc.text("UAEWORKRIGHTS  ×  KAOUTAR MAKRACHE", MARGIN, 28, { charSpace: 1.2 });

  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text("Premium Legal", MARGIN, 50);
  doc.text("Roadmap", MARGIN, 60);

  // Metadata block
  const date = new Date().toLocaleDateString("en-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setDrawColor(...SLATE);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, 110, PAGE_W - MARGIN, 110);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...SLATE);
  doc.text("ISSUED", MARGIN, 120, { charSpace: 0.8 });
  doc.text("JURISDICTION", MARGIN + 60, 120, { charSpace: 0.8 });
  doc.text("REFERENCE", MARGIN + 120, 120, { charSpace: 0.8 });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...INK);
  doc.text(date, MARGIN, 127);
  doc.text(COMPANY_LABELS[s.company], MARGIN + 60, 127);
  doc.text(`SVR-${Date.now().toString().slice(-8)}`, MARGIN + 120, 127);

  doc.line(MARGIN, 135, PAGE_W - MARGIN, 135);

  // Summary statement
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...INK);
  const intro =
    "This document compiles a confidential exposure assessment for the engagement scenario provided. " +
    "Findings reflect statutory thresholds under UAE Federal Labour Law and applicable freezone employment regimes.";
  doc.text(doc.splitTextToSize(intro, PAGE_W - MARGIN * 2), MARGIN, 150);

  // Classification footer
  doc.setFillColor(...INK);
  doc.rect(0, PAGE_H - 28, PAGE_W, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(0, 229, 153);
  doc.text("DOCUMENT CLASSIFICATION", MARGIN, PAGE_H - 18, { charSpace: 1 });
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text("STRICTLY CONFIDENTIAL", MARGIN, PAGE_H - 10);

  // ===== Page 2: Exposure Summary =====
  doc.addPage();
  sectionTitle(doc, "Section 02", "Regulatory Exposure Summary");

  const risk = riskColor(s.riskLabel);

  // Total card
  doc.setFillColor(...PRIMARY);
  doc.roundedRect(MARGIN, 65, PAGE_W - MARGIN * 2, 50, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("TOTAL STATUTORY EXPOSURE", MARGIN + 8, 78, { charSpace: 1 });
  doc.setFontSize(28);
  doc.setTextColor(0, 229, 153);
  doc.text(fmt(s.total), MARGIN + 8, 95);

  // Risk badge
  doc.setFillColor(...risk);
  const badgeW = 50;
  doc.roundedRect(PAGE_W - MARGIN - badgeW - 8, 80, badgeW, 12, 6, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(s.riskLabel.toUpperCase(), PAGE_W - MARGIN - badgeW / 2 - 8, 88, {
    align: "center",
  });

  // Breakdown summary table
  autoTable(doc, {
    startY: 130,
    margin: { left: MARGIN, right: MARGIN },
    head: [["Component", "Value"]],
    body: [
      ["Contract type", CONTRACT_LABELS[s.contract]],
      ["Employer jurisdiction", COMPANY_LABELS[s.company]],
      ["Base monthly salary", fmt(s.salary)],
      ["Years of service", `${s.years} year${s.years === 1 ? "" : "s"}`],
      ["Dispute reason", DISPUTE_LABELS[s.reason]],
      [
        "End-of-service gratuity",
        fmt(s.eosg),
      ],
      ["Dispute compensation", fmt(s.dispute)],
      ["Total aggregate exposure", fmt(s.total)],
    ],
    theme: "grid",
    styles: { font: "helvetica", overflow: "linebreak", cellWidth: "wrap", fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: PRIMARY, textColor: 255, fontStyle: "bold", font: "helvetica" },
    bodyStyles: { textColor: INK, fontSize: 10, font: "helvetica" },
    alternateRowStyles: { fillColor: PAPER },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 80, halign: "right", fontStyle: "bold" },
    },
  });

  footer(doc, 2, TOTAL_PAGES);

  // ===== Page 3: EOSG Breakdown =====
  doc.addPage();
  sectionTitle(doc, "Section 03", "Statutory EOSG Breakdown");

  const daily = s.salary / 30;
  const eosgRows: (string | number)[][] = [];

  if (s.company === "mohre") {
    const yrs1 = Math.min(s.years, 5);
    const yrs2 = Math.max(0, s.years - 5);
    eosgRows.push(
      [
        "Daily wage basis",
        "Salary / 30",
        "—",
        fmt(daily),
      ],
      [
        "Years 1–5 entitlement",
        `${yrs1} yrs × 21 days`,
        `${(yrs1 * 21).toFixed(1)} days`,
        fmt(daily * 21 * yrs1),
      ],
    );
    if (yrs2 > 0) {
      eosgRows.push([
        "Beyond year 5",
        `${yrs2} yrs × 30 days`,
        `${(yrs2 * 30).toFixed(1)} days`,
        fmt(daily * 30 * yrs2),
      ]);
    }
    eosgRows.push([
      "Statutory cap",
      "≤ 24 months salary",
      "—",
      fmt(s.salary * 24),
    ]);
  } else {
    const months = s.years * 12;
    const m1 = Math.min(months, 60);
    const m2 = Math.max(0, months - 60);
    eosgRows.push(
      [
        "DEWS contribution basis",
        "Monthly accrual",
        "—",
        fmt(s.salary),
      ],
      [
        "Months 1–60",
        `${m1} × 5.83%`,
        `${m1.toFixed(0)} mo`,
        fmt(s.salary * 0.0583 * m1),
      ],
    );
    if (m2 > 0) {
      eosgRows.push([
        "Months 61+",
        `${m2} × 8.33%`,
        `${m2.toFixed(0)} mo`,
        fmt(s.salary * 0.0833 * m2),
      ]);
    }
  }

  eosgRows.push([
    {
      content: "Final capped EOSG",
      colSpan: 3,
      styles: { fontStyle: "bold", fillColor: PRIMARY, textColor: 255 },
    } as never,
    {
      content: fmt(s.eosg),
      styles: {
        fontStyle: "bold",
        fillColor: PRIMARY,
        textColor: [0, 229, 153] as never,
        halign: "right",
      },
    } as never,
  ]);

  autoTable(doc, {
    startY: 65,
    margin: { left: MARGIN, right: MARGIN },
    head: [["Component", "Formula", "Quantum", "Value"]],
    body: eosgRows as never,
    theme: "grid",
    styles: { font: "helvetica", overflow: "linebreak", cellWidth: "wrap", fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: PRIMARY, textColor: 255, font: "helvetica" },
    bodyStyles: { textColor: INK, fontSize: 10, font: "helvetica" },
    alternateRowStyles: { fillColor: PAPER },
    columnStyles: {
      0: { cellWidth: 55 },
      1: { cellWidth: 50 },
      2: { cellWidth: 25, halign: "right" },
      3: { cellWidth: 40, halign: "right" },
    },
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(
    s.company === "mohre"
      ? "MOHRE Mainland: 21 days/year for first 5 years, 30 days/year thereafter, capped at 2 years salary."
      : "DIFC / ADGM (DEWS): 5.83% of monthly salary for months 1–60; 8.33% beyond.",
    MARGIN,
    PAGE_H - 25,
    { maxWidth: PAGE_W - MARGIN * 2 },
  );

  footer(doc, 3, TOTAL_PAGES);

  // ===== Page 4: Dispute Compensation =====
  doc.addPage();
  sectionTitle(doc, "Section 04", "Dispute Compensation Analysis");

  let disputeFormula = "";
  let disputeBody: (string | number)[][] = [];

  if (s.reason === "arbitrary") {
    const base = s.salary * 3;
    disputeFormula = "Salary × 3 months (statutory ceiling)";
    disputeBody = [
      ["Base compensation ceiling", "Salary × 3", fmt(base)],
    ];
    if (s.contract === "limited") {
      disputeBody.push([
        "Limited-term penalty multiplier",
        "× 1.25",
        fmt(base * 1.25 - base),
      ]);
    }
  } else if (s.reason === "notice") {
    disputeFormula = "Salary × 1.5 months equivalent";
    disputeBody = [["Notice non-compliance compensation", "Salary × 1.5", fmt(s.salary * 1.5)]];
  } else if (s.reason === "gratuity") {
    disputeFormula = "Recoverable wage exposure baseline";
    disputeBody = [["Wage recovery baseline", "Salary × 1", fmt(s.salary)]];
  } else {
    const yrsFactor = Math.min(6, Math.max(1, s.years));
    disputeFormula = "Salary × 0.5 × min(6, years)";
    disputeBody = [
      [
        "Liquidated damages estimate",
        `Salary × 0.5 × ${yrsFactor}`,
        fmt(s.salary * 0.5 * yrsFactor),
      ],
    ];
  }

  disputeBody.push([
    {
      content: "Total dispute compensation",
      colSpan: 2,
      styles: { fontStyle: "bold", fillColor: PRIMARY, textColor: 255 },
    } as never,
    {
      content: fmt(s.dispute),
      styles: {
        fontStyle: "bold",
        fillColor: PRIMARY,
        textColor: [0, 229, 153] as never,
        halign: "right",
      },
    } as never,
  ]);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  doc.text(
    `Claim category: ${DISPUTE_LABELS[s.reason]}`,
    MARGIN,
    65,
  );
  doc.setTextColor(...MUTED);
  doc.text(`Formula applied: ${disputeFormula}`, MARGIN, 72);

  autoTable(doc, {
    startY: 80,
    margin: { left: MARGIN, right: MARGIN },
    head: [["Item", "Formula", "Value"]],
    body: disputeBody as never,
    theme: "grid",
    styles: { font: "helvetica", overflow: "linebreak", cellWidth: "wrap", fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: PRIMARY, textColor: 255, font: "helvetica" },
    bodyStyles: { textColor: INK, fontSize: 10, font: "helvetica" },
    alternateRowStyles: { fillColor: PAPER },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 60 },
      2: { cellWidth: 40, halign: "right" },
    },
  });

  footer(doc, 4, TOTAL_PAGES);

  // ===== Page 5: Escalation Protocol =====
  doc.addPage();
  sectionTitle(doc, "Section 05", "Escalation Protocol Roadmap");

  const nodes = [
    {
      n: "01",
      title: "Internal Grievance",
      body: "Formal written notice to HR / Director. Recommended window: 7 working days. Establishes evidentiary trail.",
    },
    {
      n: "02",
      title: "MOHRE Triage Filing",
      body: "File complaint with the Ministry of Human Resources. Mandatory pre-litigation mediation, resolved within 14 days.",
    },
    {
      n: "03",
      title: "Labour Court Escalation",
      body: "Refer to Court of First Instance if unresolved. Court-fee exempt for employee claims under AED 100,000.",
    },
  ];

  let y = 65;
  nodes.forEach((node) => {
    doc.setFillColor(...PRIMARY);
    doc.roundedRect(MARGIN, y, 14, 14, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 229, 153);
    doc.text(node.n, MARGIN + 7, y + 9, { align: "center" });

    doc.setFontSize(13);
    doc.setTextColor(...INK);
    doc.text(node.title, MARGIN + 22, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...SLATE);
    doc.text(doc.splitTextToSize(node.body, PAGE_W - MARGIN * 2 - 24), MARGIN + 22, y + 12);
    y += 38;
  });

  footer(doc, 5, TOTAL_PAGES);

  // ===== Page 6: Next Steps =====
  doc.addPage();
  sectionTitle(doc, "Section 06", "Next Steps & Execution");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...INK);
  doc.text("Immediate protective measures", MARGIN, 70);

  const steps = [
    "Preserve all written correspondence, contracts and payslips in an encrypted store.",
    "Avoid signing waivers, release letters or settlement agreements without senior counsel review.",
    "Calendar statutory limitation periods — most labour claims lapse one year from termination.",
    "Mirror this exposure report to your finance lead so settlement provisions can be reserved.",
    "Engage UAEworkrights for a fast-tracked 24-hour triage to confirm figures and pressure points.",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  let sy = 80;
  steps.forEach((step, i) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 100, 80);
    doc.text(`${i + 1}.`, MARGIN, sy);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(step, PAGE_W - MARGIN * 2 - 8);
    doc.text(lines, MARGIN + 7, sy);
    sy += lines.length * 5 + 3;
  });

  // Closing block
  doc.setFillColor(...PRIMARY);
  doc.roundedRect(MARGIN, sy + 8, PAGE_W - MARGIN * 2, 50, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(0, 229, 153);
  doc.text("SCHEDULE YOUR DEDICATED CONSULTATION", MARGIN + 8, sy + 20, {
    charSpace: 1,
  });
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("Senior counsel review · within 24 hours", MARGIN + 8, sy + 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(
    "vault.sovereign.ae  ·  +971 4 000 0000  ·  triage@sovereign.ae",
    MARGIN + 8,
    sy + 42,
  );

  footer(doc, 6, TOTAL_PAGES);

  doc.save("UAE_Compliance_Roadmap_Confidential.pdf");
}
