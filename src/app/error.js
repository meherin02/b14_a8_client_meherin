"use client";
export default function ErrorPage({ reset }) {
  return (
    <section role="alert" className="py-16 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="my-5">Please try loading this page again.</p>
      <button onClick={reset} className="btn btn-success">
        Try again
      </button>
    </section>
  );
}
