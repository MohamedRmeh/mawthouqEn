import CheckYourEmailPage from "./CheckYourEmailPage";

export default async function Page({ searchParams }) {
  // انتظر searchParams لأنه قد يكون Promise
  const params = await searchParams;

  return <CheckYourEmailPage searchParams={params} />;
}
