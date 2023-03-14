export default function Navbar() {
    return (
        <div className="h-full w-[18vw] flex flex-col justify-between items-center text-white bg-gray-900 px-24 py-8 fixed">
            <h1 className="text-5xl text-white font-bold italic">soshal<span className="text-purple-600">.</span></h1>
            <div className="flex justify-between items-center gap-4">
                <div className="bg-white w-16 h-16 rounded-full"></div>
                <h1 className="text-2xl">@test</h1>
            </div>
        </div>
    )
}