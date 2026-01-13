let tokens = null;

module.exports = {
    saveTokens: (newTokens) => {
        tokens = newTokens;
    },
    getTokens: () => tokens,
};
