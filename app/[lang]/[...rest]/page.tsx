import { notFound } from "next/navigation";

/** Any unmatched URL renders the localized 404 inside the site layout. */
export default function CatchAll() {
  notFound();
}
