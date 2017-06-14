import path from 'path';
import webpack from 'webpack';

export default {
    devtool: 'eval-source-map',
    entry : [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname,'/client/index.js')
    ],
    output: {
      path: __dirname,
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname,'client'),
                    path.join(__dirname,'server/shared')
                ],
                loaders: ['babel-loader'],
            }
        ]
    },
    plugins:[
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js']
    }
}