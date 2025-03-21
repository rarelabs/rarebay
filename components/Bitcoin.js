import { useContext } from 'react';
import { OkxProvider, OkxContext } from '../lib/bitcoin';
export default function Home() {
  const { account, connectWallet, disconnectWallet, session, provider } = useContext(OkxContext);
 
  return (
    <div style={{ padding: '2rem' }}>
      {!provider ? (
        <>
        <button className='button' onClick={connectWallet}>Connect</button>
        <hr />
        </>
      ) : (
        <div>
            <h5>Connected⚡</h5>
            <hr />
            <p style={{fontSize: '16px', width: '200px', overflow: 'scroll', textShadow: 'none', color: 'orange'}}>{account?.toString()}</p>
            <hr />
            <p style={{fontSize: '10px'}}> Chain: btc:mainnet</p>
            <br />
          <button className='button' onClick={disconnectWallet}>Disconnect</button>
        
        </div>
      )}
    </div>
  );
}
