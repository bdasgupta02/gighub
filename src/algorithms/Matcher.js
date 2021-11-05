const jaroDistance = (a, b) => {
    const aLen = a.length, bLen = b.length
    if (a === b) {
        return 1.0
    } else if (aLen === 0 || bLen === 0) {
        return 0.0
    }
    let match = 0;
    const hash_s1 = new Array(a.length).fill(0)
    const hash_s2 = new Array(b.length).fill(0)
    const maximumDist = Math.floor(Math.max(aLen, bLen) / 2) - 1
    for (let i = 0; i < aLen; i++) {
        for (let j = Math.max(0, i - maximumDist);
            j < Math.min(bLen, i + maximumDist + 1); j++)
            if (a[i] == b[j] &&
                hash_s2[j] == 0) {
                hash_s1[i] = 1
                hash_s2[j] = 1
                match++
                break
            }
    }
    if (match === 0) {
        return 0.0
    }
    let transpositions = 0;
    let point = 0
    for (let i = 0; i < aLen; i++) {
        if (hash_s1[i] === 1) {
            while (hash_s2[point] == 0) {
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
        let prefix = 0
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] === b[i]) {
                prefix++
            } else {
                break
            }
        }
        prefix = Math.min(4, prefix)
        jaroDist += 0.1 * prefix * (1 - jaroDist)
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
    return totalPerc /= base.length
}

export const isGoodMatch = (base, skills) => {
    const matchPerc = jobMatchingAlgo(base, skills)
    console.log('matching complete: ' + matchPerc)
    return matchPerc > 0.60
}

/**
 * Observed benefits after testing for jobs:
 * - the actual word itself does not matter as much as the coverage of the job tags
 *   (test with "py")
 * - focuses on the coverage of base instead of the coverage of skills
 * 
 * Weakness:
 * - larger strings
 * 
 * Notes:
 * - slippage should be adjusted to vary tolerance
 */

export default jobMatchingAlgo