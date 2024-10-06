import React from 'react'
import Image from 'next/image'

interface Award {
  id: number
  title: string
  image: string
}

const awards: Award[] = [
  {
    id: 1,
    title: "Best NSS Unit Award",
    image: "/placeholder.svg?height=300&width=300&text=Best+NSS+Unit",
  },
  {
    id: 2,
    title: "Outstanding Community Service",
    image: "/placeholder.svg?height=300&width=300&text=Community+Service",
  },
  {
    id: 3,
    title: "Environmental Conservation Award",
    image: "/placeholder.svg?height=300&width=300&text=Environmental+Award",
  },
  {
    id: 4,
    title: "Youth Leadership Excellence",
    image: "/placeholder.svg?height=300&width=300&text=Youth+Leadership",
  },
]

export default function OverlappingGoldFramesWithBackground() {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen py-16 px-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-12">NSS Awards Gallery</h1>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center">
            {awards.map((award, index) => (
              <div
                key={award.id}
                className="relative w-64 h-64 m-8 transform hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `rotate(${index % 2 === 0 ? '5deg' : '-5deg'})`,
                  zIndex: awards.length - index,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg transform rotate-3 scale-105 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-yellow-300 via-yellow-400 to-yellow-500 rounded-lg transform -rotate-3 scale-105 shadow-xl"></div>
                <div className="absolute inset-2 bg-black rounded-lg overflow-hidden">
                  <Image
                    src={award.image}
                    alt={award.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-yellow-300 text-center text-lg font-semibold px-4">{award.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


// import React from 'react'
// import Image from 'next/image'

// interface Award {
//   id: number
//   title: string
//   image: string
// }

// const awards: Award[] = [
//   {
//     id: 1,
//     title: "Best NSS Unit Award",
//     image: "/placeholder.svg?height=300&width=300&text=Best+NSS+Unit"
//   },
//   {
//     id: 2,
//     title: "Outstanding Community Service",
//     image: "/placeholder.svg?height=300&width=300&text=Community+Service"
//   },
//   {
//     id: 3,
//     title: "Environmental Conservation Award",
//     image: "/placeholder.svg?height=300&width=300&text=Environmental+Award"
//   },
//   {
//     id: 4,
//     title: "Youth Leadership Excellence",
//     image: "/placeholder.svg?height=300&width=300&text=Youth+Leadership"
//   },
//   {
//     id: 5,
//     title: "Best NSS Programme Officer",
//     image: "/placeholder.svg?height=300&width=300&text=Best+Programme+Officer"
//   },
//   {
//     id: 6,
//     title: "National Integration Camp Award",
//     image: "/placeholder.svg?height=300&width=300&text=National+Integration"
//   }
// ]

// export default function NSSAwardsGallery() {
//   return (
//     <div className="bg-gradient-to-r from-primary-50 to-primary-100 py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-primary-900 text-center mb-12">
//           NSS Awards Gallery
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {awards.map((award) => (
//             <div key={award.id} className="flex flex-col items-center">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg transform rotate-1 scale-105"></div>
//                 <div className="relative bg-white p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
//                   <Image
//                     src={award.image}
//                     alt={award.title}
//                     width={300}
//                     height={300}
//                     className="rounded-md"
//                   />
//                 </div>
//               </div>
//               <h3 className="mt-4 text-xl font-semibold text-primary-800 text-center">
//                 {award.title}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }