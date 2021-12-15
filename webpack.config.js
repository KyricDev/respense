import path from 'path';

const __outDir = path.resolve();
console.log(__outDir);

const module={
    entry: "./src/public/js/index",
    mode: "production",
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
        filename: 'bundle.js',
        path: path.join(__outDir, 'dist/public/js')
    }
}

export default module;