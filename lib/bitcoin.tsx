import React, { createContext, useState, useEffect, useCallback } from 'react';
import { OKXUniversalConnectUI, THEME } from '@okxconnect/ui';
import { OKXBtcProvider } from '@okxconnect/universal-provider';

export interface OkxContextType {
  account: string | null;
  balance: string | null;
  publicKey: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  provider: OKXBtcProvider | null;
  session: any;
  error: string | null;
}

export const OkxContext = createContext<OkxContextType>({
  account: null,
  balance: null,
  publicKey: null,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  provider: null,
  session: null,
  error: null,
});

export const OkxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [okxUniversalConnectUI, setOkxUniversalConnectUI] = useState<OKXUniversalConnectUI | null>(null);
  const [session, setSession] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [provider, setProvider] = useState<OKXBtcProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initConnectUI = async () => {
      try {
        const ui = await OKXUniversalConnectUI.init({
          dappMetaData: {
            name: 'RareBay',
            icon: '/',
          },
          actionsConfiguration: {
            returnStrategy: 'tg://resolve',
            modals: 'all',
          },
          language: 'en_US',
          uiPreferences: {
            theme: THEME.LIGHT,
          },
        });

        setOkxUniversalConnectUI(ui);
      } catch (err) {
        console.error('Failed to initialize OKX Connect UI:', err);
        setError('Failed to initialize wallet connection.');
      }
    };

    initConnectUI();
  }, []);

  const connectWallet = useCallback(async () => {
    if (!okxUniversalConnectUI) {
      setError('OKX Connect UI not initialized');
      return;
    }
    try {
      // Define the parameters for connection with the correct namespace
      const connectParams = {
        namespaces: { btc: { chains: ['btc:mainnet'], methods: ['personal_getAddress'] } },
        sessionConfig: { redirect: 'tg://resolve' },
      };

      // Use openModalAndSign for connection
      const result = await okxUniversalConnectUI.openModalAndSign(connectParams, []);

      // Assuming the result includes a session

      // Initialize the OKXBtcProvider with the UI object
      const btcProvider = new OKXBtcProvider(okxUniversalConnectUI);
      setProvider(btcProvider);

      const chainId = 'btc:mainnet';
      const accountInfo = await btcProvider.getAccount(chainId);

      if (accountInfo) {
        setAccount(accountInfo.address);

      } else {
        throw new Error('No account found');
      }
    } catch (err) {
      console.error('Connection error:', err);
      setError('Failed to connect wallet or fetch account details.');
    }
  }, [okxUniversalConnectUI]);

  const disconnectWallet = useCallback(async () => {
    if (!okxUniversalConnectUI) return;
    try {
      await okxUniversalConnectUI.disconnect();
      setSession(null);
      setProvider(null);
      setAccount(null);
      setBalance(null);
      setPublicKey(null);
    } catch (err) {
      console.error('Disconnection error:', err);
      setError('Failed to disconnect wallet.');
    }
  }, [okxUniversalConnectUI]);

  return (
    <OkxContext.Provider
      value={{ 
        account, 
        balance, 
        publicKey, 
        connectWallet, 
        disconnectWallet, 
        provider, 
        session, 
        error 
      }}
    >
      {children}
    </OkxContext.Provider>
  );
};