import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Download,
  Send,
  AlertTriangle,
  ShieldCheck,
  FileText,
  ChevronDown,
} from "lucide-react";
import {
  PRE_DPIA_CRITERIA,
  PRE_DPIA_THRESHOLD,
  PRE_DPIA_FORM_FIELDS,
} from "../../data/preDpiaData";
import { APP_LOGO_URL } from "../DataBreach/branding";

export default function DPIASession() {
  const navigate = useNavigate();
  const resultRef = useRef(null);

  const [form, setForm] = useState({
    projectName: "",
    assessor: "",
    department: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [answers, setAnswers] = useState(
    Object.fromEntries(PRE_DPIA_CRITERIA.map((c) => [c.id, null]))
  );
  const [justifications, setJustifications] = useState(
    Object.fromEntries(PRE_DPIA_CRITERIA.map((c) => [c.id, ""]))
  );
  const [expandedCriteria, setExpandedCriteria] = useState(
    Object.fromEntries(PRE_DPIA_CRITERIA.map((c) => [c.id, true]))
  );
  const [pdfBusy, setPdfBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const yesCount = useMemo(
    () => Object.values(answers).filter((a) => a === true).length,
    [answers]
  );
  const dpiaRequired = yesCount >= PRE_DPIA_THRESHOLD;
  const allAnswered = Object.values(answers).every((a) => a !== null);
  const answeredCount = Object.values(answers).filter(
    (a) => a !== null
  ).length;
  const progress = (answeredCount / PRE_DPIA_CRITERIA.length) * 100;

  const toggleCriterion = (id) => {
    setExpandedCriteria((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToResults = () => {
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ── PDF generation ──
  const buildPdf = async () => {
    const jspdfModule = await import("jspdf");
    const jsPDF = jspdfModule.jsPDF || jspdfModule.default;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    const navy = [35, 35, 35];
    const green = [165, 98, 91];
    const red = [185, 28, 28];
    const orange = [165, 98, 91];
    const gray = [107, 114, 128];
    const pale = [245, 240, 235];

    let logoImage = null;
    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = APP_LOGO_URL;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      logoImage = {
        dataUrl: canvas.toDataURL("image/png"),
        width: img.width,
        height: img.height,
      };
    } catch (_) {}

    const drawFooter = (pageNum, totalPages) => {
      pdf.setDrawColor(...orange);
      pdf.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(...gray);
      pdf.text("Pre-DPIA Checklist Report", margin, pageHeight - 10);
      pdf.text(
        `Page ${pageNum} of ${totalPages}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: "right" }
      );
    };

    // Header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(...orange);
    pdf.text("PRE-DPIA CHECKLIST", margin, 14);

    if (logoImage) {
      try {
        const maxW = 50,
          maxH = 10;
        const scale = Math.min(
          maxW / logoImage.width,
          maxH / logoImage.height
        );
        pdf.addImage(
          logoImage.dataUrl,
          "PNG",
          pageWidth - margin - logoImage.width * scale,
          8,
          logoImage.width * scale,
          logoImage.height * scale
        );
      } catch (_) {}
    }

    pdf.setFontSize(22);
    pdf.setTextColor(...navy);
    pdf.text("Pre-DPIA Assessment Report", margin, 26);
    pdf.setDrawColor(...orange);
    pdf.line(margin, 30, pageWidth - margin, 30);

    // Case info
    pdf.setFillColor(...pale);
    pdf.roundedRect(margin, 36, contentWidth, 32, 4, 4, "F");
    const fields = [
      ["Project", form.projectName || "Not provided"],
      ["Assessor", form.assessor || "Not provided"],
      ["Department", form.department || "Not provided"],
      ["Date", form.date || "Not provided"],
    ];
    let fx = margin + 6;
    fields.forEach(([label, value]) => {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(...gray);
      pdf.text(label.toUpperCase(), fx, 44);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(...navy);
      pdf.text(value.slice(0, 30), fx, 50);
      fx += 44;
    });

    // Outcome card
    const outcomeY = 76;
    const outcomeColor = dpiaRequired ? red : green;
    pdf.setFillColor(...outcomeColor);
    pdf.roundedRect(margin, outcomeY, contentWidth, 28, 4, 4, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text("ASSESSMENT OUTCOME", margin + 6, outcomeY + 8);
    pdf.setFontSize(16);
    pdf.text(
      dpiaRequired ? "DPIA IS REQUIRED" : "DPIA IS NOT REQUIRED",
      margin + 6,
      outcomeY + 19
    );
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(
      `${yesCount} of 9 criteria met (threshold: ${PRE_DPIA_THRESHOLD})`,
      margin + 90,
      outcomeY + 19
    );

    // Criteria table
    let tableY = outcomeY + 36;
    pdf.setFillColor(...navy);
    pdf.roundedRect(margin, tableY, contentWidth, 10, 3, 3, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text("#", margin + 4, tableY + 7);
    pdf.text("CRITERION", margin + 12, tableY + 7);
    pdf.text("ANSWER", margin + 120, tableY + 7);
    pdf.text("JUSTIFICATION", margin + 140, tableY + 7);
    tableY += 10;

    PRE_DPIA_CRITERIA.forEach((criterion, index) => {
      const isYes = answers[criterion.id] === true;
      const fill = index % 2 === 0 ? [255, 255, 255] : pale;
      const rowH = 12;

      if (tableY + rowH > pageHeight - 20) {
        drawFooter(1, 2);
        pdf.addPage();
        tableY = 20;
      }

      pdf.setFillColor(...fill);
      pdf.rect(margin, tableY, contentWidth, rowH, "F");
      pdf.setDrawColor(220, 220, 230);
      pdf.rect(margin, tableY, contentWidth, rowH, "S");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(...navy);
      pdf.text(String(criterion.id), margin + 4, tableY + 8);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      const titleLines = pdf.splitTextToSize(criterion.title, 100);
      pdf.text(titleLines[0], margin + 12, tableY + 8);

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(...(isYes ? red : green));
      pdf.text(isYes ? "YES" : "NO", margin + 122, tableY + 8);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      pdf.setTextColor(...gray);
      const justText = justifications[criterion.id] || "\u2014";
      const justLines = pdf.splitTextToSize(justText, 38);
      pdf.text(justLines[0], margin + 140, tableY + 8);

      tableY += rowH;
    });

    drawFooter(1, 1);
    return pdf;
  };

  const exportPdf = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);
    try {
      const pdf = await buildPdf();
      const filename = (form.projectName || "pre-dpia-checklist")
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-|-$/g, "");
      pdf.save(`${filename}-pre-dpia.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      window.alert(
        `PDF generation failed: ${error?.message || "unknown error"}`
      );
    } finally {
      setPdfBusy(false);
    }
  };

  const sendReport = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);
    try {
      const pdf = await buildPdf();
      const filename = (form.projectName || "pre-dpia-checklist")
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-|-$/g, "");
      pdf.save(`${filename}-pre-dpia.pdf`);

      const outcome = dpiaRequired
        ? "DPIA IS REQUIRED"
        : "DPIA is NOT required";
      const subject = encodeURIComponent(
        `Pre-DPIA Assessment Report \u2014 ${form.projectName || "Untitled Project"}`
      );
      const body = encodeURIComponent(
        `Dear Privacy Team,\n\n` +
          `Please find attached the Pre-DPIA Assessment Report for the following processing activity:\n\n` +
          `Project: ${form.projectName || "Not provided"}\n` +
          `Assessor: ${form.assessor || "Not provided"}\n` +
          `Department: ${form.department || "Not provided"}\n` +
          `Date: ${form.date || "Not provided"}\n\n` +
          `Assessment outcome: ${outcome}\n` +
          `Criteria met: ${yesCount} of 9 (threshold: ${PRE_DPIA_THRESHOLD})\n\n` +
          `The PDF report has been downloaded. Please attach it to this email before sending.\n\n` +
          `Kind regards,\n${form.assessor || "Vastint User"}`
      );

      window.open(
        `mailto:privacy@vastint.com?subject=${subject}&body=${body}`,
        "_self"
      );
      setSent(true);
    } catch (error) {
      console.error("Failed to prepare report:", error);
      window.alert(
        `Failed to prepare report: ${error?.message || "unknown error"}`
      );
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <div className="w-full h-full pb-10">
      {/* Sticky header bar */}
      <div className="sticky top-0 z-20 bg-vastintDark/80 backdrop-blur-md border-b border-white/10 px-8 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/dashboard/dpias")}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-vastintPrimary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to DPIAs
          </button>

          {/* Progress indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 font-medium">
              {answeredCount} / {PRE_DPIA_CRITERIA.length} criteria answered
            </span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-vastintPrimary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {allAnswered && (
              <button
                onClick={scrollToResults}
                className="text-xs font-semibold text-vastintPrimary hover:underline"
              >
                View Results
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 pt-8">
        {/* HERO SECTION */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vastintPrimary/10 flex items-center justify-center">
              <FileText size={20} className="text-vastintPrimary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-vastintPrimary uppercase tracking-wider">
                New Assessment
              </p>
              <h1 className="text-2xl font-bold text-white">
                Pre-DPIA Checklist
              </h1>
            </div>
          </div>
          <p className="text-white/50 text-sm mt-2 max-w-2xl">
            Complete all sections below to determine whether a full DPIA is
            required. Based on the EDPB 9-criteria framework (WP 248 rev.01). If
            2 or more criteria are met, a full DPIA must be carried out.
          </p>
        </div>

        {/* SECTION 1: PROJECT INFO */}
        <section className="mb-8">
          <div className="bg-vastintSurface rounded-2xl shadow-sm border border-white/10 overflow-hidden">
            <div className="bg-vastintDark px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-vastintPrimary/20 flex items-center justify-center text-xs font-bold text-vastintPrimary">
                  1
                </span>
                Project Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {PRE_DPIA_FORM_FIELDS.map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-white/60">
                      {field.label}
                    </span>
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [field.key]: e.target.value }))
                      }
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border border-white/10 bg-vastintDark px-4 py-2.5 text-sm text-white outline-none transition focus:border-vastintPrimary focus:ring-2 focus:ring-vastintPrimary/20 placeholder:text-white/20"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CRITERIA */}
        <section className="mb-8">
          <div className="bg-vastintSurface rounded-2xl shadow-sm border border-white/10 overflow-hidden">
            <div className="bg-vastintDark px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-vastintPrimary/20 flex items-center justify-center text-xs font-bold text-vastintPrimary">
                  2
                </span>
                EDPB Criteria Assessment
              </h2>
              <p className="text-white/40 text-xs mt-1">
                Answer each of the 9 criteria below. Select Yes or No for each.
              </p>
            </div>

            <div className="divide-y divide-white/5">
              {PRE_DPIA_CRITERIA.map((criterion) => {
                const answer = answers[criterion.id];
                const isExpanded = expandedCriteria[criterion.id];
                return (
                  <div key={criterion.id} className="group">
                    {/* Criterion header */}
                    <button
                      onClick={() => toggleCriterion(criterion.id)}
                      className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/5 transition-colors"
                    >
                      {/* Status dot */}
                      <div className="shrink-0">
                        {answer === null ? (
                          <div className="w-8 h-8 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-xs font-bold text-white/30">
                            {criterion.id}
                          </div>
                        ) : answer ? (
                          <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center">
                            <CheckCircle2
                              size={18}
                              className="text-red-400"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
                            <XCircle size={18} className="text-green-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white">
                          {criterion.title}
                        </h3>
                        {!isExpanded && answer !== null && (
                          <p className="text-xs text-white/30 mt-0.5">
                            Answered:{" "}
                            {answer
                              ? "Yes \u2014 applies"
                              : "No \u2014 does not apply"}
                          </p>
                        )}
                      </div>

                      {answer !== null && (
                        <span
                          className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                            answer
                              ? "bg-red-900/40 text-red-300"
                              : "bg-green-900/40 text-green-300"
                          }`}
                        >
                          {answer ? "YES" : "NO"}
                        </span>
                      )}

                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-white/30 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Criterion body — collapsible */}
                    {isExpanded && (
                      <div className="px-6 pb-5 pl-[4.5rem]">
                        <p className="text-sm text-white/60 leading-relaxed mb-3">
                          {criterion.description}
                        </p>

                        <div className="rounded-lg border border-amber-700/30 bg-amber-900/20 p-3 mb-4">
                          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                            Example
                          </p>
                          <p className="text-sm text-amber-300/80">
                            {criterion.example}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-white/60 mb-3">
                          Does this criterion apply to your processing activity?
                        </p>

                        <div className="flex gap-3 mb-4">
                          <button
                            onClick={() =>
                              setAnswers((a) => ({
                                ...a,
                                [criterion.id]: true,
                              }))
                            }
                            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 py-2.5 font-semibold text-sm transition-all ${
                              answer === true
                                ? "border-red-500 bg-red-900/20 text-red-400"
                                : "border-white/10 bg-vastintDark text-white/50 hover:border-white/20"
                            }`}
                          >
                            <CheckCircle2 size={16} />
                            Yes
                          </button>
                          <button
                            onClick={() =>
                              setAnswers((a) => ({
                                ...a,
                                [criterion.id]: false,
                              }))
                            }
                            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 py-2.5 font-semibold text-sm transition-all ${
                              answer === false
                                ? "border-green-500 bg-green-900/20 text-green-400"
                                : "border-white/10 bg-vastintDark text-white/50 hover:border-white/20"
                            }`}
                          >
                            <XCircle size={16} />
                            No
                          </button>
                        </div>

                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold text-white/40">
                            Justification (optional)
                          </span>
                          <textarea
                            rows={2}
                            value={justifications[criterion.id]}
                            onChange={(e) =>
                              setJustifications((j) => ({
                                ...j,
                                [criterion.id]: e.target.value,
                              }))
                            }
                            placeholder="Explain why this criterion does or does not apply..."
                            className="w-full rounded-lg border border-white/10 bg-vastintDark px-4 py-2.5 text-sm text-white outline-none transition focus:border-vastintPrimary focus:ring-2 focus:ring-vastintPrimary/20 placeholder:text-white/20"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: RESULTS */}
        <section ref={resultRef} className="mb-8">
          {allAnswered ? (
            <div className="bg-vastintSurface rounded-2xl shadow-sm border border-white/10 overflow-hidden">
              <div className="bg-vastintDark px-6 py-4 border-b border-white/10">
                <h2 className="text-white font-bold text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-vastintPrimary/20 flex items-center justify-center text-xs font-bold text-vastintPrimary">
                    3
                  </span>
                  Assessment Result
                </h2>
              </div>

              <div className="p-6">
                {/* Outcome banner */}
                <div
                  className={`rounded-xl p-6 mb-6 ${
                    dpiaRequired
                      ? "bg-red-900/20 border-2 border-red-700/40"
                      : "bg-green-900/20 border-2 border-green-700/40"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {dpiaRequired ? (
                      <AlertTriangle size={28} className="text-red-400" />
                    ) : (
                      <ShieldCheck size={28} className="text-green-400" />
                    )}
                    <h3
                      className={`text-xl font-bold ${
                        dpiaRequired ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {dpiaRequired
                        ? "A DPIA must be carried out"
                        : "A DPIA is not required"}
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${
                      dpiaRequired ? "text-red-300" : "text-green-300"
                    }`}
                  >
                    {yesCount} of 9 EDPB criteria were met. The threshold for
                    requiring a DPIA is {PRE_DPIA_THRESHOLD} or more criteria.
                  </p>
                </div>

                {/* Summary table */}
                <div className="rounded-xl border border-white/10 overflow-hidden mb-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-vastintDark border-b border-white/10">
                        <th className="px-4 py-3 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider w-8">
                          #
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">
                          Criterion
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider w-20 text-center">
                          Answer
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {PRE_DPIA_CRITERIA.map((c) => (
                        <tr key={c.id} className="hover:bg-white/5">
                          <td className="px-4 py-3 text-sm font-medium text-white/40">
                            {c.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-white/70">
                            {c.title}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {answers[c.id] === true ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-900/30 px-2 py-0.5 rounded-full">
                                <CheckCircle2 size={12} /> Yes
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">
                                <XCircle size={12} /> No
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Info block */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/50 mb-6">
                  <p className="font-semibold text-white/70 mb-1">
                    About this assessment
                  </p>
                  <p>
                    This pre-DPIA screening is based on the 9 criteria published
                    by the European Data Protection Board (EDPB) in their
                    Guidelines on Data Protection Impact Assessments (WP 248
                    rev.01). If the processing meets 2 or more of these criteria,
                    a full DPIA should generally be carried out.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={exportPdf}
                    disabled={pdfBusy}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Download size={18} />
                    {pdfBusy ? "Generating..." : "Download PDF"}
                  </button>

                  <button
                    onClick={sendReport}
                    disabled={pdfBusy || sent}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-vastintPrimary text-white text-sm font-semibold hover:bg-vastintPrimary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-1"
                  >
                    <Send size={18} />
                    {sent
                      ? "Report sent \u2014 check your email client"
                      : pdfBusy
                      ? "Preparing..."
                      : "Send Report to privacy@vastint.com"}
                  </button>
                </div>

                {sent && (
                  <p className="mt-3 text-xs text-white/40 bg-white/5 rounded-lg p-3 border border-white/10">
                    The PDF report has been downloaded. Your email client should
                    have opened with a pre-filled email to{" "}
                    <strong className="text-white/60">
                      privacy@vastint.com
                    </strong>
                    . Please attach the downloaded PDF before sending.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Placeholder when not all answered */
            <div className="rounded-2xl border-2 border-dashed border-white/10 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <FileText size={20} className="text-white/30" />
              </div>
              <h3 className="text-sm font-semibold text-white/40 mb-1">
                Assessment Result
              </h3>
              <p className="text-xs text-white/30">
                Answer all 9 criteria above to see the result. {answeredCount} of{" "}
                {PRE_DPIA_CRITERIA.length} completed.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
