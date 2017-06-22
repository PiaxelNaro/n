const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    webpack: config => {
        config.module.rules.push(
            {
                test: /\.(css|scss)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: ['babel-loader', 'raw-loader', 'postcss-loader'],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'babel-loader',
                    'raw-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['styles', 'node_modules']
                                .map(d => path.join(__dirname, d))
                                .map(g => glob.sync(g))
                                .reduce((a, c) => a.concat(c), []),
                        },
                    },
                ],
            }
        );

        // Do not try to bundle test files in the pages directory.
        config.plugins.push(new webpack.IgnorePlugin(/pages.*\/test.*/));

        // Setup bundle analyzer plugin. See result with `yarn run analyze-bundle`
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
                generateStatsFile: true,
                // Will be available at `.next/stats.json`
                statsFilename: 'stats.json',
            })
        );

        return config;
    },
};
