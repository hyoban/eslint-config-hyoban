import { useEffect } from 'react'

export function A() {
  useEffect(() => {}, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    '',
  ])
  return <div className="m-2 flex gap-2" />
}
