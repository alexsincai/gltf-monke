module.exports = {
    plugins: [
        require("postcss-nested"),
        require("autoprefixer"),
        require("postcss-preset-env")({
            stage: 1,
        }),
        require("postcss-import"),
        require("postcss-assets")({
            loadPaths: ["dist/img"],
        }),
        require("cssnano")({
            preset: "default",
        }),
    ],
};
