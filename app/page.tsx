export default function Home() {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden bg-underwater text-white">
      <div aria-hidden className="absolute inset-0 caustics" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-32 sm:px-6">
        <p className="font-display text-aqua-light">Hooda Enterprise</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold sm:text-6xl">
          Healthy ponds, better harvests.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-foam/80">
          Aquaculture products for fish and shrimp farmers, delivered wholesale.
        </p>
      </div>
    </main>
  );
}
