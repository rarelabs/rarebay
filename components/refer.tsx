import { useState, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import useCopyToClipboard from './copy';
import { useToast } from '../utils/toast';
import { useRouter } from 'next/router';
import { useWalletBalance } from "thirdweb/react";
import { client } from '../lib/thirdweb-client';
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { useConnectModal } from "thirdweb/react";
import { defineChain } from 'thirdweb';
 
import { truncateAddress } from '../utils/truncateAddress';
import Blockie from '../utils/blockie';

interface LeaderboardEntry {
  userAddress: string;
  points: number;
  referralId: string;
}
const ReferralForm = () => {
  const [referredById, setReferredById] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [referralId, setReferralId] = useState('');
  const [totalInvited, setTotalInvited] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const account = useActiveAccount();
  const userAddress = account?.address;
  const [isCopied, setIsCopied] = useState(false);
  const { addToast } = useToast();
  const { copyToClipboard } = useCopyToClipboard();
  const router = useRouter();
  const { id } = router.query;
  const address = account?.address
  const { data: balance, isLoading, isError } = useWalletBalance({
    chain: defineChain(1116),
    address: address,
    client: client,
  });
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopyClick = () => {
    copyToClipboard(`https://rarebay.network/frens/${referralId}`).then((success) => {
      if (success) {
        addToast('success', 'Referral ID copied');
      } else {
        addToast('error', 'Failed to copy Referral ID.');
      }
    });
  };

  // Fetch user registration status on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (userAddress) {
        try {
          const response = await fetch(`/api/referrals?userAddress=${userAddress}`);
          const data = await response.json();

          if (response.ok) {
            setIsRegistered(true);
            setReferralId(data.referralId);
            setTotalInvited(data.totalInvited || 0);
            setTotalPoints(data.totalPoints || 0);
          } else {
            setIsRegistered(false); // User not registered
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userAddress]);

  // Set referredById if the page is accessed with a referral link
  useEffect(() => {
    if (id) {
      setReferredById(id as string);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!userAddress) {
      setMessage('User address is required');
      return;
    }
  
    if (referredById === userAddress.slice(2, 10)) {
      setMessage('You cannot refer yourself.');
      return;
    }
  
    if (balance && parseFloat(balance?.displayValue) < 0) {
      setMessage('You need at least 0 CORE in your wallet to register as a referrer. No fees are charged, only verifying that a wallet it not a bot or probable scam');
      return;
    }
  
    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAddress, referredById }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message || 'User registered successfully!');
        setIsRegistered(true);
        setReferralId(userAddress.slice(0, 10));
      } else {
        setMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      addToast('error', 'An error occurred during registration.');
      setMessage('An error occurred.');
    }
  };
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/top');
        if (!res.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "guest",
          "passkey",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.bitget.web3"),
    createWallet("com.okex.wallet"),
    createWallet("pro.tokenpocket"),
  ];
  const { connect, isConnecting } = useConnectModal();
 
  async function handleConnect() {
    const wallet = await connect({ client, chain: defineChain(1116), size: 'compact', wallets: wallets, showThirdwebBranding: false, termsOfServiceUrl: "https://rarebay.xyz/terms", title: 'Rare Connect'}); // opens the connect modal
  }
  const sharePage = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'RareBay | Interface',
        text: `Bitcoin powered⚡ DeFi world.
        Swap, Trade, Stake, Play, Earn, Learn...`,
        url,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported');
    }
  };
  return (
   <>
    <div className='ei' style={{ color: 'rgba(200, 200, 200)', padding: '10px',  zIndex: '50' }}>
      <div
        style={{
          backgroundImage: `linear-gradient(
            to right,
            rgba(1, 0, 5, 0.947) 0%,
            rgba(0, 218, 222, 0.469) 100%
          ), url(/rare-900w.png)`,
          width: '100%',
          padding: '20px',
          borderRadius: '10px',
          border: 'solid 1px rgba(60, 60, 60, 0.9)'
        }}
      >
        <h2>RareBay Frens</h2>
        <hr />
        <p style={{ fontStyle: 'italic', opacity: '0.8' }}>
       Web3 is fun with frens, invite more frens and earn points. Points can be redeemed for NFT or random gift rewards in a future update.
       Top 100 referrers will also share:
        </p>
        <br />
        <h2 className='gra' >5,000,000 $RARE PRIZE POOL</h2>
        <hr />
        <p className='msg' style={{ fontStyle: 'italic', fontWeight: 'bolder', fontSize: '10px', color: 'lightgray', lineHeight: '15px', opacity: '0.8' }}>
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="8" />
          </svg> Copy your referral link and share it with invited frens. To prevent bots and scam, invited users need to have a minimum of 0.0001 CORE
        </p>
      </div>
      <hr />
      <h4>Commnunity stats</h4>
      <hr />
      <div
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              width: '100%',
              border: 'rgba(50, 50, 200, 0.9) solid 1px',
              padding: '20px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 100, 0.1)'

            }}
          >
     
            <div>
              <p className='center'>Total Frens <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 19H1V18C1 16.1362 2.27477 14.5701 4 14.126M6 10.8293C4.83481 10.4175 4 9.30621 4 7.99999C4 6.69378 4.83481 5.58254 6 5.1707M21 19H23V18C23 16.1362 21.7252 14.5701 20 14.126M18 5.1707C19.1652 5.58254 20 6.69378 20 7.99999C20 9.30621 19.1652 10.4175 18 10.8293M10 14H14C16.2091 14 18 15.7909 18 18V19H6V18C6 15.7909 7.79086 14 10 14ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" stroke="#c7c7c7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></p>
              <hr />
              <h2>{leaderboard?.length}</h2>
            </div>
            <div >
            <p>Socials</p>
              <hr />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}> 

<div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '0px'}}>
      <a href='https://twitter.com/rarebay'>
      <svg  width="24px" height="24px" viewBox="0 0 24 24">
        <path
          d="m3 21l7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
          fill="none"
          color="currentColor"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      </a>
      <a href='https://discord.com/invite/scdXvAnxMK'>  <svg width="32" height="32" viewBox="0 0 32 32">
        <path
          d="M25.7 7.1Q23 5.9 20 5.3h-.1c-.2.4-.5 1-.7 1.5c-2.2-.3-4.3-.3-6.4 0c-.2-.5-.5-1-.7-1.5H12q-3 .45-5.7 1.8C2.7 12.5 1.7 17.8 2.2 23v.1c2.4 1.8 4.7 2.8 7 3.5h.1c.5-.7 1-1.5 1.4-2.3v-.1c-.8-.3-1.5-.6-2.2-1c-.1 0-.1-.1 0-.1c.1-.1.3-.2.4-.3H9c4.6 2.1 9.5 2.1 14.1 0h.1c.1.1.3.2.4.3c.1 0 0 .1 0 .1c-.7.4-1.4.8-2.2 1c0 0-.1.1 0 .1c.4.8.9 1.6 1.4 2.3h.1c2.3-.7 4.6-1.8 7-3.5V23c.6-6-1-11.2-4.2-15.9M11.4 19.9c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8s-1.1 2.8-2.5 2.8m9.3 0c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8s-1.1 2.8-2.5 2.8"
          fill="currentColor"
        ></path>
      </svg></a>
      <a href='https://t.me/rar3bay'>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M21 5L2 12.5l7 1M21 5l-2.5 15L9 13.5M21 5L9 13.5m0 0V19l3.249-3.277"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
         </a>
         <a onClick={sharePage}>
<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 5.5C23 7.98528 20.9853 10 18.5 10C17.0993 10 15.8481 9.36007 15.0228 8.35663L9.87308 10.9315C9.95603 11.2731 10 11.63 10 11.9971C10 12.3661 9.9556 12.7247 9.87184 13.0678L15.0228 15.6433C15.8482 14.6399 17.0993 14 18.5 14C20.9853 14 23 16.0147 23 18.5C23 20.9853 20.9853 23 18.5 23C16.0147 23 14 20.9853 14 18.5C14 18.1319 14.0442 17.7742 14.1276 17.4318L8.97554 14.8558C8.1502 15.8581 6.89973 16.4971 5.5 16.4971C3.01472 16.4971 1 14.4824 1 11.9971C1 9.51185 3.01472 7.49713 5.5 7.49713C6.90161 7.49713 8.15356 8.13793 8.97886 9.14254L14.1275 6.5682C14.0442 6.2258 14 5.86806 14 5.5C14 3.01472 16.0147 1 18.5 1C20.9853 1 23 3.01472 23 5.5ZM16.0029 5.5C16.0029 6.87913 17.1209 7.99713 18.5 7.99713C19.8791 7.99713 20.9971 6.87913 20.9971 5.5C20.9971 4.12087 19.8791 3.00287 18.5 3.00287C17.1209 3.00287 16.0029 4.12087 16.0029 5.5ZM16.0029 18.5C16.0029 19.8791 17.1209 20.9971 18.5 20.9971C19.8791 20.9971 20.9971 19.8791 20.9971 18.5C20.9971 17.1209 19.8791 16.0029 18.5 16.0029C17.1209 16.0029 16.0029 17.1209 16.0029 18.5ZM5.5 14.4943C4.12087 14.4943 3.00287 13.3763 3.00287 11.9971C3.00287 10.618 4.12087 9.5 5.5 9.5C6.87913 9.5 7.99713 10.618 7.99713 11.9971C7.99713 13.3763 6.87913 14.4943 5.5 14.4943Z" fill="white"></path> </g></svg>
</a>
    </div>
</div>
            </div>
          </div>
      <hr style={{ height: '50px' }} />
      <h4>Your stats</h4>
      <hr />
      {isRegistered ? (
        <div className="center-c">
         
          <div
            style={{
              justifyContent: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '100%',
              border: 'rgba(50, 50, 200, 0.9) solid 1px',
              padding: '20px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 100, 0.1)'
            }}
          >
            <button onClick={handleCopyClick} className="button">
              Copy Referral Link
            </button>
            <a
              href={`https://rarebay.network/frens/${referralId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', color: '#00ccff', fontSize: '11px' }}
            >
              https://rarebay.network/frens/{referralId}
            </a>
            <div>
              <p className='center' style={{width: '200px'}}>Frens invited<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 19H1V18C1 16.1362 2.27477 14.5701 4 14.126M6 10.8293C4.83481 10.4175 4 9.30621 4 7.99999C4 6.69378 4.83481 5.58254 6 5.1707M21 19H23V18C23 16.1362 21.7252 14.5701 20 14.126M18 5.1707C19.1652 5.58254 20 6.69378 20 7.99999C20 9.30621 19.1652 10.4175 18 10.8293M10 14H14C16.2091 14 18 15.7909 18 18V19H6V18C6 15.7909 7.79086 14 10 14ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" stroke="#c7c7c7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></p>
              <hr />
              <h2>{totalInvited}</h2>
            </div>
            <div>
              <p> Total points</p>
              <hr />
              <h2>{totalPoints}</h2>
            </div>
          </div>
          <hr />
        
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Referred By ID (optional):</label>
            <hr />
            <input
              className="input"
              type="text"
              value={referredById}
              onChange={(e) => setReferredById(e.target.value)}
              disabled={!!id} // Disable input if `id` is set from referral link
            />
          </div>
          <hr />
          {address ? <button className="button" type="submit">
            Register
          </button> :
           <button onClick={handleConnect} className="button">
         Connect wallet
          </button>}
        </form>
      )}
      <hr />
      {message && (
        <p className='msg' onClick={() => {setMessage('')}}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="8" />
          </svg>
          {message}
        </p>
      )}
      <hr />
      <h3>Leaderboard</h3>
      <hr />
     <div  style={{background: 'rgba(0, 0, 100, 0.1)', backdropFilter: 'blur(10px)', padding: '10px', maxHeight: '400px', overflow: 'scroll', borderRadius: '19px', border: 'rgba(50, 50, 200, 0.9) solid 1px'}}>
     <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>fren ID</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.userAddress}>
              <td>{index + 1}</td>
              <td><div className='center'><Blockie address={entry.userAddress} />{truncateAddress(entry.userAddress)}</div></td>
              <td style={{cursor: 'pointer', justifyContent: 'center', display: 'flex', gap: '10px', alignItems: 'center'}}><a href={`/frens/${entry.referralId}`}>{entry.referralId}</a><svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 0L9 1L11.2929 3.29289L6.2929 8.29289L7.70711 9.70711L12.7071 4.7071L15 7L16 6V0H10Z" fill="#c2c2c2"></path> <path d="M1 2H6V4H3V13H12V10H14V15H1V2Z" fill="#c2c2c2"></path> </g></svg></td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </div>
    <style jsx>{`
  .gra {
    background: linear-gradient(to right, orange, white, gold, red); /* Gradient colors */
    -webkit-background-clip: text; /* Clip the background to text */
    color: transparent; /* Make text color transparent */
  }
`}</style>
   </>
  );
};

export default ReferralForm;
