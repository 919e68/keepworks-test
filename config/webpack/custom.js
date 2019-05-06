const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)?(\.erb)?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: 'tmp/cache/webpacker/babel-loader',
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: {
                      browsers: '> 1%',
                    },
                    useBuiltIns: true,
                  },
                ],
                'react',
              ],
              plugins: [
                'syntax-dynamic-import',
                'transform-object-rest-spread',
                [
                  'transform-class-properties',
                  {
                    spec: true,
                  },
                ],
                [
                  'module-resolver',
                  {
                    alias: {
                      "shared": "./app/javascript/components/shared",
                      "screens": "./app/javascript/components/screens",
                      "styles": "./app/javascript/styles",
                      "graphql": "./app/javascript/graphql"
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/i,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
    ]
  }
}

