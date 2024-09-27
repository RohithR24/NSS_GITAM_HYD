export default function Animation() {
  const imageIds = [
    "1500462918059-b1a0cb512f1d",
    "1531581147762-5961e6e2e6b1",
    "1626204327506-0d3ee11d7752",
    "1549068106-b024baf5062d",
  ];

  return (
    <div className="grid min-h-screen place-items-center">
      <ul className="flex w-full max-w-6xl gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="group relative h-[500px] w-full overflow-hidden rounded-2xl bg-rose-300"
          >
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={`https://images.unsplash.com/photo-${imageIds[index]}?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlicmFudHxlbnwwfHwwfHx8MA%3D%3D`}
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 from-30% p-4">
              <h2 className="text-2xl font-medium text-white">
                The card title is here.
              </h2>
              {/* <p className="mt-2 h-0 overflow-hidden text-white/70 transition-all group-hover:h-[100px]">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
								quia ipsa eius.
							</p> */}
            </div>

            <div className="opacity-0 hover:opacity-100 duration-1000 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              quia ipsa eius
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
