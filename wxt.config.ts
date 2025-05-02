import { defineConfig, UserManifest } from 'wxt';
import svgr from 'vite-plugin-svgr';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifestVersion: 3,
  alias: {
    '@options': './entrypoints/options'
  },
  manifest: env => {
    const manifest: UserManifest = {
      // languages https://developer.chrome.com/docs/extensions/reference/api/i18n?hl=zh-cn#locales
      name: '__MSG_appName__',
      description: '__MSG_description__',
      default_locale: 'en',
      permissions: ['activeTab', 'storage'],
      web_accessible_resources: [],
      action: {
        default_icon: {
          '16': 'icon/16.png',
          '32': 'icon/32.png',
          '48': 'icon/48.png',
          '96': 'icon/96.png',
          '128': 'icon/128.png'
        }
      },
      host_permissions: ['https://*/*', 'http://*/*']
    };
    return manifest;
  },
  vite: () => ({
    plugins: [svgr()]
  })
});
