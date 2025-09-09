import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en"],
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);

  response.headers.set("x-current-path", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|css|favicon.ico|sitemap.xml|robots.txt|.*\\.pdf$).*)",
    "/en/:path*",
  ],
};
