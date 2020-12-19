# Minimial Teamplate For Client Web App Using Webpack


- Create folder structure
    - `mkdir web-app`
    - `cd web-app`
    - `mkdir src`
    - `cd src`
    - `touch index.js`
    - `cd ..` To back to `web-app` root directory
    
- Install npm packages
    - `yarn add webpack webpack-cli -D`
    - `yarn add style-loader css-loader -D`
    - `yarn add html-webpack-plugin -D`
    - `yarn add webpack-dev-server -D`

- Add `webpack.config.js`
```javascript
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
    module.exports = {    
        entry: './src/index.js',    
        output: {
            filename: 'main.bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                }
            ],
        }, 

        plugins: [       
            new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
            new HtmlWebpackPlugin({
                title: "My Playground",
            }),
        ],

        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            open: true,
        },
    }
```

- Modify `package.json`
    - remove `"main": "index.js"`
    - add `script` section as below
        ```JavaScript
        "scripts": {
            "build": "webpack",
            "watch": "webpack --watch",
            "start": "webpack serve"
        }
        ```
- Running the app
    - To build:  `yarn build` or `npm build`
    - To open in browser: `yarn start` or `npm start`