import {
   ArrowPathIcon,
   CloudArrowUpIcon,
   FingerPrintIcon,
   LockClosedIcon,
} from '@heroicons/react/24/outline'

const features = [
   {
      name: 'Push to deploy',
      description: 'Morbi viverra dui mi arcu sed. Tellus semper adipiscing.',
      icon: CloudArrowUpIcon,
   },
   {
      name: 'SSL certificates',
      description: 'Sit quis amet rutrum tellus ullamcorper ultricies libero.',
      icon: LockClosedIcon,
   },
   {
      name: 'Simple queues',
      description: 'Quisque est vel vulputate cursus. Risus proin diam nunc.',
      icon: ArrowPathIcon,
   },
   {
      name: 'Advanced security',
      description: 'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt.',
      icon: FingerPrintIcon,
   },
]

export default function Features() {
   return (
      <div className="bg-white py-16">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
               <h2 className="text-base font-semibold leading-7 text-black">
                  Deploy faster
               </h2>
               <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  Everything you need to deploy your app
               </p>
               <p className="mt-6 text-lg leading-8 text-gray-600">
                  Quis tellus eget adipiscing convallis sit sit egestas.
                  Suspendisse eget egestas a elementum pulvinar et. In mi
                  viverra elit nunc.
               </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-4xl">
               <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:max-w-none lg:grid-cols-2">
                  {features.map((feature) => (
                     <div key={feature.name} className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                           <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                              <feature.icon
                                 className="h-6 w-6 text-white"
                                 aria-hidden="true"
                              />
                           </div>
                           {feature.name}
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">
                           {feature.description}
                        </dd>
                     </div>
                  ))}
               </dl>
            </div>
         </div>
      </div>
   )
}
