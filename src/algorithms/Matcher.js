/**
 * Observed benefits after testing for jobs:
 * - the actual word itself does not matter as much as the coverage of the job tags
 *   (test with "py")
 * - focuses on the coverage of base instead of the coverage of skills
 * 
 * Weakness:
 * - larger strings might be inaccurate to some extent
 */

 const jaroDistance = (a, b) => {
    const aLen = a.length, bLen = b.length
    if (aLen === 0 || bLen === 0) {
        return 0.0
    }

    if (a === b) {
        return 1.0
    } 
    let match = 0;
    const aHash = new Array(a.length).fill(0)
    const bHash = new Array(b.length).fill(0)
    const maximumDist = Math.floor(Math.max(aLen, bLen) / 2) - 1
    for (let i = 0; i < aLen; i++) {
        for (let j = Math.max(0, i - maximumDist);
            j < Math.min(bLen, i + maximumDist + 1); j++)
            if (a[i] == b[j] && bHash[j] == 0) {
                match++
                aHash[i] = 1
                bHash[j] = 1
                break
            }
    }
    if (match === 0) {
        return 0.0
    }
    let transpositions = 0;
    let point = 0
    for (let i = 0; i < aLen; i++) {
        if (aHash[i] === 1) {
            while (bHash[point] == 0) {
                point++
            }
            if (a[i] !== b[point++]) {
                transpositions++
            }
        }
    }
    transpositions /= 2
    return ((match) / (aLen) + (match) / (bLen) + (match - transpositions) / (match)) / 3.0
}

const jaroWinkler = (a, b) => {
    let jaroDist = jaroDistance(a, b)
    if (jaroDist > 0.7) {
        let pref = 0
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] !== b[i]) {
                break
            } else {
                pref++
            }
        }
        pref = Math.min(pref, 4)
        jaroDist += pref * (1 - jaroDist) * 0.1
    }
    return jaroDist.toFixed(6);
}

const jobMatchingAlgo = (base, skills) => {
    let totalPerc = 0
    for (let i = 0; i < base.length; i++) {
        let max = 0
        for (let j = 0; j < skills.length; j++) {
            max = Math.max(max, Number(jaroWinkler(base[i], skills[j])))
        }
        totalPerc += max
    }
    return totalPerc / base.length
}

export const isGoodMatch = (base, skills) => {
    const matchPerc = jobMatchingAlgo(base, skills)
    console.log('matching complete: ' + matchPerc)
    return matchPerc > 0.60
}

export default jobMatchingAlgo

