export function getRequestMetaFromReq(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    null;

  return {
    ipAddress: ip ? ip.split(",")[0].trim() : null,
    userAgent: req.headers.get("user-agent"),
  };
}
