import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, FileText, X, Download, AlertTriangle, ShieldCheck } from "lucide-react";
import {
  PRE_DPIA_CRITERIA,
  PRE_DPIA_THRESHOLD,
  PRE_DPIA_FORM_FIELDS,
} from "../../data/preDpiaData";
import { APP_LOGO_URL } from "../DataBreach/branding";

const mockDPIAs = [
  { id: 1, title: "Tenant Portal Implementation", status: "In Progress", date: "2026-04-10" },
  { id: 2, title: "Property Management Cloud Migration", status: "Completed", date: "2026-03-15" },
  { id: 3, title: "Lease Management System Update", status: "Pending Review", date: "2026-04-01" },
];

export default function DPIAView() {
  const { searchQuery } = useOutletContext();
  const [showChecklist, setShowChecklist] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
  const [pdfBusy, setPdfBusy] = useState(false);

  const yesCount = useMemo(
    () => Object.values(answers).filter((a) => a === true).length,
    [answers]
  );
  const dpiaRequired = yesCount >= PRE_DPIA_THRESHOLD;
  const allAnswered = Object.values(answers).every((a) => a !== null);
  const totalSteps = PRE_DPIA_CRITERIA.length + 2;

  const openChecklist = () => {
    setShowChecklist(true);
    setCurrentStep(0);
    setForm({ projectName: "", assessor: "", department: "", date: new Date().toISOString().slice(0, 10) });
    setAnswers(Object.fromEntries(PRE_DPIA_CRITERIA.map((c) => [c.id, null])));
    setJustifications(Object.fromEntries(PRE_DPIA_CRITERIA.map((c) => [c.id, ""])));
  };

  const closeChecklist = () => setShowChecklist(false);

  const goNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep((s) => s + 1);
  };
  const goPrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const exportPdf = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);

    try {
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
        logoImage = { dataUrl: canvas.toDataURL("image/png"), width: img.width, height: img.height };
      } catch (_) {}

      const drawFooter = (pageNum, totalPages) => {
        pdf.setDrawColor(...orange);
        pdf.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(...gray);
        pdf.text("Pre-DPIA Checklist Report", margin, pageHeight - 10);
        pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: "right" });
      };

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(...orange);
      pdf.text("PRE-DPIA CHECKLIST", margin, 14);

      if (logoImage) {
        try {
          const maxW = 50, maxH = 10;
          const scale = Math.min(maxW / logoImage.width, maxH / logoImage.height);
          pdf.addImage(logoImage.dataUrl, "PNG", pageWidth - margin - logoImage.width * scale, 8, logoImage.width * scale, logoImage.height * scale);
        } catch (_) {}
      }

      pdf.setFontSize(22);
      pdf.setTextColor(...navy);
      pdf.text("Pre-DPIA Assessment Report", margin, 26);

      pdf.setDrawColor(...orange);
      pdf.line(margin, 30, pageWidth - margin, 30);

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
        const justText = justifications[criterion.id] || "—";
        const justLines = pdf.splitTextToSize(justText, 38);
        pdf.text(justLines[0], margin + 140, tableY + 8);

        tableY += rowH;
      });

      drawFooter(1, 1);

      const filename = (form.projectName || "pre-dpia-checklist")
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-|-$/g, "");
      pdf.save(`${filename}-pre-dpia.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      window.alert(`PDF generation failed: ${error?.message || "unknown error"}`);
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <div className="w-full h-full pb-10 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-sans font-bold text-white">
            Data Protection Impact Assessments (DPIAs)
          </h1>
          <p className="text-vastintBeige/60 mt-2">
            Manage and review your organization's DPIAs.
          </p>
        </div>
        <button
          onClick={openChecklist}
          className="bg-vastintPrimary text-white px-4 py-2 rounded-lg hover:bg-vastintPrimary/90 transition-colors font-medium text-sm"
        >
          New DPIA
        </button>
      </div>

      <div className="bg-vastintSurface rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockDPIAs.filter((dpia) => {
              const q = searchQuery.toLowerCase();
              return !q || dpia.title.toLowerCase().includes(q) || dpia.status.toLowerCase().includes(q);
            }).map((dpia) => (
              <tr key={dpia.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{dpia.title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${dpia.status === "Completed" ? "bg-green-900/30 text-green-400" :
                      dpia.status === "In Progress" ? "bg-blue-900/30 text-blue-400" : "bg-yellow-900/30 text-yellow-400"}`}>
                    {dpia.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-white/50">{dpia.date}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button className="text-vastintPrimary hover:text-vastintCream transition-colors">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showChecklist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-vastintSurface rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-vastintDark px-6 py-4 flex items-center justify-between shrink-0 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-vastintPrimary" />
                <div>
                  <h3 className="font-sans font-bold text-lg text-white">Pre-DPIA Checklist</h3>
                  <p className="text-white/40 text-xs">EDPB 9-criteria assessment</p>
                </div>
              </div>
              <button onClick={closeChecklist} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="h-1 bg-white/5 shrink-0">
              <div
                className="h-full bg-vastintPrimary transition-all duration-300"
                style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {currentStep === 0 && (
                <div>
                  <p className="text-xs font-semibold text-vastintPrimary uppercase tracking-wider mb-1">Step 1 of {totalSteps}</p>
                  <h4 className="text-xl font-bold text-white mb-1">Project Information</h4>
                  <p className="text-sm text-white/50 mb-6">
                    Provide context about the processing activity you are assessing.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {PRE_DPIA_FORM_FIELDS.map((field) => (
                      <label key={field.key} className="block">
                        <span className="mb-1.5 block text-sm font-semibold text-white/60">
                          {field.label}
                        </span>
                        <input
                          type={field.type}
                          value={form[field.key]}
                          onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="w-full rounded-lg border border-white/10 bg-vastintDark px-4 py-2.5 text-sm text-white outline-none transition focus:border-vastintPrimary focus:ring-2 focus:ring-vastintPrimary/20 placeholder:text-white/20"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStep >= 1 && currentStep <= PRE_DPIA_CRITERIA.length && (() => {
                const criterion = PRE_DPIA_CRITERIA[currentStep - 1];
                const answer = answers[criterion.id];
                return (
                  <div>
                    <p className="text-xs font-semibold text-vastintPrimary uppercase tracking-wider mb-1">
                      Step {currentStep + 1} of {totalSteps} — Criterion {criterion.id} of 9
                    </p>
                    <h4 className="text-xl font-bold text-white mb-1">
                      {criterion.title}
                    </h4>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      {criterion.description}
                    </p>

                    <div className="rounded-lg border border-amber-700/30 bg-amber-900/20 p-4 mb-6">
                      <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Example</p>
                      <p className="text-sm text-amber-300">{criterion.example}</p>
                    </div>

                    <p className="text-sm font-semibold text-white/60 mb-3">
                      Does this criterion apply to your processing activity?
                    </p>
                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setAnswers((a) => ({ ...a, [criterion.id]: true }))}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-semibold text-sm transition-all ${
                          answer === true
                            ? "border-red-500 bg-red-900/20 text-red-400"
                            : "border-white/10 bg-vastintDark text-white/50 hover:border-white/20"
                        }`}
                      >
                        <CheckCircle2 size={18} />
                        Yes
                      </button>
                      <button
                        onClick={() => setAnswers((a) => ({ ...a, [criterion.id]: false }))}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-semibold text-sm transition-all ${
                          answer === false
                            ? "border-green-500 bg-green-900/20 text-green-400"
                            : "border-white/10 bg-vastintDark text-white/50 hover:border-white/20"
                        }`}
                      >
                        <XCircle size={18} />
                        No
                      </button>
                    </div>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-white/60">
                        Justification (optional)
                      </span>
                      <textarea
                        rows={3}
                        value={justifications[criterion.id]}
                        onChange={(e) => setJustifications((j) => ({ ...j, [criterion.id]: e.target.value }))}
                        placeholder="Explain why this criterion does or does not apply..."
                        className="w-full rounded-lg border border-white/10 bg-vastintDark px-4 py-2.5 text-sm text-white outline-none transition focus:border-vastintPrimary focus:ring-2 focus:ring-vastintPrimary/20 placeholder:text-white/20"
                      />
                    </label>
                  </div>
                );
              })()}

              {currentStep === totalSteps - 1 && (
                <div>
                  <p className="text-xs font-semibold text-vastintPrimary uppercase tracking-wider mb-1">
                    Assessment Complete
                  </p>
                  <h4 className="text-xl font-bold text-white mb-4">
                    Pre-DPIA Result
                  </h4>

                  <div
                    className={`rounded-xl p-6 mb-6 ${
                      dpiaRequired
                        ? "bg-red-900/20 border-2 border-red-700/40"
                        : "bg-green-900/20 border-2 border-green-700/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {dpiaRequired ? (
                        <AlertTriangle size={24} className="text-red-400" />
                      ) : (
                        <ShieldCheck size={24} className="text-green-400" />
                      )}
                      <h5
                        className={`text-lg font-bold ${
                          dpiaRequired ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {dpiaRequired
                          ? "A DPIA must be carried out"
                          : "A DPIA is not required"}
                      </h5>
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

                  <div className="rounded-xl border border-white/10 overflow-hidden mb-6">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-vastintDark border-b border-white/10">
                          <th className="px-4 py-3 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider w-8">#</th>
                          <th className="px-4 py-3 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider">Criterion</th>
                          <th className="px-4 py-3 text-xs font-semibold text-vastintBeige/50 uppercase tracking-wider w-20 text-center">Answer</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {PRE_DPIA_CRITERIA.map((c) => (
                          <tr key={c.id} className="hover:bg-white/5">
                            <td className="px-4 py-3 text-sm font-medium text-white/40">{c.id}</td>
                            <td className="px-4 py-3 text-sm text-white/70">{c.title}</td>
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

                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/50">
                    <p className="font-semibold text-white/70 mb-1">About this assessment</p>
                    <p>
                      This pre-DPIA screening is based on the 9 criteria published by the
                      European Data Protection Board (EDPB) in their Guidelines on Data
                      Protection Impact Assessments (WP 248 rev.01). If the processing
                      meets 2 or more of these criteria, a full DPIA should generally be
                      carried out.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-vastintDark border-t border-white/10 flex items-center justify-between shrink-0">
              <button
                onClick={goPrev}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 text-sm font-medium text-white/60 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft size={16} />
                Previous
              </button>

              <span className="text-xs text-white/40">
                {currentStep + 1} / {totalSteps}
              </span>

              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={goNext}
                  disabled={currentStep >= 1 && currentStep <= PRE_DPIA_CRITERIA.length && answers[PRE_DPIA_CRITERIA[currentStep - 1]?.id] === null}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-vastintPrimary text-white text-sm font-medium hover:bg-vastintPrimary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={exportPdf}
                  disabled={pdfBusy || !allAnswered}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-vastintSecondary text-white text-sm font-medium hover:bg-vastintSecondary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-white/10"
                >
                  <Download size={16} />
                  {pdfBusy ? "Generating..." : "Export PDF Report"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
