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
import Section from '../components/Section';
import { formatApproximateCurrencyInDollars, formatCurrency } from '../helpers/format'
import { getPrice, getRewards } from '../helpers/api'
import { updateURLQueryStrings } from '../helpers/browser';
import { sumAmounts } from '../helpers/parseRewards';

const defaultRewards = {
  totalPassiveRewards: 0,
  totalP2ERewards: 0,
  averagePassiveRewardsPerDay: 0,
  passiveRewardsByDate: [],
  passiveTransactions: [],
  p2eTransactions: [],
  tokensHold: 0,
  totalHarvested: 0,
  harvestTransactions: []
}
function Home({ queryAddress }) {
  const [inputAddress, setInputAddress] = useState('')
  const [rewards, setRewards] = useState(defaultRewards);
  const [price, setPrice] = useState(0);

  function updateRewads(address) {
    getRewards(address).then(rewards => rewards.error ? setRewards(defaultRewards) : setRewards(rewards))
  }

  function updatPrice() {
    getPrice('retrocade').then(priceResponse => priceResponse.error ? setPrice(0) : setPrice(priceResponse.price))
  }

  useEffect(() => {
    const address = inputAddress.trim() || queryAddress
    const isValidEthAddress = /^0x[a-fA-F0-9]{40}$/.test(address)
    if (!isValidEthAddress) {
      setRewards(defaultRewards)
      return
    }
    updatPrice()
    updateURLQueryStrings(address)
    updateRewads(address)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <Section>

      <WidgetContainer>
          <Widget title="Total P2E Rewards">
            <p>{formatCurrency(sumAmounts(rewards.p2eTransactions, price), 'USD')}</p>
          </Widget>

          <Widget title="P2E Rewards Transactions">
            <TransactionsList list={rewards.p2eTransactions} price={price}/>
          </Widget>
        </WidgetContainer>

        <WidgetContainer>
          <Widget title="Total harvested from staking">
            <p>{`${rewards.totalHarvested.toLocaleString()} RC ${formatApproximateCurrencyInDollars(price, rewards.totalHarvested)}`}</p>
          </Widget>

          <Widget title="Harvest Transactions">
            <TransactionsList list={rewards.harvestTransactions} price={price}/>
          </Widget>
        </WidgetContainer>
      </Section>

      {Boolean(rewards.passiveTransactions.length) && 
      <Section>
        <WidgetContainer>
          <Widget title="Rewards From Old Contract">
            <p>{formatCurrency(rewards.totalPassiveRewards, "BUSD")}</p>
          </Widget>

          <Widget title="Rewards Txs From Old Contract">
            <TransactionsList list={rewards.passiveTransactions} currency="BUSD"/>
          </Widget>
        </WidgetContainer>
      </Section>}
    </HomePage>
  )
}

Home.getInitialProps = async function getInitialProps({ query }) {
  const { address } = query
  return { queryAddress: address }
}

export default Home