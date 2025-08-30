export default {
  common: {
    title: 'Switchy Nemo',
    close: 'Close',
    create: 'Create',
    delete: 'Delete'
  },
  layouts: {
    sidebar: {
      settings: 'Settings',
      profiles: 'Profiles'
    }
  },
  views: {
    general: {
      title: 'General',
      profiles: 'Profiles',
      profilesDesc:
        'Profiles are used to manage different proxy servers. You can sort and disable profiles.',
      languages: 'Languages'
    },
    transfer: {
      title: 'Import/Export',
      settings: 'Settings',
      backup: 'Backup Settings',
      backupDesc:
        'Make a full backup of your options (including profiles and all other options).',
      restore: 'Restore Settings',
      restoreDesc: 'Restore your Switchy Nemo options from a local file.'
    },
    profile: {
      title: 'Profile {{name}}',
      new: 'New Profile',
      name: 'Profile name'
    }
  },
  validation: {
    required: '{{field}} is required.'
  }
};
