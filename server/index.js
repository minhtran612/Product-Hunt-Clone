import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';


import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';


import users from './routes/users';
import auth from './routes/auth';
import product from './routes/product';
import bookshelf from './bookshelf';

const compiler = webpack(webpackConfig);

let app = express();

app.use('/', express.static('./public'));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use(webpackMiddleware(compiler,{
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

bookshelf.plugin('pagination')
app.get('/*', (req, res, next ) => {
    res.sendFile(path.join(__dirname,'./index.html'));
});

app.listen(3000, () => console.log('Running in local host:3000'));