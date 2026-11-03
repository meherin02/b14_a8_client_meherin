import Link from "next/link";
export default function Home() {
  return (
    <section className="mx-auto max-w-3xl py-12 sm:py-20">
      <p className="mb-4 text-sm font-bold uppercase tracking-widest text-success">
        Community Events
      </p>
      <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-6xl">
        Make a little time.
        <br />
        Make a local difference.
      </h1>
      <p className="mb-8 max-w-xl text-lg leading-relaxed text-base-content/70">
        Connect with neighbors to clean shared spaces, plant trees, and support
        people in need.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="btn btn-success" href="/register">
          Create your account
        </Link>
        <Link className="btn btn-outline" href="/login">
          Log in
        </Link>
      </div>
    </section>
  );
}
