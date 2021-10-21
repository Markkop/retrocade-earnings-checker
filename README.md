# 🕹️ Retrocade Earnings Checker

[![https://img.shields.io/badge/made%20with-nextjs-blue](https://img.shields.io/badge/made%20with-nextjs-blue)](https://reactjs.org/)
[![https://img.shields.io/badge/made%20with-reactjs-blue](https://img.shields.io/badge/made%20with-reactjs-blue)](https://nextjs.org/)
[![https://img.shields.io/badge/made%20with-apollo-blue](https://img.shields.io/badge/made%20with-apollographql-blue)](https://www.apollographql.com/)

A simple web application to check how much BUSD you have earned so far by holding RC tokens.

[Retrocade](https://www.retrocadep2e.com/) is [Play-2-Earn](https://playtoearn.net/blockchaingame/retrocade) Arcade Plataform on [Binance Smart Chain](https://www.binance.org/en/smartChain).  
By holding RC tokens, you can play old school games, take part in competitions and earn BUSD passively.

## Demo

Web App: https://retrocade-earnings-checker.vercel.app

![Retrocade Earnings Checker](https://user-images.githubusercontent.com/16388408/138349218-4c25a8dd-55f2-4d5e-98dc-1804c3a96de3.png)

## How it works

The application makes a GraphQL query to [BitQuery](https://bitquery.io) to retrieve the transaction data on BSC related to Retrocade Rewards deployer and the provided eth address.  