// utils/exportUtils.js
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Función para exportar a CSV
export const downloadCSV = (data, filename) => {
  // Preparamos los datos para el formato CSV
  let csvContent = "data:text/csv;charset=utf-8,";

  // Agregar estadísticas generales
  csvContent += "Estadísticas Generales\n";
  Object.entries(data.stats).forEach(([key, value]) => {
    csvContent += `${key},${value}\n`;
  });

  csvContent += "\nDatos de Docentes\n";
  csvContent += "Categoría,Valor\n";
  data.professorData.forEach((item) => {
    csvContent += `${item.name},${item.value}\n`;
  });

  csvContent += "\nProducción Académica\n";
  csvContent += "Categoría,Valor\n";
  data.productionData.forEach((item) => {
    csvContent += `${item.name},${item.value}\n`;
  });

  csvContent += "\nEgresados por Año\n";
  csvContent += "Año,Cantidad\n";
  data.graduatesPerYearData.forEach((item) => {
    csvContent += `${item.year},${item.value}\n`;
  });

  // Crear el enlace de descarga y simulamos un clic
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Función para exportar a Excel
export const downloadExcel = (data, filename) => {
  // Crear un libro nuevo
  const workbook = XLSX.utils.book_new();

  // Datos para la hoja de estadísticas generales
  const statsData = Object.entries(data.stats).map(([key, value]) => [
    key,
    value,
  ]);
  const statsSheet = XLSX.utils.aoa_to_sheet([
    ["Indicador", "Valor"],
    ...statsData,
  ]);

  // Datos para la hoja de docentes
  const professorHeaders = ["Categoría", "Valor"];
  const professorRows = data.professorData.map((item) => [
    item.name,
    item.value,
  ]);
  const professorSheet = XLSX.utils.aoa_to_sheet([
    professorHeaders,
    ...professorRows,
  ]);

  // Datos para la hoja de producción académica
  const productionHeaders = ["Categoría", "Valor"];
  const productionRows = data.productionData.map((item) => [
    item.name,
    item.value,
  ]);
  const productionSheet = XLSX.utils.aoa_to_sheet([
    productionHeaders,
    ...productionRows,
  ]);

  // Datos para la hoja de egresados por año
  const graduatesHeaders = ["Año", "Cantidad"];
  const graduatesRows = data.graduatesPerYearData.map((item) => [
    item.year,
    item.value,
  ]);
  const graduatesSheet = XLSX.utils.aoa_to_sheet([
    graduatesHeaders,
    ...graduatesRows,
  ]);

  // Añadir hojas al libro
  XLSX.utils.book_append_sheet(workbook, statsSheet, "Estadísticas Generales");
  XLSX.utils.book_append_sheet(workbook, professorSheet, "Docentes");
  XLSX.utils.book_append_sheet(
    workbook,
    productionSheet,
    "Producción Académica"
  );
  XLSX.utils.book_append_sheet(workbook, graduatesSheet, "Egresados por Año");

  // Exportar a Excel
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

// Función para exportar a PDF
export const downloadPDF = (data, filename) => {
  const doc = new jsPDF();

  // Título del documento
  doc.setFontSize(16);
  doc.text("Estadísticas del Programa de Ingeniería de Sistemas", 14, 20);
  doc.setFontSize(12);
  doc.text("Universidad Popular del Cesar", 14, 30);

  // Estadísticas generales
  doc.setFontSize(14);
  doc.text("Estadísticas Generales", 14, 45);
  const statsData = Object.entries(data.stats).map(([key, value]) => {
    let label = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return [label, value];
  });

  doc.autoTable({
    startY: 50,
    head: [["Indicador", "Valor"]],
    body: statsData,
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Datos de docentes
  let currentY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(14);
  doc.text("Nivel Académico de Docentes", 14, currentY);

  const professorRows = data.professorData.map((item) => [
    item.name,
    item.value,
  ]);
  doc.autoTable({
    startY: currentY + 5,
    head: [["Categoría", "Cantidad"]],
    body: professorRows,
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Nueva página para la producción académica
  doc.addPage();

  // Producción académica
  doc.setFontSize(14);
  doc.text("Producción Académica", 14, 20);

  const productionRows = data.productionData.map((item) => [
    item.name,
    item.value,
  ]);
  doc.autoTable({
    startY: 25,
    head: [["Categoría", "Cantidad"]],
    body: productionRows,
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Egresados por año
  currentY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(14);
  doc.text("Egresados por Año", 14, currentY);

  const graduatesRows = data.graduatesPerYearData.map((item) => [
    item.year,
    item.value,
  ]);
  doc.autoTable({
    startY: currentY + 5,
    head: [["Año", "Cantidad"]],
    body: graduatesRows,
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Agregar fecha de generación
  const today = new Date();
  const dateStr = today.toLocaleDateString();
  doc.setFontSize(10);
  doc.text(
    `Documento generado el ${dateStr}`,
    14,
    doc.internal.pageSize.height - 10
  );

  // Guardar archivo
  doc.save(`${filename}.pdf`);
};
