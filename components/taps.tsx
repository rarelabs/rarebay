import { SetStateAction, useContext, useEffect, useState } from 'react';
import styles from './tap.module.css';
import { NextApiResponse, NextApiRequest } from 'next';
import { sql } from '@vercel/postgres';
import Container from './Container/Container';
import { Blobbie, darkTheme, useActiveAccount } from 'thirdweb/react';
import { useToast } from '../utils/toast';
import { truncateAddress } from '../utils/truncateAddress';
import Blockie from '../utils/blockie'
import Link from 'next/link';
import { client } from '../lib/thirdweb-client';
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { useConnectModal } from "thirdweb/react";
import { defineChain, getContract, toUnits } from 'thirdweb';
import { useSendTransaction } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc1155";
import { ethers } from 'ethers';
import {toTokens } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
	getActiveClaimCondition as getActiveClaimCondition1155,
	getNFT,
	isERC1155,
} from "thirdweb/extensions/erc1155";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
import {
	getActiveClaimCondition as getActiveClaimCondition721,
	isERC721,
} from "thirdweb/extensions/erc721";
import { getActiveClaimCondition as getActiveClaimCondition20 } from "thirdweb/extensions/erc20";
import { useReadContract } from "thirdweb/react";
import type { ThirdwebContract } from "thirdweb";
import {
	ClaimButton,
	ConnectButton,
	MediaRenderer,
} from "thirdweb/react";
import { TokenContext } from '../lib/tokenContext';
import { useBackground } from '../lib/context';

let MAX_TAPS = 500; // Define MAX_TAPS within the component
const MAX_TAP = 500;  // Max taps (progress for the auto race)

let TAP_COOLDOWN_HOURS = 0.5;
const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;

export default function Tap() {
  const account = useActiveAccount();
  const address = account?.address
  const [points, setPoints] = useState(1);
  const [tapCount, setTapCount] = useState(null);
  const [flashPoints, setFlashPoints] = useState([]);
  const [canTap, setCanTap] = useState(true);
  const [remainingTaps, setRemainingTaps] = useState(0);
  const [remainingTapsRacer, setRemainingTapsRace] = useState(0);
  let [cooldownTimeLeft, setCooldownTimeLeft] = useState(null);
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [userRank, setUserRank] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const { addToast } = useToast();
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
  const { currentChain, changeChain, availableChains } = useContext(TokenContext);
  async function handleConnect() {
    const wallet = await connect({ client, chain: currentChain, size: 'compact', wallets: wallets, showThirdwebBranding: false, termsOfServiceUrl: "https://rarebay.xyz/terms", title: 'Rare Connect', theme:
    darkTheme( {
      colors: {
        modalBg: "hsl(0, 0%, 8%)",
        borderColor: "hsl(0, 0%, 8%)",
        separatorLine: "hsl(0, 0%, 74%)",
        tertiaryBg: "hsl(0, 0%, 18%)",
        skeletonBg: "hsl(0, 0%, 33%)",
        secondaryText: "hsl(0, 0%, 74%)",
        selectedTextBg: "hsl(0, 0%, 32%)",
        selectedTextColor: "hsl(0, 0%, 30%)",
        primaryButtonText: "hsl(0, 0%, 35%)",
        secondaryButtonBg: "hsl(0, 0%, 28%)",
        secondaryButtonHoverBg: "hsl(0, 0%, 25%)",
        connectedButtonBg: "hsl(0, 0%, 70%)",
        connectedButtonBgHover: "hsl(231, 4%, 75%)",
        secondaryIconColor: "hsl(218, 100%, 63%)",
        secondaryIconHoverBg: "hsl(0, 0%, 50%)",
        accentText: "hsl(0, 0%, 21%)",
        primaryText: "hsl(240, 4%, 26%)",
        accentButtonBg: "hsl(0, 0%, 31%)",
        primaryButtonBg: "hsl(0, 0%, 36%)",
        secondaryIconHoverColor: "hsl(0, 0%, 83%)",
      },
    })}); // opens the connect modal
  }

  const createFlashPoint = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 0.5 + 0.5; // Random size between 0.5 and 1

    const newFlash = {
      id: Date.now(),
      y,
      x,
      size,
    };

    setFlashPoints((prevFlashPoints) => [...prevFlashPoints, newFlash]);

    setTimeout(() => {
      setFlashPoints((prevFlashPoints) => prevFlashPoints.filter(flash => flash.id !== newFlash.id));
    }, 500);
  };


  const originalColor = "rgba(0, 0, 0, 0.5)";
  const originalShadow = "rgba(0, 0, 0, 0.5)"; // Original button color
  const [bgColor, setBgColor] = useState(originalColor); // Initial color
  // Handle the tap action and update the server with new points
  const [bg, setBg] = useState(originalShadow); // Initial color

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldownTimeLeft > 0) {
      interval = setInterval(() => {
        setCooldownTimeLeft(prev => {
          const newTime = prev - 1000;
          if (newTime <= 0) {
            setCanTap(true);
            return null;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTimeLeft]);


  const triggerCooldown = async () => {
    if (remainingTaps === 0) {
      try {
        const cooldownEndTime = Math.floor((Date.now() + TAP_COOLDOWN_HOURS * MILLISECONDS_IN_HOUR) / 1000);
        setCooldownTimeLeft(TAP_COOLDOWN_HOURS * MILLISECONDS_IN_HOUR);

        await fetch('/api/user/cooldown', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, cooldownEndTime }),
        });

        setCanTap(false);
      } catch (error) {
        console.error('Error triggering cooldown:', error);
      }
    }
    displayBoost();
  };










  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);






 



  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Other UI-related logic remains the same...

  // Function to fetch tap count from the API
  const [fetchedTapCount, setFetchedTapCount] = useState(0);

  const fetchTapCount = async () => {
    try {
      const res = await fetch(`/api/tapCount?address=${address}`);
      const data = await res.json();
      if (res.ok) {
        setFetchedTapCount(data.tap_count); // Set the fetched tap count to state
      } else {
        console.error('Error fetching tap count:', data.error);
      }
    } catch (error) {
      console.error('Error fetching tap count:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (address) {
        fetchTapCount();
      }
    }, 10000); // Fetch every second

    return () => clearInterval(interval); // Clear interval on unmount
  }, [address]);// Dependency array includes address to re-fetch if it changes

  useEffect(() => {

    const fetchLeaderboard = async () => {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 60000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const [onlineCount, setOnlineCount] = useState(0);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch the total number of players with is_online set to true
    const fetchOnlinePlayers = async () => {
      try {
        const response = await fetch('/api/on');
        const data = await response.json();

        if (response.ok) {
          setOnlinePlayers(data.totalOnline);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching online players:', error);
      }
    };

    fetchOnlinePlayers();
  }, []);



  // Function to fetch both total players and online players




  const displayBoost = () => {
    // Decide which boost to display based on the cooldown state (simple example)
    if (cooldownTimeLeft > MILLISECONDS_IN_HOUR / 2) {
      setActiveBoost('Boost A'); // If more than 30 minutes left, display Boost A
    } else {
      setActiveBoost('Boost B'); // If less than 30 minutes left, display Boost B
    }
  };

  const activateBoostA = async () => {
    try {
      const res = await fetch('/api/user/activate-boost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // Update local state
        setCooldownTimeLeft(prev => Math.floor(prev / 2));
        setRemainingBoosts(prev => prev - 1);
        addToast('success', 'Boost activated successfully!');
        
        // Refresh boost status
        const boostRes = await fetch(`/api/user/boost-usage?address=${address}`);
        const boostData = await boostRes.json();
        setBoostLimitReached(boostData.boost_count >= boostData.maxBoosts);
      } else {
        if (data.error === 'Boost limit reached') {
          setBoostLimitReached(true);
        }
        addToast('error', data.error || 'Failed to activate boost');
      }
    } catch (error) {
      console.error('Error activating boost:', error);
      addToast('error', 'An error occurred while activating the boost');
    }
  };


  const activateBoostB = () => {
    if (cooldownTimeLeft) {
      // Apply logic for Boost B (e.g., give bonus taps or points)
      setPoints(points + 10); // Example: Add 10 points when Boost B is activated
      addToast('success', 'Boost A activated!');
    } else {
      addToast('error', 'Boost not activated!');
    }
  };
  const [activeBoost, setActiveBoost] = useState(null);

  useEffect(() => {
   const fetchCooldownState = async () => {
    try {
      // Fetch the cooldown end time from the backend
      const res = await fetch(`/api/user/cooldown?address=${address}`);
      const data = await res.json();

      if (res.ok && data.cooldownEndTime) {
        const remainingTime = new Date(data.cooldownEndTime).getTime() - Date.now();

        if (remainingTime > 0) {
          setCooldownTimeLeft(remainingTime);
          setCanTap(false);
        } else {
          setCooldownTimeLeft(null);
          setCanTap(true);

        }
      }
    } catch (error) {
      console.error('Error fetching cooldown state:', error);
    }
  };
  fetchCooldownState();
  }, [address]);

  useEffect(() => {
    const fetchRankAndTotalUsers = async () => {
      if (address) {
        try {
          const res = await fetch(`/api/user-rank?address=${address}`);
          const data = await res.json();

          if (res.ok) {
            setUserRank(data.rank); // Set user rank
            setTotalPlayers(data.totalPlayers); // Set total players
          } else {
            console.error("Error fetching rank and total users:", data.error);
          }
        } catch (error) {
          console.error("Error fetching rank and total users:", error);
        }
      }
    };

    fetchRankAndTotalUsers();
  }, [address]);

  const sortedLeaderboard = leaderboard.sort((a, b) => b.tap_count - a.tap_count);

  // Slice the top 10 users
  const top10Users = sortedLeaderboard.slice(0, 10);

  // Slice users ranked 11 to 20
  const next10Users = sortedLeaderboard.slice(10, 20);






  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`/api/user/points?address=${address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch player data');
        }
        const data = await response.json();
        setRemainingTaps(MAX_TAPS - data?.points);

      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    if (address) {
      fetchPlayerData();
    }
    updatePlayerStatus(address);

  }, [address]);

  const updatePlayerStatus = async (address: string) => {
    const isOnline = false; // Check if the user is online

    try {
      const response = await fetch('/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: address, is_online: address ? isOnline : !isOnline }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error updating player status:', error);
    }
  };
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [userSpeed, setUserSpeed] = useState(0);
  const difficultySpeeds = {
    easy: userSpeed > 0 ? userSpeed : 13,  // 5 taps per second
    medium: 15,  // 8 taps per second
    hard: 20,  // 10 taps per second
  };

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [raceProgress, setRaceProgress] = useState(0);  // Race progress value
  const [difficulty, setDifficulty] = useState("medium");
  const [isRunning, setIsRunning] = useState(false);  // To track whether the game is running
  const [highScore, setHighScore] = useState(0);  // Track high score from API
  const [timeDiff, setTimeDiff] = useState(null);  // Store time difference in human-readable format
  const [countdown, setCountdown] = useState(3);  // Countdown state (3 seconds)
  const [countdownStarted, setCountdownStarted] = useState(false);  // Whether the countdown has started
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal visibility state
  const [isModalOpen2, setIsModalOpen2] = useState(false); // Modal visibility state
  const [boostAvailable, setBoostAvailable] = useState(true); // Track if boost is available
  const [raceActive, setRaceActive] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);
  const [aiWins, setAiWins] = useState(0);
  const [raceResult, setRaceResult] = useState('');

  // Countdown before starting the race
  useEffect(() => {
    if (countdownStarted && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 3000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdown, countdownStarted]);

  const startRace = () => {
    setRemainingTapsRace(remainingTaps); // Reset player taps
    setRemainingTaps(remainingTaps); // Reset player taps
    setStartTime(Date.now());
    setIsRunning(true);
    setCountdown(3);  // Reset countdown
    setCountdownStarted(true);  // Start countdown
    setRaceActive(true);
    setRaceResult('');
    setIsModalOpen(false);
    setRaceProgress(MAX_TAPS - remainingTaps);  // Reset auto race progress
  };

  const pauseRace = () => {
    setIsRunning(false);
  };

  const resetRace = () => {
    setRaceProgress(0);  // Reset auto race progress
    setStartTime(Date.now());
    setIsRunning(true);
    setIsModalOpen(false);
  };


  const updateHighScore = async (newHighScore: SetStateAction<number>) => {
    const response = await fetch('/api/highscore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        points: newHighScore,
      }),
    });
    const data = await response.json();
    setHighScore(newHighScore as any / 200);
  };

  // Update progress based on time and difficulty
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout;
    if (isRunning && raceActive) {
      interval = setInterval(() => {
        setRaceProgress(prev => {
          const newProgress = prev + difficultySpeeds[difficulty];
          if (newProgress >= MAX_TAP) {
            endRace('ai');
            return MAX_TAP;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, difficulty, raceActive]);
  const end = Date.now();
  const duration = end - startTime;
  const [fastestPlayer, setFastestPlayer] = useState<{address: string, speed: number} | null>(null);

useEffect(() => {
  const fetchFastestPlayer = async () => {
    try {
      const res = await fetch('/api/fastest');
      const data = await res.json();
      if (data.address && data.speed) {
        setFastestPlayer(data);
      }
    } catch (error) {
      console.error('Error fetching fastest player:', error);
    }
  };

  fetchFastestPlayer();
  const interval = setInterval(fetchFastestPlayer, 30000);
  return () => clearInterval(interval);
}, []);
const calculateAverageSpeed = (start: number, taps: number) => {
  const timeElapsed = Date.now() - start;
  return taps > 0 ? (taps / (timeElapsed / 1000)).toFixed(2) : 0;
};
const tapsUsed = MAX_TAPS - remainingTaps;
const speed = calculateAverageSpeed(startTime, tapsUsed);
  const endRace = async (winner: string) => {
    const playerProgress = (tapsUsed / MAX_TAPS) * 100;
    const botProgress = (raceProgress / MAX_TAP) * 100;

    // Only calculate speed if progress is above 50%
    if (playerProgress > 50 || botProgress > 50) {
      setAverageSpeed(Number(speed));
      updateSpeed(Number(speed));
    }

    setTimeDiff(duration);
    setIsRunning(false);
    setRaceActive(false);
    
    setRaceResult(winner === 'player' ? 'You Won! 🎉' : 'RareBot Won! 🤖');
    if(raceResult==='You Won! 🎉'){
      const tapSound = new Audio("/win.wav"); // Replace with your actual file path
      tapSound.play();
    }
    if(raceResult==='RareBot Won! 🤖'){
      const tapSound = new Audio("/lost.wav"); // Replace with your actual file path
      tapSound.play();
    }
    if (winner === 'player' && (duration < highScore || highScore === 0)) {
      setHighScore(duration);
      updateHighScore(duration);
    }
 
    if (winner!=='player'){
      const tapSound = new Audio("/lost.wav"); // Replace with your actual file path
      tapSound.play();
      return  
    }
    if (winner === 'player') setPlayerWins(prev => prev + 1);
    else setAiWins(prev => prev + 1);
    try {
      // Update both points and speed
      await fetch(`/api/user/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address,
          points: MAX_TAPS - remainingTaps + 1,
          speed: Number(speed)
        }),
      });
      
      // Refresh user speed
      const speedRes = await fetch(`/api/user/speed?address=${address}`);
      const speedData = await speedRes.json();
      if (speedRes.ok) {
        setUserSpeed(speedData.speed || 0);
      }
    } catch (error) {
      console.error('Error updating stats:', error);
    }
    setIsModalOpen(true);
  };
  const handleRaceTap = () => {
    if (raceActive && remainingTaps > 0) {
      setRemainingTaps(prev => {
        const newTaps = prev - 1;
        if (newTaps <= 0) {
          endRace('player');
          return 0;
        }
        return newTaps;
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log("Modal opened");
    setIsRunning(false);
  };
  const closeModal = () => setIsModalOpen(false);

  const openModal2 = () => {
    setIsModalOpen2(true);
    console.log("Modal opened");
  };
  const closeModal2 = () => setIsModalOpen2(false);

  const handleTap = async () => {
    if (!address) {
      addToast("error", "Please connect your wallet to play!");
      return;
    }

    const tapSound = new Audio("/tap1.wav"); // Replace with your actual file path
    tapSound.play();
  

    if (canTap && remainingTaps!==0 && raceActive) {
      handleRaceTap();
      setIsRunning(true)
      const newTapCount = tapCount + 1;
      const newPoints = points + 1;
      setTapCount(newTapCount);
      setPoints(newPoints);
      setRemainingTaps((prev) => prev - 1);
      setBgColor('rgba(129, 149, 149, 0.2)');
      setBg(points > 1000 ? '0px 0px 50px rgba(0, 153, 255, 0.11)' : points > 900 ? '0px 0px 50px rgba(0, 153, 255, 0.201)' : points > 800 ? '0px 0px 50px rgba(0, 153, 255, 0.301)' : points > 700 ? '0px 0px 50px rgba(0, 153, 255, 0.301)' : points > 600 ? '0px 0px 50px rgba(0, 153, 255, 0.501)' : points > 500 ? '0px 0px 50px rgba(0, 153, 255, 0.601)' : points > 400 ? '0px 0px 50px rgba(0, 153, 255, 0.201)' : points > 300 ? '0px 0px 50px rgba(0, 153, 255, 0.801)' : points > 200 ? '0px 0px 50px rgba(0, 153, 255, 0.901)' : points > 100 && '0px 0px 50px rgba(0, 153, 255, 1)');
      setTimeout(() => {
        setBgColor(originalColor);
        setBg(originalShadow)
      }, 50);
      createFlashPoint();

      // Update the server with the new points
      await fetch(`/api/user/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, points: MAX_TAPS - remainingTaps + 1, tapCount: newTapCount }),
      });


    } else {
      triggerCooldown();
      setRemainingTaps(MAX_TAPS);
      console.log('No more taps available or cooldown is active');
    }
  };


const [sortBy, setSortBy] = useState('tap_count'); // 'tap_count' or 'speed'



const updateSpeed = async (speed: number) => {
  try {
    await fetch(`/api/user/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        address, 
        speed: averageSpeed
      }),
    });
  } catch (error) {
    console.error('Error updating speed:', error);
  }
};

const [boostLimitReached, setBoostLimitReached] = useState(false);
const [remainingBoosts, setRemainingBoosts] = useState(0);

useEffect(() => {
  const fetchBoostStatus = async () => {
    if (address) {
      try {
        const res = await fetch(`/api/user/boost-usage?address=${address}`);
        const data = await res.json();
        
        if (data.error) {
          setBoostLimitReached(true);
          return;
        }

        const now = new Date();
        const lastBoostTime = new Date(data.last_boost);
        const hoursSinceLastBoost = (now.getTime() - lastBoostTime.getTime()) / (1000 * 60 * 60);
        
        // Reset boost count if more than 8 hours have passed
        if (hoursSinceLastBoost > 8) {
          setBoostLimitReached(false);
          setRemainingBoosts(data.maxBoosts - 0);
        } else {
          setRemainingBoosts(data.maxBoosts - data.boost_count);
          setBoostLimitReached(data.boost_count >= data.maxBoosts);
        }
      } catch (error) {
        console.error('Error fetching boost status:', error);
      }
    }
  };

  fetchBoostStatus();
  const interval = setInterval(fetchBoostStatus, 60000); // Check every minute
  return () => clearInterval(interval);
}, [address]);


const { mutate: sendTransaction } = useSendTransaction();
const contract = getContract({
  client,
  chain: defineChain(1116),
  address: "0x06EB5B8BBd08f184C05D3d7E47efc4E84b6d6d4C",
});
const tokenId = ethers.parseUnits('0');
const tokenId1 = ethers.parseUnits('1');
const quantity = ethers.parseUnits('1');
const isERC721Query = useReadContract(isERC721, { contract });
const isERC1155Query = useReadContract(isERC1155, { contract });
	const contractMetadataQuery = useReadContract(getContractMetadata, {
		contract,
	});
  const nftQuery = useReadContract(getNFT, {
		contract,
		tokenId,
		queryOptions: { enabled: isERC1155Query.data },
	});
  const claimCondition1155 = useReadContract(getActiveClaimCondition1155, {
		contract,
		tokenId,
		queryOptions: {
			enabled: isERC1155Query.data,
		},
	});
  const claimCondition721 = useReadContract(getActiveClaimCondition721, {
		contract,
		queryOptions: { enabled: isERC721Query.data },
	});
  const claimCondition20 = useReadContract(getActiveClaimCondition20, {
		contract,
		queryOptions: { enabled: !isERC721Query.data && !isERC1155Query.data },
	});

	const displayName = isERC1155Query.data
		? nftQuery.data?.metadata.name
		: contractMetadataQuery.data?.name;

	const description = isERC1155Query.data
		? nftQuery.data?.metadata.description
		: contractMetadataQuery.data?.description;

	const priceInWei = isERC1155Query.data
		? claimCondition1155.data?.pricePerToken
		: isERC721Query.data
			? claimCondition721.data?.pricePerToken
			: claimCondition20.data?.pricePerToken;

	const currency = isERC1155Query.data
		? claimCondition1155.data?.currency
		: isERC721Query.data
			? claimCondition721.data?.currency
			: claimCondition20.data?.currency;
      const currencyContract = getContract({
        address: currency || "0xe280766d22517626A17944Fe11380f13EFf711AD",
        chain: defineChain(1116),
        client,
      });
    
      const currencyMetadata = useReadContract(getCurrencyMetadata, {
        contract: currencyContract,
        queryOptions: { enabled: !!currency },
      });
    
      const currencySymbol = currencyMetadata.data?.symbol || "";

      const pricePerToken =
		currencyMetadata.data && priceInWei !== null && priceInWei !== undefined
			? Number(toTokens(priceInWei, currencyMetadata.data.decimals))
			: null;
      const [isMinting, setIsMinting] = useState(false);
const Buy2x = () => {
  return(
    <ClaimButton
    theme={"light"}
    contractAddress={contract?.address}
    chain={defineChain(1116)}
    client={client}
    claimParams={
      isERC1155
        ? {
            type: "ERC1155",
            tokenId: tokenId,
            quantity: BigInt(quantity),
            to: account?.address,
            from: account.address,
          }
        : isERC721
          ? {
              type: "ERC721",
              quantity: BigInt(quantity),
              to: account?.address,
              from: account.address,
            }
          : {
              type: "ERC20",
              quantity: String(quantity),
              to: address,
              from: account.address,
            }
    }
    style={{
      backgroundColor: "transparent",
      color: "white",
      width: "100%",
      height: '0px',
      padding: '0px'
    }}
    disabled={isMinting}
    onTransactionSent={() => addToast('info', 'Minting...')}
    onTransactionConfirmed={() =>
      addToast('success', 'Minting...')
    }
    onError={(err) => addToast('error', err.message)}
  >
    Buy
  </ClaimButton> 
  )
};
const Buy5x = () => {
  return(
    <ClaimButton
    theme={"light"}
    contractAddress={contract?.address}
    chain={defineChain(1116)}
    client={client}
    claimParams={
      isERC1155
        && {
            type: "ERC1155",
            tokenId: tokenId1,
            quantity: quantity,
            to: account?.address,
          }
       
    }
    style={{
      backgroundColor: "transparent",
      color: "white",
      width: "0px",
      height: '0px',
      padding: '0px'
    }}
    disabled={isMinting}
    onTransactionSent={() => addToast('info', 'Minting...')}
    onTransactionConfirmed={() =>
      addToast('success', 'Minting...')
    }
    onError={(err) => addToast('error', err.message)}
  >
    Buy
  </ClaimButton> 
  )
};
const { showEarthContainer, toggleEarthContainer, setShowEarthContainer } = useBackground();
const { isAudioEnabled, toggleAudio } = useBackground();

  return (
    <>
      {isModalOpen && !raceActive &&
        <>

          <div className='modal'>
            <div className='modal-content'>              
              <div className='center'>
                <button  style={{border: difficulty === "easy" && "solid lightblue"}} className='button' onClick={() => setDifficulty('easy')} disabled={isRunning}>Self</button>
                <button   style={{border: difficulty === "medium" && "solid orangered"}}  className='button' onClick={() => setDifficulty('medium')} disabled={isRunning}>Medium</button>
                <button   style={{border: difficulty === "hard" && "solid red"}}  className='button' onClick={() => setDifficulty('hard')} disabled={isRunning}>Hard</button>
              </div>
            
             <div className='center-c'>
                <h2 style={{color: 'red'}}>{raceResult.toString() === 'RareBot Won! 🤖' ? 'You Lost' : raceResult.toString() === 'You Won! 🎉' && <h2 style={{color: 'green'}}>You Won</h2>}</h2>
                <h3>Your score: {highScore || ''}</h3>
                <div className="center-c">
<p>{raceResult}</p>
<p>Average Speed⚡: {averageSpeed} Taps/Sec</p>
<p style={{fontStyle: 'italic'}}>{averageSpeed>15 ? 'Top 1% Speed' : averageSpeed>9 ? 'Top 5% Speed' : averageSpeed>6 ? 'Top 10%' : averageSpeed>5 ? 'Top 50%' : averageSpeed<3 && 'Top 90%'}</p>
            </div>
               
         <div className='center'>
                  {!raceActive ? (
                    <button className='button' onClick={startRace}>Start
                      <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#a3a3a3" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
                    </button>
                  ) : (
                     !isRunning ? <button className='button' onClick={pauseRace}>Paused
                     <svg width="18px" height="18px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 1H2V15H7V1Z" fill="#bababa"></path> <path d="M14 1H9V15H14V1Z" fill="#bababa"></path> </g></svg>
                   </button> : <button className='button' onClick={startRace}>Start
                   <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#a3a3a3" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
                    </button>
                  )}
                  {!raceActive && <button className='button' onClick={()=>{
                    setIsModalOpen(false)
                    setIsRunning(true)
                  }}>Resume
                  <svg fill="#9c9c9c" width="18px" height="18px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#9c9c9c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M960 0v112.941c467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059-467.125 0-847.059-379.934-847.059-847.059 0-267.106 126.607-515.915 338.824-675.727v393.374h112.94V112.941H0v112.941h342.89C127.058 407.38 0 674.711 0 960c0 529.355 430.645 960 960 960s960-430.645 960-960S1489.355 0 960 0" fill-rule="evenodd"></path> </g></svg>
                  </button> }
                </div> 
              
              </div>
            </div>
          </div>
        </>
      }
      {isModalOpen2 && boostLimitReached &&
        <>
          <div className='modal' onClick={closeModal}>
            <div className='modal-content'>
              <div className='x' onClick={closeModal2}>
                <svg width="24" height="24" viewBox="0 0 32 32">
                  <path
                    d="M2 6v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m2 0h16v20H4v-9h10.17l-3.58 3.59L12 22l6-6l-6-6l-1.41 1.41L14.17 15H4z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div className='center-c'>
                <h2>Buy Boost</h2>
                <p style={{fontStyle: 'italic'}}>
                  Use RareCoin for in-app purchase
                </p>
                <hr />
                  <div className='center'>
                    <div className='center-c' style={{border: 'solid 1px rgba(120, 120, 20)', borderRadius: '20px', padding: '10px 10px', width: '45%', background: 'rgba(80, 80, 20, 0.3)'}}>
                      <div style={{position: 'absolute', right: '50%', top: '33%', borderRadius: '100px', background: 'green', padding: '4px'}}><p>x2</p></div>
                      <div style={{position: 'absolute', right: '8%', top: '33%', borderRadius: '100px', background: 'green', padding: '4px'}}><p>x5</p></div>
                      <img  src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHQ0Z284NGRkOWg4dGx4cmNlOXdlY3ZkZnUyaW1pNmJvaTBoZHRzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5G1VDKTWdvuVFa3TaM/giphy.gif' height={50}></img>
                      <p style={{border: 'solid 1px rgba(120, 120, 120, 0.7)', borderRadius: '8px', padding: '4px 4px', background: 'lightblue', color: 'grey' }} className='center'>100 RARE<img src='/jhjj-200w.webp' height={16}></img></p>
                      <p className='button' style={{ width: '100%'}}>
                        <Buy2x />
                         <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="#a6a6a6" stroke-width="1.5"></path> <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="#a6a6a6" stroke-width="1.5"></path> <path d="M11 10.8L12.1429 12L15 9" stroke="#a6a6a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" stroke="#a6a6a6" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></p>
                    </div>
                    <div className='center-c' style={{border: 'solid 1px rgba(20, 80, 150)', borderRadius: '20px', padding: '10px 10px', width: '45%', background: 'rgba(20, 20, 120, 0.3)'}}>
                      <img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHQ0Z284NGRkOWg4dGx4cmNlOXdlY3ZkZnUyaW1pNmJvaTBoZHRzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5G1VDKTWdvuVFa3TaM/giphy.gif' height={50}></img>
                      <p style={{border: 'solid 1px rgba(120, 120, 120, 0.7)', borderRadius: '8px', padding: '4px 4px', background: 'gold', color: 'grey' }} className='center'>5 CORE<img src='/core-200w.png' height={16}></img></p>
                      <p className='button' style={{ width: '100%'}}>
                      <Buy5x />
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="#a6a6a6" stroke-width="1.5"></path> <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="#a6a6a6" stroke-width="1.5"></path> <path d="M11 10.8L12.1429 12L15 9" stroke="#a6a6a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" stroke="#a6a6a6" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></p>

                    </div>
                  </div>
                  <Link href='/'>
                  <div  className='msg' style={{border: 'solid 1px rgba(20, 80, 150)', borderRadius: '20px', padding: '10px 10px', width: '100%', background: 'rgba(20, 20, 120, 0.3)'}}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="8" />
          </svg> Go to Swap to add more Coins
          <svg fill="#808080" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M30.216 9.318l-5.598-6c-0.19-0.203-0.454-0.317-0.732-0.317h-8.348l-0.031-2.063c0-0.517-0.448-0.938-1-0.938s-0.938 0.42-0.938 0.938l-0.030 2.063h-11.024c-0.552 0-1 0.447-1 1v12c0 0.552 0.448 1 1 1h11.011v14.063c0 0.517 0.448 0.938 1 0.938s1-0.42 1-0.938v-14.063h8.361c0.277 0 0.542-0.115 0.732-0.317l5.598-6c0.358-0.384 0.358-0.98 0-1.365zM23.452 15h-19.936v-10h19.936l4.665 5z"></path> </g></svg>
                  </div>
                  </Link>
                </div>
            </div>
          </div>
        </>
      }
 
      
      <div className={styles.container}>
        <div className={styles.address} onClick={openModal}>
          {address ? <div className={styles.point}>
            <Blockie address={address || ''} gridSize={4} />
            <p>{truncateAddress(address)}</p>
          </div> : <div onClick={handleConnect} className={styles.point}>
            {isConnecting ? <div className='spinner' style={{ height: '20px', width: '20px' }} /> : 'Connect wallet'}
          </div>}
          <p className={styles.points}>{fetchedTapCount}⚡{(Number(fetchedTapCount) < 100) ? 'Newbie' : (Number(fetchedTapCount) < 2000) ? 'Lvl 2' : (Number(fetchedTapCount) < 3000) ? 'Level 3' : (Number(fetchedTapCount) < 5000) ? 'Level 4' : (Number(fetchedTapCount) < 5000) ? 'Level 5' : (Number(fetchedTapCount) < 10000) ? 'Prof 🧠' : (Number(fetchedTapCount) < 20000) ? 'Hercules🦁' : (Number(fetchedTapCount) < 30000) ? 'Zues👑' : (Number(fetchedTapCount) < 40000) ? 'Satoshi₿' : (Number(fetchedTapCount) < 50000) ? 'RAR310NE⚡' : 'RAR310NE⚡'}</p>
        </div>
        {cooldownTimeLeft ? (
          <div className={styles.progress}>
            <p>More Taps in⏳: <p className='button'>{formatTime(cooldownTimeLeft)}</p></p>
          </div>
        ) : (
          <>
            {flashPoints.map((flash) => (
              <div
                key={flash.id}
                className={styles.flash}
                style={{
                  top: `${flash.y}px`,
                  left: `${flash.x}px`,
                  transform: `scale(${flash.size})`,
                }}
              >
                +1
              </div>
            ))}
       <div className={styles.progress}>
              <p>{remainingTaps} Taps Remaining</p>
              <progress value={MAX_TAPS - remainingTaps} max={MAX_TAPS}></progress>
              <> <hr />
              <p>RareBot: {MAX_TAPS-raceProgress}</p>
              <progress
                className="progressr"
                value={raceProgress}
                max={MAX_TAPS}
              ></progress></>
            </div>
            <hr />
          </>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }} >
          {!canTap && <div className='btc' onClick={boostLimitReached ? openModal2 : activateBoostA}
          
          >
            <div className='redd'><p style={{fontSize: '8px'}}>{remainingBoosts}</p></div>

            <button >
              <div style={{ cursor: 'pointer', zIndex: '100' }}>
                <img style={{ cursor: 'pointer', zIndex: '100' }} src='/rocket.png' width={55} height={55} />
              </div>
            </button>
            <p style={{ fontSize: '10px' }}>Boost</p>
          </div>}
          {!canTap && <div className='btc2'  >
            {boostAvailable && <div className='redd' />}

            <button >
              <Link href='/frens/RAR31ONE'>
                <div style={{ cursor: 'pointer', zIndex: '100' }}>
                  <img src='/people.png' width={50} height={50} />
                </div>
              </Link>
            </button>
            <p style={{ fontSize: '10px' }}>Frens</p>

          </div>
          }
          <button
            style={{ background: bgColor, boxShadow: canTap ? bg : 'none' }}
            className={styles.tapButton} onClick={handleTap}>
            <img src={(Number(fetchedTapCount) < 100) ? '/one.png' : (Number(fetchedTapCount) < 2000) ? '/2.png' : (Number(fetchedTapCount) < 3000) ? '/3.png' : (Number(fetchedTapCount) < 5000) ? '/4.png' : (Number(fetchedTapCount) < 5000) ? '/5.png' : (Number(fetchedTapCount) < 10000) ? '/prof.png' : (Number(fetchedTapCount) < 20000) ? '/hercules.png' : (Number(fetchedTapCount) < 30000) ? '/zues.png' : (Number(fetchedTapCount) < 40000) ? '/232.png' : (Number(fetchedTapCount) < 50000) ? '/13.png' : '13.png'} height={230} width={230} style={{ borderRadius: '100%', filter: 'opacity(0.7)', boxShadow: '5px 5px 10px black' }} />
          </button>
        </div>
        <div className={styles.stats}>
  {userSpeed > 0 && <p>⚡ Speed: {userSpeed}/s</p>}
  {fastestPlayer && (
    <p>🏆 Fastest: {truncateAddress(fastestPlayer.address)} {fastestPlayer.speed}/s</p>
  )}
</div>
<hr />

        <div className={styles.fls}>
          <div className={styles.leaderboard}>
            <div className='center' style={{borderBottom: 'solid 1px rgba(120, 120 ,120)', borderRadius: '0px'}}>
              <div style={{width: '23%'}}>#Rank</div>
              <div style={{width: '23%'}}>Player</div>
              <div style={{width: '23%'}}>Highscore</div>
              <div style={{width: '23%'}}>Points</div>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              {top10Users.map((player, index) => (
                <div key={index} className={styles.player}>
                  <p style={{width: '20%'}}>{index + 1}</p>
                  <div>
                    <Blockie address={player.address} gridSize={4} />
                  </div>
                  <p style={{width: '23%'}}>{truncateAddress(player.address)}</p>
                  <p style={{width: '23%', filter: 'grayscale(100%)', color: 'white' }}>
                    {player.highscore as any / 200}
                  </p>
                  <p  style={{width: '23%', filter: 'grayscale(100%)', color: 'white' }}>
                  {player.tap_count}-<p style={{fontSize: '10px', color: 'orange'}}>{player.speed}T/s</p>
                  </p>
                </div>
              ))}

            </div>

          </div>
          <div className={styles.leaderboard}>
          <div className='center' style={{borderBottom: 'solid 1px rgba(120, 120 ,120)', borderRadius: '0px'}}>
              <div style={{width: '23%'}}>#Rank</div>
              <div style={{width: '23%'}}>Player</div>
              <div style={{width: '23%'}}>Highscore</div>
              <div style={{width: '23%'}}>Points</div>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

              {next10Users.map((player, index) => (
                <div key={index + 10} className={styles.player}>
              <p style={{width: '20%'}}>{index + 10}</p>
                  <div>
                    <Blockie address={player.address} gridSize={4} />
                  </div>
                  <p style={{width: '23%'}}>{truncateAddress(player.address)}</p>
                  <p style={{width: '23%', filter: 'grayscale(100%)', color: 'white' }}>
                    {player.highscore as any / 200}
                  </p>
                  <p  style={{width: '23%', filter: 'grayscale(100%)', color: 'white' }}>
                    {player.tap_count}-{player.speed}T/s
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
