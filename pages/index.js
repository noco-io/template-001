import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon, ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon, CheckIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'About', href: '#about' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
]

// Updated Feature Data
const features = [
  {
    name: 'Push to deploy',
    description:
      'Commodo nec sagittis tortor mauris sed. Turpis tortor quis scelerisque diam id accumsan nullam tempus. Pulvinar etiam lacus volutpat eu. Phasellus praesent ligula sit faucibus.',
    href: '#',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
    href: '#',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Pellentesque sit elit congue ante nec amet. Dolor aenean curabitur viverra suspendisse iaculis eget. Nec mollis placerat ultricies euismod ut condimentum.',
    href: '#',
    icon: ArrowPathIcon,
  },
]

// Placeholder FAQ Data
const faqs = [
  {
    id: 1,
    question: "Is this template *really* going to help me achieve world domination?",
    answer:
      "Probably not. But it'll definitely help you build a slick SaaS app faster. World domination requires a bit more... ambition. And maybe a secret lair.",
  },
  {
    id: 2,
    question: "What if I get stuck? Is there, like, support?",
    answer:
      "You're a developer, right? Check the docs, Google it, ask your rubber duck. If all else fails, maybe check the GitHub repo issues. We might glance at them. Occasionally.",
  },
  {
    id: 3,
    question: "Can I customize this? Like, REALLY customize it?",
    answer:
      "Absolutely! It's Tailwind and Next.js. Go wild. Break things. That's how you learn. Just maybe keep a backup before you try implementing that 'revolutionary' new UI paradigm.",
  },
  {
    id: 4,
    question: "Is it *really* sexy?",
    answer:
      "We think so. Beauty is subjective, but clean code, smooth animations, and a modern stack? That's pretty hot in our book. Your users will probably agree. Or not notice. Either way, it looks good.",
  },
]

// Stats Data
const stats = [
  { id: 1, name: 'Projects Launched', value: '1,200+' }, // Made slightly more generic
  { id: 2, name: 'Average Time Saved (hrs/project)', value: '40+' },
  { id: 3, name: 'Uptime Guarantee', value: '99.9%' },
  { id: 4, name: 'Happy Developers', value: 'Over 9,000!' }, // Fun stat
]

// Placeholder Footer Navigation
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Docs', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
}

// Placeholder Testimonial Data
const featuredTestimonial = {
  body: 'Using this template was like hitting the warp drive button on our SaaS development. Suddenly, we were shipping features instead of fighting CSS. Highly recommend!',
  author: {
    name: 'Alex WarpSpeed',
    handle: 'alexwarp',
    imageUrl:
      'https://i.pravatar.cc/150?img=3', // Placeholder image
    logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg', // Example logo
  },
}
const testimonials = [
  [
    [
      {
        body: 'Finally, a template that doesn\'t look like it was designed in 1999. Sleek, modern, and surprisingly easy to customize.',
        author: {
          name: 'Sarah Modernista',
          handle: 'sarahmodern',
          imageUrl:
            'https://i.pravatar.cc/150?img=1',
        },
      },
      // More testimonials...
    ],
    [
      {
        body: 'The animations are *chef\'s kiss*. Added that extra layer of polish that impressed our early users.',
        author: {
          name: 'Mike Motion',
          handle: 'mikemotion',
          imageUrl:
            'https://i.pravatar.cc/150?img=4',
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        body: 'Saved us weeks of setup. We could focus on our core logic instead of boilerplate.',
        author: {
          name: 'Dev Focused',
          handle: 'devfocus',
          imageUrl:
            'https://i.pravatar.cc/150?img=5',
        },
      },
      // More testimonials...
    ],
    [
      {
        body: 'My cat could probably use this template to launch a SaaS. It\'s that intuitive. (Okay, maybe not, but it\'s close!)',
        author: {
          name: 'Casey CatDev',
          handle: 'caseycat',
          imageUrl:
            'https://i.pravatar.cc/150?img=6',
        },
      },
      // More testimonials...
    ],
  ],
]

// Pricing Tiers Data
const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$29',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
    featured: true,
  },
]

// Helper function (add if not present)
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    // Initial check in case page loads scrolled
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white">
      {/* Header - Updated for sticky scroll effect */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Noco</span>
              <motion.img
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                alt="Noco"
                src="https://noco.io/icon.png"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-100'}`}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors ${isScrolled ? 'text-gray-900 hover:text-primary-600' : 'text-white hover:text-primary-100'}`}>
                {item.name}
              </a>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className={`text-sm font-semibold leading-6 transition-colors ${isScrolled ? 'text-gray-900 hover:text-primary-600' : 'text-white hover:text-primary-100'}`}>
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
        </nav>
        <AnimatePresence>
          {mobileMenuOpen && (
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/30" />
              <DialogPanel
                as={motion.div}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Noco</span>
                    <img
                      alt="Noco"
                      src="https://noco.io/icon.png"
                      className="h-8 w-auto"
                    />
                  </a>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="py-6">
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </a>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </Dialog>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Existing Hero section - Updated Background */}
        <div className="relative isolate overflow-hidden pt-14">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1742241107816-349e7f7c0f50?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 -z-10 bg-black/60"></div>

          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <div className="flex">
                <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-300 ring-1 ring-gray-100/10 hover:ring-gray-100/20">
                  <span className="font-semibold text-white">What's new</span>
                  <span className="h-4 w-px bg-gray-100/10" aria-hidden="true" />
                  <a href="#" className="flex items-center gap-x-1">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Just shipped v1.0!
                    <ChevronRightIcon className="-mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <h1 className="mt-10 max-w-lg text-5xl font-bold tracking-tight text-white sm:text-7xl text-balance">
                Build Your Next World-Dominating SaaS, Faster Than Ever.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 text-pretty">
                Stop reinventing the wheel and start shipping features your users actually want. This template handles the boring stuff, so you can focus on the fun (and profitable) parts. Probably.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#features"
                  className="rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                >
                  Start Building Now
                </a>
                <a href="#about" className="text-sm font-semibold leading-6 text-white">
                  Learn More <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End Hero Section */}

        {/* Insert NEW Feature Section Here */}
        <div id="features" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl lg:text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-base font-semibold leading-7 text-primary-600">Deploy faster</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                Everything you need to deploy your app
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 text-pretty">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
              </p>
            </motion.div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }} // Stagger delay
                  >
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon aria-hidden="true" className="size-5 flex-none text-primary-600" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                      <p className="mt-6">
                        <a href={feature.href} className="text-sm font-semibold leading-6 text-primary-600 hover:text-primary-500">
                          Learn more <span aria-hidden="true">→</span>
                        </a>
                      </p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        {/* End Feature Section */}

        {/* Testimonial Section - NEW Subtle Background */}
        <div id="testimonials" className="relative isolate bg-gradient-to-b from-sky-100/50 to-white pb-32 pt-24 sm:pt-32">
          {/* REMOVED large background gradient sweep */}

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Content */}
            <motion.div
              className="mx-auto max-w-2xl sm:text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-base font-semibold leading-7 text-primary-600">Testimonials</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:text-balance">
                Don't Just Take Our Word For It
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 text-pretty">
                Thousands of developers (probably) have used this template to launch their world-changing (or at least functional) SaaS apps faster.
              </p>
            </motion.div>

            {/* Masonry Grid */}
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
              {/* Featured Testimonial */}
              <motion.figure
                className="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <blockquote className="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-900">
                  <p>{`"${featuredTestimonial.body}"`}</p>
                </blockquote>
                <figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
                  <img
                    alt=""
                    src={featuredTestimonial.author.imageUrl}
                    className="size-10 flex-none rounded-full bg-gray-50"
                  />
                  <div className="flex-auto">
                    <div className="font-semibold">{featuredTestimonial.author.name}</div>
                    <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                  </div>
                  <img alt="" src={featuredTestimonial.author.logoUrl} className="h-10 w-auto flex-none" />
                </figcaption>
              </motion.figure>

              {/* Other Testimonials */}
              {testimonials.map((columnGroup, columnGroupIdx) => (
                <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                  {columnGroup.map((column, columnIdx) => (
                    <div
                      key={columnIdx}
                      className={classNames(
                        (columnGroupIdx === 0 && columnIdx === 0) ||
                          (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                          ? 'xl:row-span-2'
                          : 'xl:row-start-1',
                        'space-y-8',
                      )}
                    >
                      {column.map((testimonial, testimonialIdx) => (
                        <motion.figure
                          key={testimonial.author.handle}
                          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, delay: (columnGroupIdx * 0.1) + (columnIdx * 0.1) + (testimonialIdx * 0.05) + 0.2 }} // Stagger delay
                        >
                          <blockquote className="text-gray-900">
                            <p>{`"${testimonial.body}"`}</p>
                          </blockquote>
                          <figcaption className="mt-6 flex items-center gap-x-4">
                            <img
                              alt=""
                              src={testimonial.author.imageUrl}
                              className="size-10 rounded-full bg-gray-50"
                            />
                            <div>
                              <div className="font-semibold">{testimonial.author.name}</div>
                              <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                            </div>
                          </figcaption>
                        </motion.figure>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* End Testimonial Section */}

        {/* About Section - Updated Subtle Image Fade */}
        <div id="about" className="relative isolate py-24 sm:py-32">
          {/* REMOVED the large background gradient div */}

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                {/* Text Content */}
                <motion.div
                  className="lg:pt-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-base font-semibold leading-7 text-primary-600">Who We Are (Sort Of)</h2>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                    We're the geniuses who built this template so you don't have to.
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600 text-pretty">
                    Okay, maybe not geniuses. But we're pretty good at making things look sexy and work smoothly. We poured countless hours (and caffeine) into this so you can focus on your brilliant SaaS idea. You're welcome.
                  </p>
                  <p className="mt-8 text-lg leading-8 text-gray-600 text-pretty">
                    Our mission? To empower developers like you to launch faster, iterate quicker, and maybe, just maybe, achieve world domination. Or at least get a decent MVP out the door.
                  </p>
                </motion.div>

                {/* Image Placeholder with Gradient Fade */}
                <motion.div
                  className="relative lg:order-first"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Added relative positioning here */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:aspect-[4/3] lg:rounded-3xl">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Team working together"
                      className="h-full w-full object-cover"
                    />
                    {/* NEW Gradient Fade Overlay */}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* End About Section */}

        {/* FAQ Section */}
        <div id="faq" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 ">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="pb-4 text-4xl font-bold leading-10 tracking-tight text-gray-900 text-center lg:text-balance">
              Frequently (and Sometimes Absurdly) Asked Questions
            </h2>
            <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  className="pt-8 pb-8 lg:grid lg:grid-cols-12 lg:gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">{faq.question}</dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
        {/* End FAQ Section */}

        {/* Moved CTA Section */}
        <div className="bg-primary-700">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                Ready to Build Something Awesome?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-primary-100">
                Stop scrolling, start building. Grab this template and launch your next big idea.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#" // Link to repo or download
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get Started
                </a>
                <a href="#" className="text-sm/6 font-semibold text-white hover:text-primary-100"> {/* Link to docs */}
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End Moved CTA Section */}

        {/* Pricing Section - NEW */}
        <div id="pricing" className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          {/* Background Gradient Blob */}
          <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>

          {/* Title and Description */}
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
            <p className="mt-2 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-balance">
              Choose the right plan for you
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 text-pretty">
              Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            {tiers.map((tier, tierIdx) => (
              <motion.div
                key={tier.id}
                className={classNames(
                  tier.featured ? 'relative z-10 bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                  tier.featured
                    ? ''
                    : tierIdx === 0
                      ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                      : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
                  'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: tierIdx * 0.1 + 0.1 }}
              >
                <h3
                  id={tier.id}
                  className={classNames(tier.featured ? 'text-primary-400' : 'text-primary-600', 'text-base font-semibold leading-7')}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={classNames(
                      tier.featured ? 'text-white' : 'text-gray-900',
                      'text-5xl font-semibold tracking-tight',
                    )}
                  >
                    {tier.priceMonthly}
                  </span>
                  <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/month</span>
                </p>
                <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base leading-7')}>
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className={classNames(
                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                    'mt-8 space-y-3 text-sm leading-6 sm:mt-10',
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        aria-hidden="true"
                        className={classNames(tier.featured ? 'text-primary-400' : 'text-primary-600', 'h-6 w-5 flex-none')}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? 'bg-primary-500 text-white shadow-sm hover:bg-primary-400 focus-visible:outline-primary-500'
                      : 'text-primary-600 ring-1 ring-primary-200 ring-inset hover:ring-primary-300 focus-visible:outline-primary-600',
                    'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                  )}
                >
                  Get started today
                </a>
              </motion.div>
            ))}
          </div>
        </div>
        {/* End Pricing Section */}

        {/* Stats Section - NEW */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                  Trusted by Developers Worldwide (Probably)
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600 text-pretty">
                  We help teams build faster, ship sooner, and maybe even take Fridays off.
                </p>
              </motion.div>
              <motion.dl
                className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4 shadow-lg ring-1 ring-black/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className="flex flex-col bg-gray-400/5 p-8 transition-colors hover:bg-gray-400/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }} // Stagger slightly later
                  >
                    <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  </motion.div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
        {/* End Stats Section */}
      </main>

      {/* Footer */}
      <footer className="relative mt-32 bg-gray-900 sm:mt-40" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <img
                className="h-8 w-auto"
                src="https://noco.io/icon.png"
                alt="Noco"
              />
              <p className="text-sm leading-6 text-gray-300">
                This is a Noco.io template. you can customize this in any way you'd like.
                You own the code.
                Power to the people who build stuff!
              </p>
              {/* Optional Social Links Here */}
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Solutions</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} Noco, Inc. All rights reserved. (Probably).</p>
          </div>
        </div>
      </footer>
      {/* End Footer */}
    </div>
  )
}