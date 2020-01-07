import getInsightsAnonymousUserToken, {
  ANONYMOUS_TOKEN_COOKIE_KEY,
} from '../getInsightsAnonymousUserToken';

const DAY = 86400000; /* 1 day in ms*/
const DATE_TOMORROW = new Date(Date.now() + DAY).toUTCString();
const DATE_YESTERDAY = new Date(Date.now() - DAY).toUTCString();

const resetCookie = cookieKey => {
  document.cookie = `${cookieKey}=;expires=Thu, 01-Jan-1970 00:00:01 GMT;`;
};

describe('getInsightsAnonymousUserToken', () => {
  beforeEach(() => {
    resetCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
  });

  it('should return null when no cookies', () => {
    expect(getInsightsAnonymousUserToken()).toBe(null);
  });

  it('should return null when cookie present but expired', () => {
    document.cookie = `${ANONYMOUS_TOKEN_COOKIE_KEY}=anonymous-uuid;expires=${DATE_YESTERDAY};`;
    expect(getInsightsAnonymousUserToken()).toBe(null);
  });

  it('should return the anonymous uuid when cookie present and valid', () => {
    document.cookie = `${ANONYMOUS_TOKEN_COOKIE_KEY}=anonymous-uuid;expires=${DATE_TOMORROW};`;
    expect(getInsightsAnonymousUserToken()).toBe('anonymous-uuid');
  });

  it("should not care about other cookies and fail if they're malformed", () => {
    document.cookie = `${ANONYMOUS_TOKEN_COOKIE_KEY}=anonymous-uuid;expires=${DATE_TOMORROW};`;
    document.cookie = `BAD_COOKIE=val%ue;expires=${DATE_TOMORROW};path=/`;
    expect(getInsightsAnonymousUserToken()).toBe('anonymous-uuid');
  });
});