'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="grid place-items-center p-8">
        <div className="text-center">
          <h2>Something went wrong!</h2>
          <button
            className='mt-4 px-4 py-2 bg-[var(--fc-brand-700)] text-white rounded-md hover:bg-[var(--fc-brand-700)] focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:ring-opacity-50'
            onClick={() => window.location.reload()}>Try again</button>
        </div>
      </body>
    </html>
  )
}