import { Profile, ProxyMode } from '@options/stores/modules/profiles';
export const MessageType = {
  SaveProfile: 'saveProfile',
  SetProxy: 'setProxy'
} as const;
export type MessageType = (typeof MessageType)[keyof typeof MessageType];

type Message = {
  type: MessageType;
  profiles?: Profile[];
  currentMode?: ProxyMode;
  selectedProfile?: Profile | null;
};

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(
    (message: Message, sender, sendResponse) => {
      console.log('Received message:', message);
      switch (message.type) {
        case MessageType.SaveProfile: {
          const { profiles, currentMode, selectedProfile } = message;
          browser.storage.local
            .set({
              profiles: profiles || [],
              currentMode: currentMode || 'direct',
              selectedProfile: selectedProfile || null
            })
            .then(() => {
              sendResponse({ success: true });
            });
          // Indicates that the response will be sent asynchronously
          return true;
        }
        case MessageType.SetProxy: {
          const { currentMode, selectedProfile } = message;

          const config = {
            mode: currentMode || 'direct',
            rules: {
              singleProxy: {
                scheme: 'http',
                host: '',
                port: 80
              },
              bypassList: [] as string[]
            }
          };

          if (selectedProfile) {
            config.rules.singleProxy = {
              scheme: selectedProfile.scheme || 'http',
              host: selectedProfile.host,
              port: selectedProfile.port || 80
            };
            config.rules.bypassList = selectedProfile.bypassList || [];
          }

          browser.proxy.settings
            .set({
              value: config
            })
            .then(() => {
              sendResponse({ success: true });
            })
            .catch(error => {
              console.error('Error setting proxy:', error);
              sendResponse({ success: false, error: error.message });
            });
          break;
        }
      }
    }
  );
});
