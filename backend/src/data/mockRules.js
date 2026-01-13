module.exports = [
    {
        condition: (file) => file.name.toLowerCase().includes("invoice"),
        suggestion: "Move to /Finance/Invoices",
    },
    {
        condition: (file) => file.mimeType.includes("image"),
        suggestion: "Move to /Media/Images",
    },
];
