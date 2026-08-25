const ALLOWED_EXTERNAL_REDIRECT_ORIGINS = (
  process.env.ALLOWED_EXTERNAL_REDIRECT_ORIGINS ?? ""
)
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

function isAllowedExternalRedirect(url: string | null | undefined): boolean {
  if (!url) return false;

  try {
    const { origin } = new URL(url);
    return ALLOWED_EXTERNAL_REDIRECT_ORIGINS.includes(origin);
  } catch {
    return false;
  }
}

export { isAllowedExternalRedirect };
