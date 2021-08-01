 function merge(nums1, nums2) {
     const ret = [];
     let n1 = 0,
         n2 = 0;
     while (n1 < nums1.length && n2 < nums2.length) {
         if (nums1[n1] < nums2[n2]) {
             ret.push(nums1[n1++]);
         } else {
             ret.push(nums2[n2++]);
         }
     }
     while (n1 < nums1.length) {
         ret.push(nums1[n1++]);
     }
     while (n2 < nums2.length) {
         ret.push(nums2[n2++]);
     }
     return ret;
 }

 function findMedianSortedArrays(nums1, nums2) {
     const arr = merge(nums1, nums2);
     let mid = 0;
     if (arr.length % 2 === 0) {
         // arr元素个数是偶数
         mid = (arr[Math.floor(arr.length / 2)] + arr[Math.floor(arr.length / 2 - 1)]) / 2;
     } else {
         // arr元素个数是奇数
         mid = arr[Math.floor(arr.length / 2)];
     }
     return mid;
 }
 console.log(findMedianSortedArrays([1, 2, 6], [2]));