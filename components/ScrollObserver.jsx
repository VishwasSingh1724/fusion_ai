"use client"

import { createContext, useContext, useRef, useState, useEffect } from "react"

const ScrollObserverContext = createContext()

export const ScrollObserver = ({ children, className }) => {
  const [visibleSections, setVisibleSections] = useState(new Set())

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const updatedSections = new Set(visibleSections)
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updatedSections.add(entry.target.id)
          } else {
            updatedSections.delete(entry.target.id)
          }
        })
        setVisibleSections(updatedSections)
      },
      { threshold: 0.5 } // Adjust threshold as needed
    )
  )

  return (
    <ScrollObserverContext.Provider value={{ observer: observer.current, visibleSections }}>
      <div className={className}>{children}</div>
    </ScrollObserverContext.Provider>
  )
}

export const ScrollObserverTriggerGroup = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export const ScrollObserverTrigger = ({ id, children, className }) => {
  const { observer } = useContext(ScrollObserverContext)
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && observer) {
      observer.observe(ref.current)
      return () => observer.unobserve(ref.current)
    }
  }, [observer])

  return (
    <div id={id} ref={ref} className={className}>
      {children(observer)}
    </div>
  )
}

export const ScrollObserverReactorGroup = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export const ScrollObserverReactor = ({ children, className }) => {
  const { visibleSections } = useContext(ScrollObserverContext)
  const isActive = visibleSections.size > 0 // Customize logic based on your requirements

  return (
    <div className={className}>{children(isActive)}</div>
  )
}
