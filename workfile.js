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

    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
        } else {
            right--;
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
        }
    }

    return water;    

};

height = [0,1,0,2,1,0,1,3,2,1,2,1]
// height = [4,2,0,3,2,5]
// console.log(trap(height))

// 43. Multiply Strings

var multiply = function(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0'
    
    const m = num1.length, n = num2.length, res = new Array(m+n).fill(0)
    
    for (let i=m-1; i>=0; i--) {
        for (let j=n-1; j>=0; j--) {
            const p1=i+j, p2=i+j+1
            let sum = res[p2] + Number(num1[i]) * Number(num2[j])
            res[p2] = sum%10
            res[p1] += Math.floor(sum/10)
        }
    }
    if (res[0] === 0) res.shift()
    return res.join('') 
};

num1 = "2", num2 = "3"
// num1 = "123", num2 = "456"
// console.log(multiply(num1, num2))


//44. Wildcard Matching

var isMatch = function(s, p) {
    let memo = Array.from(new Array(s.length + 1), () => new Array(p.length + 1).fill(null));
    function isMatchRecursive(len1, len2) {
        if (len1 === 0 && len2 === 0) {
            return true;
        }

        if (len1 < 0 || len2 < 0) {
            return false;
        }

        if(memo[len1][len2] !== null) {
           return memo[len1][len2];
        }

        if (p[len2 - 1] === '?' || p[len2 - 1] === s[len1 - 1]) {
            return memo[len1][len2] = isMatchRecursive(len1 - 1, len2 - 1);

        } else if (p[len2 - 1] === '*') {

            let excludeStar = isMatchRecursive(len1, len2 - 1);
            let includeStar = isMatchRecursive(len1 - 1, len2);

            return memo[len1][len2] = (excludeStar || includeStar);

        } else if (p[len2 - 1] !== s[len1 - 1]) {
            return memo[len1][len2] = false;
        }
    }

    isMatchRecursive(s.length, p.length);
    console.log(memo);

    return memo[s.length][p.length];
};
s = "aa", p = "a"
// s = "aa", p = "*"
// s = "cb", p = "?a"
// console.log(isMatch(s, p))


// 45. Jump Game II

var jump = function(nums) {
    let near = 0, far = 0, jumps = 0;

    while (far < nums.length - 1) {
        let farthest = 0;
        for (let i = near; i <= far; i++) {
            farthest = Math.max(farthest, i + nums[i]);
        }
        near = far + 1;
        far = farthest;
        jumps++;
    }

    return jumps;   
};

nums = [2,3,1,1,4]
// nums = [2,3,0,1,4]
// console.log(jump(nums))


// 46. Permutations

var permute = function(nums) {
    let result = [];

    permuteRec(nums, 0, result);

    return result; 
};

function swapNums(nums, i, j) {
    let swapIndex = [...nums];
    
      let temp = swapIndex[j];
      swapIndex[j] = swapIndex[i];
      
      swapIndex[i] = temp;
    
      return swapIndex
    }
    function permuteRec(nums, currentIndex, result) {
        var swappedNums;
    
        if (currentIndex === nums.length - 1) {
            result.push(nums);
            return;
        }
    
        for (var index = currentIndex; index < nums.length; index++) {
            swappedNums = swapNums(nums, currentIndex, index);
            permuteRec(swappedNums, currentIndex + 1, result);
        }
    }



nums = [1,2,3]
// nums = [0,1]
// nums = [1]
// console.log(permute(nums))

//47. Permutations II

var permuteUnique = function(nums) {
    nums.sort((a,b)=>a-b)
    let res = []

    let iterate = (arr,temp) =>{
        if(arr.length == 1){
            res.push([...temp,arr[0]])
            return;
        }
        for(let i =0;i<arr.length;i++){
            if(arr[i] == arr[i-1]) continue;
            iterate(arr.filter((num,idx)=>idx !=i),[...temp,arr[i]])
        }
    }
    iterate(nums,[])
    return res    
};

nums = [1,1,2]
// nums = [1,2,3]
// console.log(permuteUnique(nums))


// 48. Rotate Image

var rotate = function(matrix) {
    const edgeLength = matrix.length;

    let top = 0;
    let bottom = edgeLength - 1;

    while (top < bottom) {
        for (let col = 0; col < edgeLength; col++) {
            let temp = matrix[top][col];
            matrix[top][col] = matrix[bottom][col];
            matrix[bottom][col] = temp;
        }
        top++;
        bottom--;
    }

    for (let row = 0; row < edgeLength; row++) {
        for (let col = row + 1; col < edgeLength; col++) {
            let temp = matrix[row][col];
            matrix[row][col] = matrix[col][row];
            matrix[col][row] = temp;
        }
    }    
};

matrix = [[1,2,3],[4,5,6],[7,8,9]]
// matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
// console.log(rotate(matrix))

// 49. Group Anagrams
function getKey(string){
    return string.split('').sort().join('')
 }
var groupAnagrams = function(strs) {
    let hashMap = new Map();

    for(let s of strs){
        const key = getKey(s);
        if(!hashMap[key]){
            hashMap[key] =[];        
        }
       hashMap[key].push(s);
    }
    return Object.values(hashMap);
};

strs = ["eat","tea","tan","ate","nat","bat"]
// strs = [""]
// strs = ["a"]
// console.log(groupAnagrams(strs))


// 50. Pow(x, n)

var myPow = function(x, n) {
  
if (n === 0) {
    return 1;
    }

    if (n < 0) {
    x = 1 / x;
    n = -n;
    }

    if (n % 2 === 0) {
    
    let halfPower = myPow(x, n / 2);
    return halfPower * halfPower;
    }
    else {
    return x * myPow(x, n - 1);
    }      
};

x = 2.00000, n = 10
// x = 2.10000, n = 3
// x = 2.00000, n = -2
// console.log(myPow(x, n))


// 51. N-Queens

var solveNQueens = function(n) {
    if (n === 1) {
        return [["Q"]];
    }
    if (n == 2 || n === 3) {
        return [];
    }
    let results = [];
    let solution = Array(n).fill(-1);
    solveNQueensRec(n, solution, 0, results);
    return results;    
};

function solveNQueensRec(n, solution, row, results) {
    if (row == n) {
        const solutionStr = constructSolutionString(solution);
        results.push(solutionStr);
        return;
    }

    for (let i = 0; i < n; i++) {
        let valid = isValidMove(row, i, solution);
        if (valid) {
            solution[row] = i;
            solveNQueensRec(n, solution, row + 1, results);
        }
    }
}

function isValidMove(proposedRow, proposedCol, solution) {
    for (let i = 0; i < proposedRow; i++) {
        let oldRow = i,
            oldCol = solution[i],
            diagonalOffset = proposedRow - oldRow;

        if (
            oldCol == proposedCol ||
            oldCol == proposedCol - diagonalOffset ||
            oldCol == proposedCol + diagonalOffset
        ) {
            return false;
        }
    }
    return true;
}

function constructSolutionString(solution) {
    const returnArr = [];
    for (i = 0; i < solution.length; i++) {
        const returnStr = Array(solution.length).fill('.');
        returnStr[solution[i]] = "Q";
        returnArr.push(returnStr.join(''));
    }
    return returnArr;
}
n = 4
// n = 1
// console.log(solveNQueens(n))

// 52. N-Queens II

var totalNQueens = function(n) {
    let results = [];
    let solution = Array(n).fill(-1);
    solveNQueensRec(n, solution, 0, results);
    return results.length;
};

function isValidMove(proposedRow, proposedCol, solution) {
    for (let i = 0; i < proposedRow; i++) {
        let oldRow = i,
            oldCol = solution[i],
            diagonalOffset = proposedRow - oldRow;

        if (
            oldCol == proposedCol ||
            oldCol == proposedCol - diagonalOffset ||
            oldCol == proposedCol + diagonalOffset
        ) {
            return false;
        }
    }
    return true;
}

function solveNQueensRec(n, solution, row, results) {
    if (row == n) {
        results.push(solution);
        return;
    }

    for (let i = 0; i < n; i++) {
        let valid = isValidMove(row, i, solution);
        if (valid) {
            solution[row] = i;
            solveNQueensRec(n, solution, row + 1, results);
        }
    }
}

n = 4 
// n = 1
// console.log(totalNQueens(n))

// 53. Maximum subarray

var maxSubArray = function(nums) {
    let res = nums[0];
    let total = 0;

    for (let n of nums) {
        if (total < 0) {
            total = 0;
        }

        total += n;
        res = Math.max(res, total);
    }
    
    return res;        
};

nums = [-2,1,-3,4,-1,2,1,-5,4]
// nums = [1]
// nums = [5,4,-1,7,8]
// console.log(maxSubArray(nums))

// 54. Spiral Matrix

var spiralOrder = function(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let x = 0;
    let y = 0;
    let dx = 1;
    let dy = 0;
    const res = [];   
    
    for (let i = 0; i < rows * cols; i++) {
        res.push(matrix[y][x]);
        matrix[y][x] = ".";

        if (!(0 <= x + dx && x + dx < cols && 0 <= y + dy && y + dy < rows) || matrix[y+dy][x+dx] === ".") {
            [dx, dy] = [-dy, dx];
        }

        x += dx;
        y += dy;
    }

    return res;   
};

matrix = [[1,2,3],[4,5,6],[7,8,9]]
// matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// console.log(spiralOrder(matrix))

// 56. Merge Intervals

var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [];
    let prev = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        let interval = intervals[i];
        if (interval[0] <= prev[1]) {
            prev[1] = Math.max(prev[1], interval[1]);
        } else {
            merged.push(prev);
            prev = interval;
        }
    }

    merged.push(prev);
    return merged;    
};

intervals = [[1,3],[2,6],[8,10],[15,18]]
// intervals = [[1,4],[4,5]]
// console.log(merge(intervals))


// 57. Insert Interval

var insert = function(intervals, newInterval) {
    intervals.push(newInterval);
    intervals.sort((a, b) => a[0] - b[0]);

    let res = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        if (res[res.length - 1][1] >= intervals[i][0]) {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], intervals[i][1]);
        } else {
            res.push(intervals[i]);
        }
    }

    return res;    
};

intervals = [[1,3],[6,9]], newInterval = [2,5]
// intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// console.log(insert(intervals, newInterval))


// 58. Length of Last Word

var lengthOfLastWord = function(s) {
    let end = s.length - 1;

    while (end >= 0 && s[end] === ' ') {
        end--;
    }

    let start = end;
    while (start >= 0 && s[start] !== ' ') {
        start--;
    }

    return end - start;  
};

s = "Hello World"
// s = "   fly me   to   the moon  "
// s = "luffy is still joyboy"
// console.log(lengthOfLastWord(s))

// 59. Spiral Matrix II

var generateMatrix = function(n) {
    let x = 0, y = 0, dx = 1, dy = 0;
    let res = Array.from({length: n}, () => Array.from({length: n}, () => 0));

    for (let i = 0; i < n * n; i++) {
        res[y][x] = i + 1;

        if (!(0 <= x + dx && x + dx < n && 0 <= y + dy && y + dy < n && res[y+dy][x+dx] === 0)) {
            [dx, dy] = [-dy, dx];
        }
                
        x += dx;
        y += dy;
    }

    return res;     
};

n = 3
// n = 1
// console.log(generateMatrix(n))


// 60. Permutation Sequence

var getPermutation = function(n, k) {
    const factorials = {0: 1};
    let arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i);
      factorials[i] = factorials[i - 1] * i;
    }
    const KthComb = [];
    k--;
    while (arr.length > 0) {
      const availableLen = arr.length - 1;
      let swapValue = Math.floor(k / factorials[availableLen]);
      KthComb.push(arr[swapValue]);
      arr.splice(swapValue, 1);
      const remainder = k % factorials[availableLen];
      k = k % factorials[availableLen];
    }
  
    return KthComb.join("");
};

n = 3, k = 3
// n = 4, k = 9
// n = 3, k = 1
// console.log(getPermutation(n, k))



// 61. Rotate List

var rotateRight = function(head, k) {
    let n = length(head)

    if (k % n === 0 || !head) return head

    let node = head
    k = n > k ? k : k % n

    while (n - k - 1) {
        node = node.next
        k++
    }
    res = tail = node.next

    node.next = null
    while (tail.next) {
        tail = tail.next
    }
    tail.next = head
    return res
};

var length = function (node) {
    let n = 0;

    while (node) {
        node = node.next
        n++
    }

    return n
}

head = [1,2,3,4,5], k = 2
// head = [0,1,2], k = 4
console.log(rotateRight(head, k))
