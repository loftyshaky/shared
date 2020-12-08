class Terser {
    config = {
        output: {
            comments(node, comment) {
                const text = comment.value;
                const { type } = comment;
                if (type === 'comment2') {
                    return /@preserve|@license|@cc_on/i.test(text);
                }

                return undefined;
            },
        },
        mangle: false,
    }
}

module.exports = { Terser };
