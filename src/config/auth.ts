export default {
    secret_token: process.env.ACCESS_TOKEN_SECRET,
    expires_in: "12h", // "60s", "10m", "2h", "1d", "7d", "14d", "30d", "90d", "365d", "3650d
    secret_refresh_token: process.env.REFRESH_TOKEN_SECRET,
    expires_in_refresh_token: "7d",
    expires_refresh_token_days: 30,
}