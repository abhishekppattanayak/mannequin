

export default function Hero ({scrollRef}) {
  return (
    <main ref={scrollRef} className="h-screen text-black dark:text-white grid place-content-center p-4 text-wrap border border-amber-300 ">
      <h1 className="text-5xl" >Mannequin</h1>
      <h2 className="text-2xl" >Your very own personalized AI mock interviewer.</h2>
    </main>
  )
}