
export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        dll: false,
        hardSource: false,
        locale: {
          default: 'zh-CN',
        },
        routes: {
          exclude: [/components/],
        },
      },
    ],
  ],
  hash: true,
  theme: {
    'font-size-base': '13px',
    'primary-color': '#2F54EB',
  },
  chainWebpack(config, {webpack}) {
  }
};
