/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
// import React from 'react';
import { signInWithCustomToken /* , signOut */ } from 'firebase/auth';
import { firebaseAuth } from '@/const/firebaseConfig';
import { eventParams, generateBatchName } from './eventLog';
import { storage } from './storage';
import {
  setUserPoint,
  setLeaderboard,
  isLeaderboardLoading,
  isUserPointLoading,
  defaultUserPoint,
  isReferralListLoading,
  setReferralList
} from '../stores/airdrop';

const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
const authUrl = process.env.NEXT_PUBLIC_AUTHENTICATION_API_URL;
const leaderboardUrl = process.env.NEXT_PUBLIC_LEADERBOARD_USER_RANKING;

export const apiConnection = {
  getDashboardContent: async function getDashboardContent(address: string, timestamp = Math.floor(Date.now() / 1000)) {
    const dashboardApiUrl = `${apiUrl}/allPositions?trader=${address}&timestamp=${timestamp}`;
    let returnData = {};
    try {
      await fetch(dashboardApiUrl)
        .then(res => res.json())
        .then(result => {
          returnData = result.data;
        });
      return Promise.resolve(returnData);
    } catch (error) {
      return Promise.reject();
    }
  },
  getWalletChartContent: async function getWalletChartContent(address: string, timeIndex: number) {
    let timeRelatedKey = 'dailyAccountValueGraph';
    switch (timeIndex) {
      case 0:
        timeRelatedKey = 'dailyAccountValueGraph';
        break;
      case 1:
        timeRelatedKey = 'weeklyAccountValueGraph';
        break;
      case 2:
        timeRelatedKey = 'monthlyAccountValueGraph';
        break;
      case 3:
        timeRelatedKey = 'allTimeAccountValueGraph';
        break;
      default:
        timeRelatedKey = 'dailyAccountValueGraph';
    }
    const walletChartUrl = `${apiUrl}/${timeRelatedKey}?trader=${address}`;
    let returnData = {};
    try {
      await fetch(walletChartUrl)
        .then(res => res.json())
        .then(result => {
          returnData = result.data;
        });
      return Promise.resolve(returnData);
    } catch (error) {
      return Promise.reject();
    }
  },
  postUserContent: async function postUserContent(address: string) {
    const postUserUrl = `${authUrl}/users`;
    // const postData = { userAddress: address };
    // try {
    //   const callPost = await fetch(postUserUrl, {
    //     method: 'POST',
    //     body: JSON.stringify(postData),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   const returnData = await callPost.json();
    //   return Promise.resolve(returnData);
    // } catch (error) {
    //   walletProvider.disconnectWallet();
    //   return Promise.reject(error);
    // }
  },
  postAuthUser: async function postAuthUser(nonce: any) {
    const postAuthUserUrl = `${authUrl}/users/auth`;
    // if (!walletProvider || !walletProvider.provider) return Promise.reject();
    // const providerSigner = walletProvider.provider.getSigner(walletProvider.holderAddress);
    // const messageHex = `\x19Ethereum Signed Message:\nHi there! Welcome to Tribe3!\n\nClick to log in to access your very own profile on Tribe3. Please note that this will not execute any blockchain transaction nor it will cost you any gas fee.\n\nYour Nonce: ${nonce}`;
    // const signedMessage = await providerSigner.signMessage(messageHex);
    // const postData = { publicAddress: walletProvider.holderAddress, signature: signedMessage };
    // try {
    //   const callPost = await fetch(postAuthUserUrl, {
    //     method: 'POST',
    //     body: JSON.stringify(postData),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   const returnData = await callPost.json();
    //   return Promise.resolve(returnData);
    // } catch (error) {
    //   walletProvider.disconnectWallet();
    //   return Promise.reject(error);
    // }
  },
  followUser: async function followUser(followerAddress: any, firebaseToken: any, userAddress: string) {
    const url = `${authUrl}/users/follow`;
    const headers = { 'auth-token': firebaseToken, 'Content-Type': 'application/json' };
    const body = { userAddress, followerAddress };
    try {
      const call = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const result = await call.json();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  unfollowUser: async function unfollowUser(followerAddress: string, firebaseToken: string, userAddress: string) {
    const url = `${authUrl}/users/unfollow`;
    const headers = { 'auth-token': firebaseToken, 'Content-Type': 'application/json' };
    const body = { userAddress, followerAddress };
    try {
      const call = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const result = await call.json();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getUserInfo: async function getUserInfo(address: string) {
    const url = `${authUrl}/users?publicAddress=${address}`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  updateUserInfo: async function updateUserInfo(username: string, about: string, firebaseToken: string, userAddress: string) {
    const url = `${authUrl}/users/update`;
    const headers = { 'auth-token': firebaseToken, 'Content-Type': 'application/json' };
    const body = { userAddress, username, about };
    try {
      const call = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      });
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getUserFollowers: async function getUserFollowers(targetUser: any, user: any) {
    const url = `${authUrl}/followers/list`;
    const body = { user, targetUser, pageNo: 1, pageSize: 30 };
    const headers = { 'Content-Type': 'application/json' };
    try {
      const call = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      });
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getUserFollowings: async function getUserFollowings(targetUser: any, user: any) {
    const url = `${authUrl}/following/list`;
    const body = { user, targetUser, pageNo: 1, pageSize: 30 };
    const headers = { 'Content-Type': 'application/json' };
    try {
      const call = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      });
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getUserLeaderboard: async function getUserLeaderboard(address: string) {
    const url = `${leaderboardUrl}/${address}/3`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  searchUser: async function searchUser(query: string, holderAddress: string) {
    const url = `${authUrl}/users/search`;
    const body = { keyword: query, userAddress: holderAddress, pageSize: 30, pageNo: 1 };
    try {
      const callPost = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await callPost.json();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getTargetUserInfo: async function getTargetUserInfo(targetUser: any, user: any) {
    const url = `${authUrl}/users/info`;
    const body = { targetUser, user };
    try {
      const callPost = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await callPost.json();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  finishTrade: async function finishTrade(txHash: any, firebaseToken: string, userAddress: string) {
    const url = `${authUrl}/users/trade/completed`;
    const headers = { 'auth-token': firebaseToken, 'Content-Type': 'application/json' };
    const body = { txHash, userAddress };
    try {
      const callPost = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const result = await callPost.json();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  useReferralCode: async function useReferralCode(code: any, firebaseToken: any, userAddress: string) {
    const url = `${authUrl}/users/referral/code`;
    const body = { code, userAddress };
    const headers = { 'auth-token': firebaseToken, 'Content-Type': 'application/json' };
    try {
      const call = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      });
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getIPInformation: async function getIPInformation() {
    // const url = 'https://api.ipregistry.co/?key=tryout';
  },
  getPointHistoryList: async function getPointHistoryList(address: string) {
    const url = `${authUrl}/achievement/history?userAddress=${address}&pageSize=30&pageNo=1`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  postUserEvent: async function postUserEvent(eventName: string, fields: any, wallet: string, deviceType = 'desktop') {
    const url = `${authUrl}/users/event`;
    const defaultParams = await eventParams.get();
    const params = {
      ...defaultParams,
      ...fields,
      wallet: wallet.substring(2),
      time_visit: new Date().toString()
    };

    if (params?.device) {
      params.device.type = deviceType;
    }

    const body = { name: eventName, params };
    await storage.addEventLogs(body);
    const eventLogData = storage.eventLogs;

    if (eventLogData?.length > 9) {
      if (!storage.eventLogsLoading && [10, 11].includes(eventLogData?.length)) {
        try {
          storage.setEventLogsLoading(true);
          const batchName = await generateBatchName(eventLogData);
          const callPost = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ name: batchName, params: eventLogData }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const result = await callPost.json();
          storage.setEventLogsLoading(false);
          if (storage.eventLogs.length === 10) storage.setEventLogs([]);
          return Promise.resolve(result);
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        eventLogData.splice(0, 10);
        storage.setEventLogs(eventLogData);
      }
    }

    return Promise.resolve();
  },
  checkUserIsWhitelisted: async function checkUserIsWhitelisted(address: string) {
    const url = `${authUrl}/users/whitelist/${address}`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  checkUserHasPartialClose: async function checkUserHasPartialClose(address: string) {
    const url = `${authUrl}/users/hasPartialClosed?userAddress=${address}`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  validateUserTradingState: async function validateUserTradingState(firebaseToken: string, userAddress: string) {
    const url = `${authUrl}/users/trade/validateState`;
    const body = { userAddress };
    const headers = { 'auth-token': firebaseToken, 'Content-Type': 'application/json' };
    try {
      const call = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      });
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getUserFundingPaymentHistoryWithAmm: async function getUserFundingPaymentHistoryWithAmm(userAddress: any, ammAddress: any) {
    const url = `${authUrl}/fundingPaymentHistory?trader=${userAddress}&amm=${ammAddress}`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getUserTradingHistory: async function getUserTradingHistory(userAddress: string, ammAddress = '') {
    const url = `${authUrl}/tradeHistory?trader=${userAddress}${!ammAddress ? '' : `&amm=${ammAddress}`}`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getUserPoint: async function getUserPoint(userAddress: string) {
    const url = `${authUrl}/points/${userAddress}?show=tradeVol,referral,og,converge`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      const { data } = result;
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  getUserPointLite: async function getUserPointLite(userAddress: string) {
    const url = `${authUrl}/points/${userAddress}?show=tradeVol,referral,og,converge`;
    let defaultData = { total: 0, rank: 0 };
    try {
      const call = await fetch(url);
      const result = await call.json();
      const { data } = result;

      if (data?.total) {
        defaultData = data;
      }

      return Promise.resolve(defaultData);
    } catch (err) {
      // console.log({ err });
      return Promise.reject(defaultData);
    }
  },
  getLeaderboard: async function getLeaderboard() {
    const url = `${authUrl}/points/rank?show=tradeVol,referral,og,converge&pageSize=250`;
    try {
      isLeaderboardLoading.set(true);
      const call = await fetch(url);
      const result = await call.json();
      const { data } = result;
      setLeaderboard(data);
      isLeaderboardLoading.set(false);
      return Promise.resolve(data);
    } catch (err) {
      isLeaderboardLoading.set(false);
      return Promise.reject(err);
    }
  },
  getUsernameFromAddress: async function getUsernameFromAddress(userAddressList: any) {
    const url = `${authUrl}/users/username`;
    const body = { userAddressList };
    const headers = { 'Content-Type': 'application/json' };
    try {
      const call = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      });
      const result = await call.json();
      return Promise.resolve(result.data);
    } catch (err) {
      console.log({ err });
      return Promise.reject(err);
    }
  },
  getReferralList: async function getReferralList(userAddress: string) {
    const url = `${authUrl}/points/referral/reward/detail/${userAddress}`;
    try {
      isReferralListLoading.set(true);
      const call = await fetch(url);
      const result = await call.json();
      const { data } = result;
      setReferralList(data);
      isReferralListLoading.set(false);
      return Promise.resolve(data);
    } catch (err) {
      isReferralListLoading.set(false);
      return Promise.reject(err);
    }
  },
  getUsernameFromReferral: async function getUsernameFromReferral(referralCode: any) {
    const url = `${authUrl}/users/referral/code/userinfo?code=${referralCode}`;
    try {
      const call = await fetch(url);
      const result = await call.json();
      const { data } = result;
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
