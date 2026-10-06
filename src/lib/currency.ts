/**
 * Formats numbers into Indian Numbering System (Lakhs & Crores)
 */
export function formatINR(val: number): string {
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  } else if (val >= 100000) {
    const lakh = val / 100000;
    return `₹${lakh.toFixed(2)} L`;
  }
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val)}`;
}

export function formatINRFull(val: number): string {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val)}`;
}
