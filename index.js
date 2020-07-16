Array.prototype.number = function () {
  return this.map(item => -(-item))
}

Array.prototype.last = function () {
  return this[this.length - 1]
}

Array.prototype.numSort = function () {
  return this.sort((a, b) => a - b)
}

function createPoint() {
  const points = {}
  const letters = {}
  const er = [4, 2, 1]
  for (let i = 1; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      for (let h = 0; h < 3; h++) {
        let point = i * 1000 + er[h] * 10 ** j
        let letter = ((i - 1) * 9 + (2 - j) * 3 + h + 9).toString(36)
        letters[letter] = point
        points[point] = getEdge(i, j, er[h], points, letter)
      }
    }
  }
  return [points, letters]
}

function getEdge(floor, site, num, points, str) {
  const res = Object.defineProperty({}, 'chart', { value: str })
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

// ['down','back','right','left','font','top']
// 0:[1,2,4,3]:5
// 1:[0,2,5,3]:4
// 2:[0,4,5,1]:3
const share = [[1, 2, 4, 3], [0, 2, 5, 3], [0, 4, 5, 1]]
// [<,-][田,T,刁,L,Z,厶,了]
function isConnect(arr, fn) {
  const res = Array(arr.length).fill(1).map(() => [])
  arr.forEach((item, index) => {
    arr.slice(index).reduce((a, b, i) => {
      const ic = fn(a, b)
      if (ic !== null) {
        res[index].push(ic)
        res[index + i].push(5 - ic)
      }
      return a
    })
  })
  if (arr.length === 4) {
    let m3, m2 = [], m1 = 0
    for (let i = 0; i < 4; i++) {
      const item = res[i]
      const len = item.length
      if (len === 3) {
        m3 = item
        break
      } else if (len === 2) {
        m2.push(item)
      } else if (len === 1) {
        m1++
      }
    }
    if (m3) {
      return m3[0] + m3[1] === 5 || m3[0] + m3[2] === 5 || m3[1] + m3[2] === 5 ? 1 : 2
    } else if (m2.length === 4) {
      return 0
    } else if (m2.length === 2 && m1 === 2) {
      const [a, b] = m2[0]
      const [c, d] = m2[1]
      if (a + b === 5 || c + d === 5) {
        return 3
      } else if (a + b + c + d === 10) {
        return 4
      } else {
        const ac = a + c === 5
        const ad = a + d === 5
        const bc = b + c === 5
        const [s, m, e] = ac || ad ? [b, a, ac ? d : c] : [a, b, bc ? d : c]
        const isSm = s < 3
        const ss = share[isSm ? s : 5 - s]
        const der = ss.indexOf(e) - ss.indexOf(m)
        if (der === 1 || der === -4) {
          return isSm ? 5 : 6
        } else {
          return isSm ? 6 : 5
        }
      }
    } else {
      return null
    }
  } else if (arr.length === 3) {
    const m2 = res[0].length === 2 ? res[0] : res[1].length === 2 ? res[1] : res[2].length === 2 ? res[2] : null
    return m2 ? (m2[0] + m2[1] === 5 ? -1 : -2) : null
  } else {
    return null
  }
}

function getStart() {

}
// v1->[c1].forEach->v2->[c2-v1]
let count = 0
function oneStream(point, nums, a0, a, margin, shape = []) {
  /*
    a0:[v5,v6],a:[[v1~v4]],c:[cp-af]
  */
  const _a = a.flat().concat(a0)
  if (_a.length !== [...new Set(_a)].length) {
    throw new Error('bbbb')
  }
  nums[0] -= 1
  if (nums[0] === 0) {
    a0.push(point)
    const sr = isConnect(a0, (a, b) => b in points[a] ? points[a][b].cs : null)
    if (sr !== null) {
      shape.push(sr)
    } else {
      throw new Error('aaa')
    }
    a.push(a0)
    if (nums.length === 2) {
      const all = Object.keys(points).number()
      const rest = getDiffArr(all, null, [point, ...a.flat()])
      const lsr = isConnect(rest, (a, b) => b in points[a] ? points[a][b].cs : null)
      if (lsr !== null) {
        a.push(rest)
        shape.push(lsr)
        if (equl(allArr, sortArr(a), shape)) {
          return true
        }
      }
    }
    else if (nums.length > 1) {//nums[4,4] 
      nums.shift()
      margin = getDiffArr(margin, Object.keys(points[point]).number(), [point, ...a.flat()])
      margin.forEach(item => {
        if (oneStream(item, [...nums], [], a.map(item => [...item]), margin, [...shape])) {
          return true
        }
      })
    }
  } else {
    let c = Object.keys(points[point]).number() //cp
    const aFlat = a.flat().concat(a0) //a
    c = getDiffArr(c, null, aFlat)//[cp-a]\
    margin = getDiffArr(margin, c, [point, ...a.flat()])
    c.forEach(item => {
      if (oneStream(item, [...nums], [...a0, point], a.map(item => [...item]), margin, [...shape])) {
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
function equl(allArr, a0, shape) {
  const stant = points2arrs(a0)
  const str = stant.flat().join('')
  const shapeStr = shape.sort((a, b) => a - b).join('')
  if (shapeStr in allArr.shape) {
    return false
  } else {
    const a = shapeStr.split('')
    allArr.shape[shapeStr] = { stant, repeat: a.length - [...new Set(a)].length }
    allArr.count++
    allArr.count % 10 === 0 && console.log(allArr.count)
    return true
  }
}

const [points, letters] = createPoint()
const allArr = { count: 0, shape: {} }
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

function point2site(point) { // 1020
  const arr = point.toString().split('')
  const a = 3 - arr[0]
  let i = 1
  while (arr[i] === '0') { i++ }
  const b = i - 1
  const c = ['4', '2', '1'].indexOf(arr[i])
  return [a, b, c]
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
  let item = arr.map((item, index) => item < 1000 ? (item + (index + 1) * 1000) : item)
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

function block2points(block) { //[1020, 2064, 3000]
  const points = []
  block.forEach((item, index) => {
    if (item % 1000) {
      num2bsg(item).forEach((item$, index$) => {//s:2
        item$ && num2arr(item$).forEach((item$$, index$$) => {//[0,1,0]
          item$$ && points.push((index + 1) * 1000 + [4, 2, 1][index$$] * 10 ** (2 - index$))
        })
      })
    }
  })
  return points
}

/*
 stack: [[p1]]->[[],[c1...p2]]->[[],[c1...],[c2...p3]]->[[],[c1...],[c2...],[mp3...p4]]->[[],[c1],[c2],[mp3],[c4...p5]]->
   res:      [p1]--------->[p1,p2]--------------->[p1,p2,p3]-------------------->[p1,p2,p3|p4]---------------->[p1,p2,p3|p4,p5]
*/

function Action() {
  let count = 0
  let startDate = new Date().getTime()
  let nowCount = 0
  const stack = [[1001]]
  const res = []
  const shape = []
  const margin = new Set()
  let lastPoint
  let len
  while (len = stack.length, len) {
    if (len) {
      const l = stack.last()
      if (l.length) {
        lastPoint = l.pop()
        if (res.includes(lastPoint)) {
          continue
        }
      } else {
        stack.pop()
        res.pop()
        continue
      }
      const c = Object.keys(points[lastPoint]).number()
      let cr = getDiffArr(Object.keys(points[lastPoint]).number(), null, res)
      if (cr.length) {
        res.push(lastPoint)
        if (res.length === 23) {
          const rest = getDiffArr(Object.keys(points).number(), null, res)
          const lsr = isConnect(rest, (a, b) => b in points[a] ? points[a][b].cs : null)
          count++
          if (count - nowCount > 100000) {
            const nowDate = new Date().getTime()
            console.log(((count - nowCount) / (nowDate - startDate)).toFixed(4))
            nowCount = count
            startDate = nowDate
          }
          if (lsr !== null) {
            let index = 0
            const a = []
            while (index < 23) {
              let a0
              if (index === 0) {
                a0 = res.slice(0, 3)
                index += 3
              } else {
                a0 = res.slice(index, index + 4)
                index += 4
              }
              const sr = isConnect(a0, (a, b) => b in points[a] ? points[a][b].cs : null)
              if (sr !== null) {
                shape.push(sr)
                a.push(a0)
              } else {
                throw new Error('aaa')
              }
            }
            a.push(rest)
            shape.push(lsr)
            equl(allArr, sortArr(a), shape)
            shape.length = 0
          }
          res.pop()
          continue
        }

        if (len % 4 === 3) {
          const set = new Set(res.map(item => Object.keys(points[item]).number()).flat())
          cr = getDiffArr([...set], null, res)
        }
        stack.push(cr)
      } else {
        continue
      }

    } else {
      break
    }
  }
}
// 4 2 1
// [<,-][田,T,刁,L,Z,厶,マ]
const SC = {
  '-2': [[6, 4, 0], [6, 2, 0], [4, 6, 0], [4, 2, 0], [22, 2, 0], [22, 20, 0], [2, 22, 0], [20, 22, 0]],
  '-1': [[4, 4, 4], [20, 20, 20]],
  0: [[66, 0, 0], [0, 66, 0], [44, 44, 0]],
  1: [[27, 0, 0], [72, 0, 0], [70, 20, 0], [20, 70, 0]],
  2: [[64, 40, 0], [62, 20, 0], [46, 4, 0], [40, 64, 0], [20, 62, 0], [4, 46, 0]],
  3: [[470, 0, 0], [74, 0, 0], [70, 40, 0], [47, 0, 0], [7, 4, 0], [40, 70, 0]],
  4: [[630, 0, 0], [360, 0, 0], [0, 630, 0], [0, 360, 0]],
  5: [[2, 46, 0], [4, 64, 0], [40, 62, 0], [20, 26, 0], [46, 40, 0], [64, 20, 0], [62, 2, 0], [26, 4, 0]],
  6: [[40, 46, 0], [20, 64, 0], [2, 62, 0], [4, 26, 0], [46, 2, 0], [64, 4, 0], [62, 40, 0], [26, 20, 0]],
}

function getAllBlock() {
  const res = {}
  for (let k in SC) {
    const item = SC[k]
    res[k] = new Set()
    item.forEach(item$ => {
      getTW(item$).forEach(item$$ => {
        res[k].add(block2points(item$$).map(item$3 => points[item$3].chart).sort().join(''))
      })
    })
  }
  return res
}

const startBLock = [...SC['-1'], ...SC['-2']].map(item => block2points(item).map(item$ => points[item$].chart).sort().join(''))
const blockHub = Array.from({ ...getAllBlock(), length: 7 }).map(item => [...item])
const box = [startBLock[0]]
let xl = [0, 0, 0, 0, 0, 0]
const lastIndex = {}
function onceBlock(start, nums) { // [a,b,c,d,e]
  const stack = [[start]]
  const res = []
  const xl = [...nums]
  const group = new Set()
  try {

    while (stack.length) {
      const l = stack.last()
      if (l.length) {
        lastBlock = l.shift()
      } else {
        stack.pop()
        res.pop()
        continue
      }
      let resStr = res.join('') + lastBlock
      const num = xl[res.length]
      let firstIndex = false
      const tempArr = blockHub[num].filter((item, index) => {
        /* if (index <= (lastIndex[num] || 0)) {
          return false
        } */
        const ia = item.split('')
        for (let i = 0; i < ia.length; i++) {
          if (resStr.includes(ia[i])) {
            return false
          }
        }
        if (firstIndex === false) {
          firstIndex = index
        }
        return true
      })
      if (tempArr.length) {
        res.push(lastBlock)
        stack.push(tempArr)
        lastIndex[num] = firstIndex
        if (res.length === 6) {
          group.add(res[0] + (res.slice(1).concat(tempArr[0])).sort().join(''))
          res.pop()
          stack.pop()
        }
      }
      continue
    }
  }
  catch (err) {
    console.log(err)
  }
  return [...group]
}

function letters2arrs(letterStr) {
  let arrs = letterStr.split('').map(item => letters[item])
  arrs = [arrs.slice(0, 3), ...arrs.slice(3).reduce((a, b, i) => (i % 4 === 0 ? a.push([b]) : a.last().push(b), a), [])]
  return points2arrs(arrs)
}

function getRotate(letterStr) {
  return getTWS(letters2arrs(letterStr)).map(item => {
    let first
    const arr = item.map(item$ => {
      return block2points(item$).map(item$$ => points[item$$].chart).sort().join('')
    }).filter(item$3 => item$3.length === 3 ? (first = item$3, false) : true)
    return first + arr.sort().join('')
  })
}

function removeRepeat(arrs) {
  const sets = new Set(arrs)
  const res = []
  while (sets.size) {
    const first = sets.keys().next().value
    sets.delete(first)
    getRotate(first).forEach(item => {
      sets.delete(item)
    })
    res.push(first)
  }
  return res
}

function streamBlock(start, n) {
  const nums = [0, 0, 0, 0, 0, 0]
  const res = {}
  while (1) {
    const bs = onceBlock(start, nums)
    if (bs.length) {
      res[n + nums.sort((a, b) => a - b).join('')] = removeRepeat(bs)
    }
    if (nums.join('') === '666666') {
      break
    }
    for (let i = 5; i >= 0; i--) {
      if (nums[i] !== 6) {
        nums[i] += 1
        for (let j = i + 1; j < 6; j++) {
          nums[j] = nums[i]
        }
        break
      }
    }
  }
  return res
}

function rotVector([u, v, w], [x, y, z, a]) { // x*x+y*y+z*z = 1
  let cosT = Math.cos(a)
  let sinT = Math.sin(a)
  const rateK = (x ** 2 + y ** 2 + z ** 2) ** 0.5
  x /= rateK
  y /= rateK
  z /= rateK
  const rateV = (u ** 2 + v ** 2 + w ** 2) ** 0.5
  u /= rateV
  v /= rateV
  w /= rateV
  rx = u * cosT + (y * w - z * v) * sinT + x * (x * u + y * v + z * w) * (1 - cosT)
  ry = v * cosT + (z * u - x * w) * sinT + y * (x * u + y * v + z * w) * (1 - cosT)
  rz = w * cosT + (x * v - y * u) * sinT + z * (x * u + y * v + z * w) * (1 - cosT)
  return [rx.toFixed(5) - 0, ry.toFixed(5) - 0, rz.toFixed(5) - 0]
}

function rotate3d([u, v, w], [rx, ry, rz]) {
  const angle = Math.acos((rx * u + ry * v + rz * w) / Math.sqrt((rx ** 2 + ry ** 2 + rz ** 2) * (u ** 2 + v ** 2 + w ** 2)))
  return [v * rz - w * ry, w * rx - u * rz, u * ry - v * rx, angle]
}

function getK(x, y, r) {
  const o = [0, -1, 0]
  const { sin, cos } = Math
  const v = [cos(y / r) * sin(x / r), -cos(y / r) * cos(x / r), -sin(y / r)]
  return rotate3d(o, v)
}