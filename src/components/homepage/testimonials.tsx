export default function Testimonials() {
   return (
      <section className="relative isolate overflow-hidden bg-white px-6 py-16">
         <div className="absolute inset-0 -z-10 opacity-20" />
         <div className="mx-auto max-w-2xl lg:max-w-4xl border rounded-2xl py-8 px-4">
            <figure className="mt-10">
               <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                  <p>
                     “Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Quasi expedita voluptas culpa sapiente alias molestias, in
                     laborum sed rerum et corporis.”
                  </p>
               </blockquote>
               <figcaption className="mt-10 flex flex-col items-center">
                  <img
                     className="mx-auto h-10 w-10 rounded-full"
                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                     alt="User avatar"
                     data-testid="@testimonials/photo"
                  />
                  <div className="mt-4 flex items-center justify-center space-x-2">
                     <div className="font-semibold text-gray-900">
                        Julia Roberts
                     </div>
                     <svg
                        viewBox="0 0 2 2"
                        width={3}
                        height={3}
                        aria-hidden="true"
                        className="fill-gray-900"
                     >
                        <circle cx={1} cy={1} r={1} />
                     </svg>
                     <div className="text-gray-600">CEO of Workcation</div>
                  </div>
               </figcaption>
            </figure>
         </div>
      </section>
   )
}
