export default {
  common: {
    title: 'Switchy Nemo',
    close: '閉じる',
    create: '作成',
    delete: '削除'
  },
  layouts: {
    sidebar: {
      settings: '設定',
      profiles: 'プロファイル'
    }
  },
  views: {
    general: {
      title: '一般',
      profiles: 'プロファイル',
      profilesDesc:
        'プロファイルは異なるプロキシサーバーを管理するために使用されます。プロファイルを並べ替えたり、無効にしたりできます。',
      languages: '言語'
    },
    transfer: {
      title: 'インポート/エクスポート',
      settings: '設定',
      backup: 'バックアップ設定',
      backupDesc:
        'オプションの完全バックアップを作成します（プロファイルやその他のすべてのオプションを含む）。',
      restore: '復元設定',
      restoreDesc: 'ローカルファイルからSwitchy Nemoのオプションを復元します。'
    },
    profile: {
      title: 'プロファイル {{name}}',
      new: '新しいプロファイル',
      name: 'プロファイル名'
    }
  },
  validation: {
    required: '{{field}}は必須です。'
  }
};
