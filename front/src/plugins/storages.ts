const setStorages = () => {
  try {
    const scope12 = localStorage.getItem('scope12')
    const scope12List = ['a', 'b', 'c', 'd', 'e']
    if (!scope12) {
      const list = {}
      for (const item of scope12List) list[item] = true
      localStorage.setItem('scope12', JSON.stringify(list))
    }
  } catch (e) {
    console.warn(e)
  }
}

export { setStorages }
