const rules = [
    {
        condition: (file) => file.name && file.name.toLowerCase().includes("invoice"),
        suggestion: "Move to /Finance/Invoices",
    },
    {
        condition: (file) => file.mimeType && file.mimeType.includes("image"),
        suggestion: "Move to /Media/Images",
    },
];

export default rules;
