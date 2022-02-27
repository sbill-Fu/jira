import { useEffect, useState } from 'react'
import { useMount } from 'utils'

const test = () => {
  let num = 0
  const effect = () => {
    num += 1
    const message = `现在的 num 值：${num}`
    return function unmount() {
      console.log(message)
    }
  }
  return effect
}

const add = test()
const unmount = add()
add()
add()
unmount()

export const Test = () => {
  const [num, setNum] = useState(0)

  const add = () => setNum(num + 1)

  // useMount(() => {
  //   setInterval(() => {
  //     console.log('interval: ', num);
  //   }, 1000)
  // })

  useEffect(() => {
    return () => {
      console.log('un: ', num)
    }
  }, [num])

  return <div>
    <button onClick={add}>add</button>
    <p>
      number: {num}
    </p>
  </div>
}