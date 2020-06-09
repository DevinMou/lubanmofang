Array.prototype.number = function () {
  return this.map(item => -(-item))
}

function createPoint() {
  const points = {}
  const er = [4, 2, 1]
  for (let i = 1; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      for (let h = 0; h < 3; h++) {
        let point = i * 1000 + er[h] * 10 ** j
        points[point] = getEdge(i, j, er[h], points)
      }
    }
  }
  return points
}

function getEdge(floor, site, num, points) {
  const res = {}
  let floors = floor === 1 ? [2] : floor === 2 ? [1, 3] : [2]
  let sites = site === 0 ? [1] : site === 1 ? [0, 2] : [1]
  let nums = num === 4 ? [2] : num === 2 ? [4, 1] : [2]
  floors.forEach((item, index) => {
    const k = item * 1000 + num * 10 ** site
    points[k] = points[k] || {}
    res[k] = { cs: floor === 1 ? 0 : floor === 2 ? [5, 0][index] : 5, point: points[k] }
  })
  sites.forEach((item, index) => {
    const k = floor * 1000 + num * 10 ** item
    points[k] = points[k] || {}
    res[k] = { cs: site === 0 ? 1 : site === 1 ? [4, 1][index] : 4, point: points[k] }
  })
  nums.forEach((item, index) => {
    const k = floor * 1000 + item * 10 ** site
    points[k] = points[k] || {}
    res[k] = { cs: num === 4 ? 2 : num === 2 ? [3, 2][index] : 3, point: points[k] }
  })
  return res
}

function getArrs(Arr, num, resArr, $0) {
  let _num = num - 1
  Arr.forEach((item, index) => {
    if (num === 1) {
      resArr.push($0.concat(item))
    } else {
      getArrs(Arr.slice(index + 1), _num, resArr, $0.concat(item))
    }
  })
}

function getP(Arr, num) {
  const res = []
  getArrs(Arr, num, res, [])
  return res
}

function isConnect(arr, fn) {
  const res = Array(arr.length).fill(0)
  arr.forEach((item, index) => {
    arr.slice(index).reduce((a, b, i) => {
      const ic = fn(a, b) ? 1 : 0
      res[index] += ic
      res[index + i] += ic
      return a
    })
  })
  for (let i = 0; i < res.length; i++) {
    if (res[i] === 0) {
      return false
    }
  }
  return true
}

function getStart() {

}
// v1->[c1].forEach->v2->[c2-v1]
let count = 0
function oneStream(point, nums, a0, a, margin) {
  /*
    a0:[v5,v6],a:[[v1~v4]],c:[cp-af]
  */
  nums[0] -= 1
  if (nums[0] === 0) {
    a0.push(point)
    a.push(a0)
    if (nums.length === 2) {
      const rest = getDiffArr(Object.keys(points[point]).number(), null, a.flat())
      if (isConnect(rest, (a, b) => b in points[a])) {
        a.push(rest)
        if (equl(allArr, sortArr(a))) {
          console.log(allArr)
          ++count
          count % 100 === 0 && console.log(count, repeat)
          return true
        }
      }
    }
    else if (nums.length > 1) {//nums[4,4] 
      nums.shift()
      margin = getDiffArr(margin, Object.keys(points).number(), [point])
      margin.forEach(item => {
        if (oneStream(item, [...nums], [], a.map(item => [...item]), margin)) {
          return true
        }
      })
    }
  } else {
    let c = Object.keys(points[point]).number() //cp
    const aFlat = a.flat().concat(a0) //a
    c = getDiffArr(c, null, aFlat)//[cp-a]\
    margin = getDiffArr(margin, c, [point])
    c.forEach(item => {
      if (oneStream(item, [...nums], [...a0, point], a.map(item => [...item]), margin)) {
        return true
      }
    })
  }
  return true
}

function getDiffArr(a, b, c) {
  const set = a instanceof Set ? (b ? (b.forEach(item => a.add(item)), a) : a) : new Set(a.concat(b || []))
  c && c.forEach(item => set.delete(item))
  return [...set].number()
}

function getKeys(a0, a1, point) {
  const pobj = point ? Object.keys(points[point]).number() : Object.keys(points).number()
  const a = a0.concat(a1).flat(Infinity)
  const res = []
  for (let p in pobj) {
    a.indexOf(pobj[p]) < 0 && res.push(pobj[p])
  }
  return res
}
function once(a0, a1, nums, num, point, allArr, path = []) {
  let _num
  let keys
  if (num) {
    keys = getKeys(a0, a1, point)
    _num = num - 1
  } else if (nums.length) {
    a0.push(a1.concat(point))
    a1.length = 0
    _num = nums.shift() - 1
    keys = getKeys(a0, a1)
    point = []
  } else if (a0.length === 6) {
    a0.push(a1.concat(point))
    if (equl(allArr, sortArr(a0))) {
      console.log(path.join(','))
    }
    return
  } else {
    return
  }
  keys.forEach((item, index) => {
    once([...a0], a1.concat(point), [...nums], _num, -(-item), allArr, [...path, index + '/' + keys.length])
  })
}

function sortArr(a0) {
  return a0.map(arr => arr.sort((a, b) => a - b)).sort((a, b) => a[0] - b[0])
}
let repeat = 0
function equl(allArr, a0) {
  const stant = points2arrs(a0)
  const str = stant.flat().join('')
  if (!(str in allArr.hax)) {
    //    console.log(str)
    const a24 = getTWS(stant)
    allArr.hub.push(a24)
    a24.forEach(item => {
      allArr.hax[getStr(item)] = a24
    })
    return true
  } else {
    repeat++
    return false
  }
}

const points = createPoint()
const allArr = { hax: {}, hub: [] }
const path = []
console.time('lb')
//  once([],[],[4,4,4,4,4,4],2,-(-Object.keys(points)[0]),allArr,path)
// oneStream(-(-Object.keys(points)[0]), [3, 4, 4, 4, 4, 4, 4], [], [], [])
console.timeEnd('lb')

function matrixRotate(x, y) {
  x = x - 1
  y = -y + 1
  const a = Math.atan2(y, x) - Math.PI / 2
  return [Math.round(Math.cos(a) * Math.SQRT2) + 1, 1 - Math.round(Math.sin(a) * Math.SQRT2)]
}

function num2arr(num) {
  const res = []
  res[2] = num % 2 === 1 ? (--num, 1) : 0
  res[0] = num > 3 ? (num -= 4, 1) : 0
  res[1] = num === 2 ? 1 : 0
  return res
}

function arr2num(arr) {
  return 4 * arr[0] + 2 * arr[1] + arr[2]
}

function nums2arrs(num) {
  const arr = []
  const [b, s, g] = num2bsg(num)
  arr[2] = num2arr(g)
  arr[1] = num2arr(s)
  arr[0] = num2arr(b)
  return arr
}

function num2bsg(num) {
  return [num % 1000 / 100 | 0, num % 100 / 10 | 0, num % 10]
}

function arrs2nums(arrs) {
  return arr2num(arrs[0]) * 100 + arr2num(arrs[1]) * 10 + arr2num(arrs[2])
}

function horizontal90(nums) {
  return nums.map((item, index) => {
    const [[a1, a2, a3], [b1, b2, b3], [c1, c2, c3]] = nums2arrs(item)
    return arrs2nums([[c1, b1, a1], [c2, b2, a2], [c3, b3, a3]]) + (index + 1) * 1000
  })
}

function flip(arrs) {
  const res = []
  arrs.forEach((num, index) => {
    res[2 - index] = num.toString().split('').reverse().slice(0, 3).join('') * 1 + (3 - index) * 1000
  })
  return res
}

function vertical90(arrs) {
  const [b1, s1, g1] = num2bsg(arrs[0])
  const [b2, s2, g2] = num2bsg(arrs[1])
  const [b3, s3, g3] = num2bsg(arrs[2])
  return [b3 * 100 + b2 * 10 + b1 + 1000, s3 * 100 + s2 * 10 + s1 + 2000, g3 * 100 + g2 * 10 + g1 + 3000]
}

function getTW(arr) {
  const waitArr = []
  let item = arr
  for (let i = 0; i < 4; i++) {
    waitArr.push(item)
    if (i === 3) { break }
    item = vertical90(item)
  }
  const top = vertical90(horizontal90(arr))
  const bottom = vertical90(vertical90(top))
  waitArr.push(top, bottom)
  return waitArr.map(item$ => {
    const res = [[...item$]]
    for (let i = 0; i < 3; i++) {
      item$ = horizontal90(item$)
      res.push(item$)
    }
    return res
  }).flat(1)
}

function getTWS(arrs) {
  const resArrs = arrs.map(arr => getTW(arr))
  const res = []
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 7; j++) {
      res[i] = res[i] || []
      res[i][j] = resArrs[j][i]
    }
  }
  return res
}

function getStr(arr) {
  return arr.map(item => item.sort((a, b) => a - b).join('')).sort((a, b) => a - b).join('')
}

function points2arrs(points) {
  return points.map(items => {
    const item = [1000, 2000, 3000]
    items.forEach(e => e < 2000 ? (item[0] += e - 1000) : e < 3000 ? (item[1] += e - 2000) : (item[2] += e - 3000))
    return item
  }).sort((a, b) => a.join('') - b.join(''))
}

