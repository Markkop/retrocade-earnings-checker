import GithubCorner from 'react-github-corner';
import { useState, useEffect } from 'react';
import PageHead from '../components/PageHead'
import WalletWidget from '../components/WalletWidget'
import Header from '../components/Header';
import { AddressForm } from '../components/AddressForm';
import Widget from '../components/Widget';
import WidgetContainer from '../components/WidgetContainer';
import TransactionsList from '../components/TransactionsList';
import RewardsList from '../components/RewardsList';
import HomePage from '../components/HomePage';
import Main from '../components/Main';
import { formatBUSD } from '../helpers/format'
import { getRewards } from '../helpers/api'
import { updateURLQueryStrings } from '../helpers/browser';

function Home({ queryAddress }) {
  const [inputAddress, setInputAddress] = useState('')
  const [rewards, setRewards] = useState({
    totalRewards: 0,
    averageRewardsPerDay: 0,
    rewardsByDate: [],
    transactions: [] 
  });

  function updateRewads(address) {
    getRewards(address).then(rewards => rewards.totalRewards && setRewards(rewards))
  }

  useEffect(() => {
    const address = inputAddress.trim() || queryAddress
    const isValidEthAddress = /^0x[a-fA-F0-9]{40}$/.test(address)
    if (!isValidEthAddress) return
    updateURLQueryStrings(address)
    updateRewads(address)
  }, [inputAddress]);

  return (
    <HomePage>
      <GithubCorner 
        href="https://github.com/Markkop/retrocade-earnings-checker"
        octoColor="#151513"
        bannerColor="#cd44b3"
      />
      <PageHead/>

      <Header/>

      <WalletWidget title='Enter your public wallet address here'>
        <AddressForm
          setInputAddress={setInputAddress}
        />
      </WalletWidget>
 
      <Main>
        <WidgetContainer>
          <Widget title="Total Rewards">
            <p>{formatBUSD(rewards.totalRewards)}</p>
          </Widget>

          <Widget title="Transactions">
            <TransactionsList list={rewards.transactions}/>
          </Widget>
        </WidgetContainer>

        <WidgetContainer>
          <Widget title="Average passive income">
            <p>{`${formatBUSD(rewards.averageRewardsPerDay)}/day`}</p>
          </Widget>

          <Widget title="Rewards by Date">
            <RewardsList list={rewards.rewardsByDate}/>
          </Widget>
        </WidgetContainer>
      </Main>
    </HomePage>
  )
}

Home.getInitialProps = async function getInitialProps({ query }) {
  const { address } = query
  return { queryAddress: address }
}

export default Home