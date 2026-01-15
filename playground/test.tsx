import { useEffect } from 'react'

export function A() {
  useEffect(() => {}, [
    '',
  ])
  return <div className="m-2 flex gap-2" />
}
