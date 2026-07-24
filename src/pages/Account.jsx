export default function Account() {
  return (
    <div className="container-page py-14 md:py-20 max-w-md">
      <span className="eyebrow mb-3 block">Akun</span>
      <h1 className="font-display text-2xl md:text-3xl mb-8">Masuk ke Akun Kamu</h1>
      <form className="space-y-4">
        <input placeholder="Email" type="email" className="w-full border border-line px-4 py-3 text-sm outline-none focus-visible:border-ink" />
        <input placeholder="Password" type="password" className="w-full border border-line px-4 py-3 text-sm outline-none focus-visible:border-ink" />
        <button type="submit" className="btn-primary w-full">Masuk</button>
      </form>
      <p className="mt-5 text-sm text-ink/55">
        Belum punya akun? <span className="text-mauve-600 underline underline-offset-4 cursor-pointer">Daftar</span>
      </p>
    </div>
  )
}
