export class TokenRefreshManager {
  private refreshInterval: NodeJS.Timeout | null = null;
  private readonly REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes

  start() {
    this.refreshInterval = setInterval(async () => {
      const token = localStorage.getItem('access_token');
      if (token && this.isTokenExpiringSoon(token)) {
        try {
          await this.refreshToken();
        } catch (error) {
          console.error('Auto refresh failed:', error);
        }
      }
    }, this.REFRESH_INTERVAL);
  }

  stop() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  private isTokenExpiringSoon(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      return exp - now < fiveMinutes;
    } catch {
      return true;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch('/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }
}

export const tokenRefreshManager = new TokenRefreshManager();
