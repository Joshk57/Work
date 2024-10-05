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


// var findSubstring = function(s, words) {
//     let result = [],
//         pattern = {},
//         wordLength = words[0].length;

//     for (const word of words) {
//         pattern[word] = (pattern[word] || 0) + 1;
//     }

//     for (let i = 0; i < wordLength; i++) {
//         let back = i,
//             front = back + wordLength,
//             matches = {},
//             count = 0

//         while (front <= s.length) {
//             let word = s.slice(front - wordLength, front);

//             if (pattern[word]) {
//                 matches[word] = (matches[word] ?? 0) + 1;
//                 count++;

//                 while (matches[word] > pattern[word]) {
//                     matches[s.slice(back, back + wordLength)] -= 1;
//                     back += wordLength;
//                     count--;
//                 }

//                 if (count === words.length) {
//                     result.push(back)
//                 }                
//             } else {
//                 matches = {}
//                 count = 0;
//                 back = front;
//             }

//             front += wordLength;
//         }
//     }

//     return result;    
// };

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

// 32. Longest Valid Paranthesis

var longestValidParentheses = function(s) {
    const stack = [-1];
    let max_len = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                max_len = Math.max(max_len, i - stack[stack.length - 1]);
            }
        }
    }

    return max_len;
};

s = "(()"
// s = ")()())"
// s = ""
// console.log(longestValidParentheses(s))



// 35. Search Insert Position


var searchInsert = function(nums, target) {
    let index = nums.indexOf(target)
   
    if(index == -1){
      nums.push(target)
       nums.sort((a,b) => a - b)
       return nums.indexOf(target)
    } 
    
    return index;  
};

nums = [1,3,5,6], target = 5
// nums = [1,3,5,6], target = 2
// nums = [1,3,5,6], target = 7
// console.log(searchInsert(nums, target))


// 37. Sudoku Solver

var solveSudoku = function(board) {
    dfs(board, 0, 0)
    return board;    
};
let isValid = (board, row, column, value) => {
    let n = board.length;
  
    if (board[row].includes(value)) return false;
  
    for (let i = 0; i < n; i++) {
      if (board[i][column] === value) return false;
    }
  
    let [top, left] = [Math.floor(row / 3) * 3, Math.floor(column / 3) * 3];
  
    for (let i = top; i < top + 3; i++) {
      for (let j = left; j < left + 3; j++) {
        if (board[i][j] === value) return false;
      }
    }
  
    return true;
  }

let dfs = (board, row, column) => {
    if (row === 9) return true;
    if (column === 9) return dfs(board, row + 1, 0);
    if (board[row][column] !== '.') return dfs(board, row, column + 1);
  
    for (let i = 1; i < 10; i++) {
      if (isValid(board, row, column, i.toString())) {
        board[row][column] = i.toString();
        if (dfs(board, row, column + 1)) return true;
        board[row][column] = '.';
      }
    }
  
    return false;
  }

// board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
// console.log(solveSudoku(board))


/// 38. Count and Say

var countAndSay = function(n) {
    if(n==1) return '1';
    let str = '1';
    for(let i=1; i<n; i++) str = createContainers(str);
     
    return str;     
};

function createContainers(str) {
    let arr = [], ch = '';
    for(let i=0; i<str.length; i++) {
        if(str[i] == str[i+1]) ch += str[i];
        else {
            ch += str[i];
            arr.push(ch);
            ch = '';
        }
    }
    return say(arr);
}


function say(numStrArr) {
    let str = ''
    for(let i in numStrArr) str += numStrArr[i].length + numStrArr[i][0];
    
    return str;
}
var countAndSay = function(n) {
    if(n==1) return '1';
    let str = '1';
    for(let i=1; i<n; i++) str = createContainers(str); 
    return str; 
};

function createContainers(str) {
    let frequency = 1, string = '';
    for(let i=0; i<str.length; i++) {
        if(str[i] != str[i+1]) {
            string += frequency + str[i];
            frequency = 1;
        } else frequency++;
    }
    return string;
}


// n = 4
n = 1
// console.log(countAndSay(n))

// 39. Combination Sum

var combinationSum = function(candidates, target) {
    
};

candidates = [2,3,6,7], target = 7
// candidates = [2,3,5], target = 8
// candidates = [2], target = 1
// console.log(combinationSum(candidates, target))


// 40. Combination Sum II

var combinationSum2 = function(candidates, target) {
    let results = [];
    
    candidates.sort((a, b) => a - b);

    function backtrack(start, target, currentCombination) {
        if (target === 0) {
            results.push([...currentCombination]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > target) break;
            currentCombination.push(candidates[i]);
            
            backtrack(i + 1, target - candidates[i], currentCombination);

            currentCombination.pop();
        }
    }


    backtrack(0, target, []);
    
    return results;   
};

candidates = [10,1,2,7,6,1,5], target = 8
// candidates = [2,5,2,1,2], target = 5
// console.log(combinationSum2(candidates, target))


// 41. First Missing Positive
var firstMissingPositive = function(nums) {
    nums.sort((a, b) => a - b);

    let missing = 1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0 && nums[i] === missing) {
        missing++;
        } else if (nums[i] > missing) {
        return missing;
        }
    }

    return missing;     
};

nums = [1,2,0]
// nums = [3,4,-1,1]
// nums = [7,8,9,11,12]
// console.log(firstMissingPositive(nums))


// 42. Trapping Rain Water

var trap = function(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = height[left];
    let rightMax = height[right];
    let water = 0;    
};

height = [0,1,0,2,1,0,1,3,2,1,2,1]
// height = [4,2,0,3,2,5]
console.log(trap(height))