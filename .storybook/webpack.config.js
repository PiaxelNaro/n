const path = require('path');

module.exports = storybookBaseConfig => {
    storybookBaseConfig.devtool = 'eval';

    storybookBaseConfig.module.loaders.push({
        test: /\.css$/,
        loader: 'style!css',
    });
    storybookBaseConfig.module.loaders.push({
        test: /\.(ttf|svg|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
    });
    storybookBaseConfig.module.loaders.push({
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
    });
    storybookBaseConfig.module.loaders.push({
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
    });

    return storybookBaseConfig;
};
