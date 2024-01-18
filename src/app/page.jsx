import DahsedLine from "@/components/DahsedLine"
import ExploreMenu from "@/components/ExploreMenu"
import Hero from "@/components/Hero"
import InfoCards from "@/components/InfoCards"

const Home = () => {
  return (
    <main className='relative z-0'>
      {/* Hero section */}
      <Hero/>

      {/* info cards */}
      <section className="py-20">
        <InfoCards/>
      </section>

      {/* Explore menu */}
      <section className="relative my-4">
        <DahsedLine style={"w-40 border-black  border-dashed border-b dark:border-white absolute top-0 -left-10"} />
        <DahsedLine  style="h-40 border-black  border-dashed border-l dark:border-white absolute -left-2 -top-10" />
        <ExploreMenu/>
        <DahsedLine  style="w-40 border-black  border-dashed border-b dark:border-white absolute bottom-0 -right-6" />
          <DahsedLine  style="h-40 border-black  border-dashed border-r dark:border-white absolute right-4 -bottom-10 " />
      </section>
    </main>
  )
}

export default Home