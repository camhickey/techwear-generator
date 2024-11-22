import { useNavigate } from "react-router-dom"

export default function Index() {
  const navigate = useNavigate()
  return (
    <div className="bg-black h-full w-full">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl px-8 md:px-12 mx-auto py-12 lg:py-24 space-y-24 flex flex-col justify-center lg:h-screen">
            <div className="grid grid-cols-1 gap-2 list-none md:grid-cols-4 max-w-5xl mx-auto" role="list">
                <FashionCard title='Urban' description={`Classic and consistent. It's a reliable middle-ground.`} background="bg-[url(/urbanBG.webp)]" onExplore={() => navigate('/style')}/>
                <FashionCard title='Greyman' description={`Less is more.`} background="bg-[url(/greymanBG.webp)]" onExplore={() => navigate('/style')}/>
                <FashionCard title='Cyberpunk' description={`Embrace eccentricity. Then crank it to 11.`} background="bg-[url(/cyberpunkBG.webp)]" onExplore={() => navigate('/style')}/>
                <FashionCard title='Outdoors' description={`Who says you can't flex on nature?`} background="bg-[url(/outdoorsBG.webp)]" onExplore={() => navigate('/style')}/>
            </div>
        </div>
    </div>
  )
}

type FashionCardProps = {
  title: string,
  description: string,
  background: string,
  onExplore: () => void
}

function FashionCard({ title, description, background, onExplore }: FashionCardProps) {
  return (
  <article className={`bg-cover bg-no-repeat bg-center h-150 relative group ${background}`}>
    <div className="bg-black relative h-full group-hover:bg-opacity-0 h-150 flex flex-wrap flex-col pt-[30rem] hover:bg-opacity-75 transform duration-300">
      <div className="bg-black p-8 h-full justify-end flex flex-col">
        <h1 className="font-light group-hover:font-bold text-center text-white mt-2 text-xl mb-5 transform translate-y-20 uppercase hover:cursor-default group-hover:translate-y-0 duration-300 group-hover:text-orange-500">{title}</h1>
        <p className="basis-full hover:cursor-default opacity-0 text-neutral-400 text-sm group-hover:opacity-80 transform duration-500 ">{description}</p>
        <button onClick={onExplore} className="mt-5 p-2 w-full text-white border-white border-solid border-2 opacity-0 group-hover:opacity-100 hover:text-orange-500 hover:border-orange-500 transform duration-500">EXPLORE</button>
      </div>
    </div>
  </article>
  )
}