import HomeNavbar from "../components/HomeNavbar.jsx";

const Homepage = () => {
    return (
        <div className={`min-h-screen flex flex-col gap-y-4`}>
            <HomeNavbar/>

            <div className='flex flex-col gap-y-2 m-auto '>
                <h1 className='text-3xl font-bold text-sky-500 text-center'>
                    Welcome To <span className='underline'>Jiggi</span>
                </h1>
                <h2 className='text-neutral-400'>
                    A modern and performant project management app
                </h2>
            </div>
        </div>
    )
}
export default Homepage
