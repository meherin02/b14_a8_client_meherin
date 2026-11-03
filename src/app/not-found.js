import Link from "next/link";
export default function NotFound() {
  return (
    <section className="space-y-4 py-12 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link className="btn btn-success" href="/">
        Back to home
      </Link>
    </section>
  );
}
