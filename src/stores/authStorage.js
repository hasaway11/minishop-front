const STORAGE_KEY = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USERNAME: 'username',
  ROLE: 'role',
};

// 1. 앱 실행 시 모든 인증 정보 불러오기
export const loadAuthData = () => {
  const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
  const username = localStorage.getItem(STORAGE_KEY.USERNAME);
  const role = localStorage.getItem(STORAGE_KEY.ROLE);

  if (accessToken && refreshToken && username && role) 
    return { accessToken, refreshToken, username, role };
  return null;
};

// 2. 로그인 시 모든 인증 정보 저장
export const saveAuthData = ({ accessToken, refreshToken, username, role }) => {
  localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(STORAGE_KEY.USERNAME, username);
  localStorage.setItem(STORAGE_KEY.ROLE, role);
};

// 3. refreshToken만 fetch(accessToken 갱신용)
export const getRefreshToken = ()=>localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);

// 4. Token 갱신
export const updateAccessToken = (accessToken)=>localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);

// 5. 전체 인증 정보 삭제 (로그아웃 시)
export const clearAuthData = ()=>Object.values(STORAGE_KEY).forEach((key)=>localStorage.removeItem(key));

