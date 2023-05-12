import Feed from "@components/Feed"

const Home = () => {
  return (
    <>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">AI-Powered</span>
        </h1>
        <p className="desc text-center">
          Next.js recently became the official React framework as outlined in React docs. In this course, you will learn the most important Next.js concepts and how they fit into the React ecosystem
        </p>
        <Feed />
      </section>

    </>
  )
}

export default Home