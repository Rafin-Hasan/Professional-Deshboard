export const exportToCSV = (data, filename) => {
  if (!data || !data.length) {
    alert("No data to export!");
    return;
  }

  // 1. Get Headers from the first object
  const headers = Object.keys(data[0]);
  
  // 2. Convert data to CSV format
  const csvContent = [
    headers.join(","), // Header row
    ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName])).join(",")) // Data rows
  ].join("\n");

  // 3. Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};