export function extractDesign(prompt) {
  const lower = prompt.toLowerCase();
  const theme = {
    primaryColor: "#f9fafb",            
    secondaryColor: "#e5e7eb",        
    font: "Poppins",
    buttonStyle: "rounded-md px-4 py-2 bg-blue-600 text-white",
    textColor: "text-black",          
  };

  if (lower.includes("dark")) {
    theme.primaryColor = "#111827";   
    theme.secondaryColor = "#374151"; 
    theme.buttonStyle = "rounded-md px-4 py-2 bg-white text-black";
    theme.textColor = "text-white";    
  }

  if (lower.includes("tech")) theme.font = "Inter";
  if (lower.includes("finance")) theme.font = "Roboto";
  if (lower.includes("fun") || lower.includes("kids")) theme.font = "Comic Sans MS";

  return theme;
}
