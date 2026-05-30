import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext.jsx';
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { logout } = useAuth();
  const startSec = 60;
  const [seconds, setSeconds] = useState(startSec);
  const [running, setRunning] = useState(false);
  const [coins, setCoins] = useState(null);
  const coinsEarned = startSec * 2;

  useEffect(() => {
    fetch(`${API_URL}/api/coins`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setCoins(data.coins));
  }, []);

  useEffect(() => {
    if (!running) return;
    const intervalId = setInterval(() => {
      setSeconds(sec => {
      if (sec === 1)
        fetch(`${API_URL}/coins`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 1, unitType: 'study', duration: 60, coins: coinsEarned })
        }).then((r) => r.json())
          .then(console.log); // TODO: update coins in real time
      return sec > 0 ? sec - 1 : sec;});
    }, 1000);
    return () => clearInterval(intervalId);
  }, [running]);

  function handleStartStop() {
    if (!running) {
      setRunning(true);
    } else {
      setSeconds(startSec);
      setRunning(false);
    }
  }

  const minutes = Math.floor(seconds / 60);
  const remSeconds = seconds % 60;

  return (
      <section id="center">
        <h1 className="brand-title font-bold text-6xl">Purrsuit</h1>
        <div className="container">
            <h2 className="header text-2xl">Studying in progress...</h2>
          <div>
            {minutes < 10 ? "0" + minutes : minutes}:
            {remSeconds < 10 ? "0" + remSeconds : remSeconds}
            <p>Current Coins: {coins !== null ? coins : 'Loading...'}</p>
          </div>
          <div>
            <button onClick={handleStartStop} className="hover:bg-gray-200 border-2">{running ? "Stop" : "Start"}</button>
            <button onClick={logout} className="hover:bg-gray-200 border-2">Logout</button>
          </div>
        </div>
        <div>
        </div>
      </section>
  )
}