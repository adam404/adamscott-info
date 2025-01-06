'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAnimate } from 'framer-motion'

export default function Hero() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(scope.current, { 
      opacity: [0, 1],
      y: [20, 0]
    }, { 
      duration: 0.5 
    })
  }, [animate])

  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div 
          ref={scope}
          className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
        >
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link href="/about" className="inline-flex space-x-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20">
                Available for hire
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Software Engineer & Technical Leader
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I build scalable web applications and lead technical teams to deliver exceptional digital experiences.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary/90"
            >
              Get in touch
            </Link>
            <Link 
              href="/projects"
              className="rounded-full border border-solid border-border transition-colors flex items-center justify-center hover:bg-accent hover:text-accent-foreground text-sm font-semibold leading-6 px-4 py-2.5"
            >
              View projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 