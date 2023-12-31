import { atom } from 'nanostores';

export interface LeaderboardItem {
  eligible: boolean;
  rank: string;
  userAddress: string;
  username: string;
  netConvergenceVol?: string;
  pnl?: string;
}

// leaderboard
export const $isCompetitionLeaderboardLoading = atom<boolean>(false);
export const $mainLeaderboard = atom<LeaderboardItem[]>([]);
export const $firstLeaderboard = atom<LeaderboardItem[]>([]);
export const $secondLeaderboard = atom<LeaderboardItem[]>([]);
export const $thirdLeaderboard = atom<LeaderboardItem[]>([]);
export const $asCompetitionLeaderboardUpdateTrigger = atom(false);

// current user based on leaderboard
export const $mlCurrentUser = atom<any>(null);
export const $flCurrentUser = atom<any>(null);
export const $slCurrentUser = atom<any>(null);
export const $tlCurrentUser = atom<any>(null);

// revamp
export const $activeDropdown = atom<number>(0);
export const $activeTab = atom<number>(0);

export const $isShowMobileRules = atom(false);
export const $isShowMobileMyTeam = atom(false);
export const $isShowMobileMyReferrerTeam = atom(false);

$isShowMobileRules.listen(val => {
  if (val) {
    document.body.style.setProperty('overflow-y', 'hidden');
  } else {
    document.body.style.removeProperty('overflow-y');
  }
});

$isShowMobileMyTeam.listen(val => {
  if (val) {
    document.body.style.setProperty('overflow-y', 'hidden');
  } else {
    document.body.style.removeProperty('overflow-y');
  }
});

$isShowMobileMyReferrerTeam.listen(val => {
  if (val) {
    document.body.style.setProperty('overflow-y', 'hidden');
  } else {
    document.body.style.removeProperty('overflow-y');
  }
});

export const $topVolActiveWeek = atom(1); // index base 0

export const $isShowContributionModal = atom(false);
