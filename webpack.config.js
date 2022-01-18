import path from 'path';

const __outDir = path.resolve();
console.log(__outDir);

const module={
    entry: {
        index: "./src/public/js/index",
        dashboard: "./src/public/js/dashboard"
        //dummy: "./src/public/js/dummy"
    },
    mode: "development",
    module: {
        rules: [{
            use: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__outDir, 'dist/public/js')
    }
}

export default module;