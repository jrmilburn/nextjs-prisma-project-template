export const metadata = { title: "Welcome" };

export default function Landing() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Build faster with&nbsp;Starter</h1>
      <p className="max-w-lg text-center text-gray-600">
        Opinionated Next.js boilerplate with auth, Prisma and Tailwind pre-wired.
      </p>
      <a
        href="/register"
        className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Get started
      </a>
    </section>
  );
}
