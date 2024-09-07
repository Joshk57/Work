// 29. Divide two integeres

var divide = function(dividend, divisor) {
    if (dividend === -2147483648 && divisor === -1) return 2147483647
    if (Math.abs(divisor) === 1) return dividend * divisor;

    let isNegative = false;
    let count = 0;

    if ((dividend < 0 || divisor < 0) && !(dividend < 0 && divisor < 0))
        isNegative = true;

    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);

    while (dividend >= divisor) {
        let x = 1;
        base = divisor;
        while (base <= (dividend >> 1)) {
            base = base << 1;
            x = x << 1;
        }
        count += x;
        dividend -= base;
    }

    if (isNegative) return -count;
    return count;    
};

dividend = 10, divisor = 3
// dividend = 7, divisor = -3
// console.log(divide(dividend, divisor))

// 30. Substring with Concatenation of All Words


var findSubstring = function(s, words) {
    let result = [],
        pattern = {},
        wordLength = words[0].length;

    for (const word of words) {
        pattern[word] = (pattern[word] || 0) + 1;
    }

    for (let i = 0; i < wordLength; i++) {
        let back = i,
            front = back + wordLength,
            matches = {},
            count = 0

        while (front <= s.length) {
            let word = s.slice(front - wordLength, front);

            if (pattern[word]) {
                matches[word] = (matches[word] ?? 0) + 1;
                count++;

                while (matches[word] > pattern[word]) {
                    matches[s.slice(back, back + wordLength)] -= 1;
                    back += wordLength;
                    count--;
                }

                if (count === words.length) {
                    result.push(back)
                }                
            } else {
                matches = {}
                count = 0;
                back = front;
            }

            front += wordLength;
        }
    }

    return result;    
};

s = "barfoothefoobarman", words = ["foo","bar"]
// s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
// s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
// console.log(findSubstring(s, wordss))

// 31. Next permutation

var nextPermutation = function(nums) {
    const n = nums.length
    let i = n - 2
    while (i >= 0 && nums[i] >= nums[i + 1]) i--
    if (i >= 0) {
        let j = n - 1
        while (nums[j] <= nums[i]) j--
        swap(nums, i, j)
    }
    reverse(nums, i + 1)    
};

function swap(nums, i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]]
}

function reverse(nums, start) {
    let end = nums.length-1
    while (start < end) 
        swap(nums, start++, end--);
}

nums = [1, 2, 3]
// nums = [3, 2, 1]
// nums = [1, 1, 5]
// console.log(nextPermutation(nums))