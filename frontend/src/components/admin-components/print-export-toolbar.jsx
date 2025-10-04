import { jsPDF } from "jspdf";

import domtoimage from "dom-to-image-more";
import { Printer, FileText } from "lucide-react";

function PrintExportToolbar({ targetRef }) {
  const printPage = () => {
    if (!targetRef.current) return;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Reports</title></head><body>${targetRef.current.innerHTML}</body></html>`
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const exportPDF = async () => {
    if (!targetRef.current) return;

    // Temporarily remove outlines and box-shadows
    const elements = targetRef.current.querySelectorAll("*");
    const oldStyles = [];
    elements.forEach((el) => {
      oldStyles.push({
        el,
        outline: el.style.outline,
        boxShadow: el.style.boxShadow,
      });
      el.style.outline = "none";
      el.style.boxShadow = "none";
    });

    // Capture image
    const dataUrl = await domtoimage.toPng(targetRef.current);

    // Restore styles
    oldStyles.forEach(({ el, outline, boxShadow }) => {
      el.style.outline = outline;
      el.style.boxShadow = boxShadow;
    });

    // Generate PDF
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (targetRef.current.offsetHeight * pdfWidth) /
      targetRef.current.offsetWidth;
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("analytics.pdf");
  };

  return (
    <div className="flex flex-col md:flex-row justify-start items-center gap-4 p-4 bg-white rounded-xl shadow-md">
      <button
        onClick={printPage}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:scale-105 transform transition-all duration-200 hover:shadow-lg"
      >
        <Printer size={18} /> Print
      </button>
      <button
        onClick={exportPDF}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow hover:scale-105 transform transition-all duration-200 hover:shadow-lg"
      >
        <FileText size={18} /> Export PDF
      </button>
    </div>
  );
}

export default PrintExportToolbar;
