const rules = require("../data/mockRules");

exports.runRules = (files) => {
    return files.map((file) => {
        const matchedRule = rules.find((r) => r.condition(file));
        return {
            file: file.name,
            suggestion: matchedRule ? matchedRule.suggestion : "No action",
        };
    });
};
