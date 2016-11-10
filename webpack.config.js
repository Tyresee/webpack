/* node webpack.config.js或者wepack webpack.config.js.当然下面用ES6会报错 */
/* 加载一些模块[[ */
// 加载path,path是node内置模块
const path = require('path')
// 加载glob
const glob = require('glob')
// 加载webpack
const webpack = require('webpack')
// 加载html-webpack-plugin,处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 构建之前先清除
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 加载extract-text-webpack-plugin,处理css
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 更方便地去定义url,webpack --watch
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
// css自动加hack，兼容
const autoprefixer = require('autoprefixer')
// 加载npmlog,命令行中输出且允许颜色
const log = require('npmlog')
log.enableColor()
require('babel-polyfill');
/* 加载一些模块]] */

/* 定义一些常量[[ */
// __dirname返回本文件所在的目录(绝对路径),node内置;path.basename为项目设置根目录
const dirname = path.basename(__dirname)
// path.resolve(a,b)  cd到a目录下,再一直cd到b目录
// 获取入口文件
const entryFile = path.resolve('src', 'js/app.js')
log.info(entryFile)
// process指node进程,返回系统信息,是个对象;process.argv指当前进程的命令行参数数组;process.argv[0]一般是node.exe;process.argv[1]是node运行的命令行参数
// process.env指向当前的环境变量,是个对象,判断是本地开发,还是打包发布
// 判断process.env.NODE_ENV(package.json中设置)
log.info(process.env.NODE_ENV)
const isPrd = process.env.NODE_ENV === 'production'
const dist = isPrd ? 'build' : 'dev'
log.info('file is :', dist);
const filename = isPrd ? `[hash:7]-[name]` : `[name]`
// 最终服务器路径
const publicPath = '//st.haiziwang.com/exp/'
/* 定义一些常量]] */

/* 核心功能[[ */
const htmlSrc = 'src/*.html'
const html = glob.sync(htmlSrc).map((file) => {
    return new HtmlWebpackPlugin({
        title: '',
        filename: path.basename(file),
        template: file,
        inject: true,
        favicon: '',
        minify: false,
        hash: true,
        cache: true,
        showError: true,
        chunks: ['common', 'app'],
        chunksSortMode: 'auto',
        excludeChunks: [],
        xhtml: false
    })
})
// need some plugins
const plugins = [
    new ExtractTextPlugin(`assets/${filename}.css`),
].concat(html)
!isPrd && plugins.push(
    // BannerPlugin是webpack的内置插件,给出口文件头部添加注释信息
    new webpack.BannerPlugin('This file is created by RainJoy'),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 9090,
        notify: true,
        ui: false,
        server: { baseDir: [`${dist}`] }
    }),
    new CleanWebpackPlugin(['dev'], {
        root: __dirname,
        verbose: true,
        dry: false,
        exclude: []
    })
)
isPrd && plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: `assets/[hash:7]-common.js`
    }),
    new CleanWebpackPlugin(['build'], {
        root: __dirname,
        verbose: true,
        dry: false,
        exclude: []
    })
)
module.exports = {
    entry: {
        app: ['babel-polyfill', entryFile]
    },
    output: {
        path: dist,
        publicPath: isPrd ? publicPath : '/',
        filename: `assets/${filename}.js`,
        chunkFilename: 'assets/[id].[chunkhash:7].js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src/js')],
                exclude: [path.resolve(__dirname, 'src/js/lib')],
                loader: 'eslint-loader'
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src')],
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                include: [path.resolve(__dirname, 'src')],
                loader: !isPrd ? `url?name=assets/${filename}.[ext]&limit=10240` : `url?name=assets/${filename}.[ext]&limit=10240!image-webpack?{progressive:true, optimizationLevel: 5, interlaced: false, pngquant:{quality: "65-90", speed: 4}}`

            },
            {
                test: /\.(woff|eot|ttf|svg)/,
                loader: `url?name=assets/${filename}.[ext]&limit=5120`
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    externals: [],
    resolve: {
        extensions: ['', '.js']
    },
    plugins: plugins,
    htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?\}\}\>/]
    },
    postcss: function() {
        return [autoprefixer];
    }
}
/* 核心功能]] */
