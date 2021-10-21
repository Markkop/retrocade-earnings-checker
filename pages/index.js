import Head from 'next/head'
import GithubCorner from 'react-github-corner';
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';

async function getRewards(address) {
  const response = await fetch('/api/rewards', {
    method: 'POST',
    body: JSON.stringify({
      address
    })
  });
  return response.json();
}

function formatBUSD(amount) {
  return `+ $${amount.toFixed(2)} BUSD`
}

function Home({ address }) {
  const [rewards, setRewards] = useState({
    totalRewards: 0,
    averageRewardsPerDay: 0,
    rewardsByDate: [],
    rewardsWithTxHash: [] 
  });
  const [inputAddress, setInputAddress] = useState('')

  useEffect(() => {
    getRewards(address).then(rewards => {
      
      if (!rewards.totalRewards) return
      setRewards(rewards)
    })
  }, []);

  function onAddressSubmit(event) {
    event.preventDefault()
  
    const url = new URL(window.location.href);
    url.searchParams.set('address', inputAddress);
    window.location.replace(url.toString());
  }

  return (
    <div className={styles.home}>
      <GithubCorner 
        href="https://github.com/Markkop/retrocade-earnings-checker"
        octoColor="#151513"
        bannerColor="#cd44b3"
      />
      <Head>
        <title>Retrocade Earnings Checker</title>
        <meta name="description" content="Check how much BUSD you've earned while holding RC tokens" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:image" content="https://user-images.githubusercontent.com/16388408/138349218-4c25a8dd-55f2-4d5e-98dc-1804c3a96de3.png"/>
        <meta property="og:title" content="Retrocade Earnings Checker"/>
        <meta property="og:description" content="Check how much BUSD you've earned while holding RC tokens"/>
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>
          <a href="https://www.retrocadep2e.com/" rel="noopener noreferrer" target="_blank">Retrocade</a> Earnings Checker
        </h1>
      </header>

      <div className={`${styles.widget} ${styles.walletWidget}`}>
          Enter your public wallet address here:
          <form onSubmit={onAddressSubmit}>
            <input 
              name="address" 
              type="text"
              onChange={e => setInputAddress(e.target.value)}  
            />
          </form>
        </div>

      <main className={styles.content}>
        <div className={styles.container}>
          <div className={styles.widget}>
            Total Rewards:
            <p>{formatBUSD(rewards.totalRewards)}</p>
          </div>

          <div className={styles.widget}>
            Transactions: 
            <ul className={styles.txList}>
              {rewards.rewardsWithTxHash.map(reward => (
                <li>
                  <a
                    className={styles.txLink}
                    href={`https://bscscan.com/tx/${reward.txHash}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    {`${reward.date} | ${formatBUSD(reward.amount)}`}
                  </a>
                </li>
            ))}
            </ul>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.widget}>
            Average passive income: 
            <p>{`${formatBUSD(rewards.averageRewardsPerDay)}/day`}</p>
          </div>

          <div className={styles.widget}>
            Rewards by Date: 
            <ul className={styles.txList}>
              {rewards.rewardsByDate.map(reward => (
                <li>
                  {`${reward.date} | ${formatBUSD(reward.amount)}`}
                </li>
            ))}
            </ul>
          </div>
        </div>
      </main>


    </div>
  )
}

Home.getInitialProps = async ({ query }) => {
  const {address} = query

  return {address}
}

export default Home