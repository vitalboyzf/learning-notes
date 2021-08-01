   const {
       ListNode
   } = require("./ListNode");
   const A1 = new ListNode("A1");
   const A2 = new ListNode("A2");
   const C1 = new ListNode("C1");
   const C2 = new ListNode("C2");
   const C3 = new ListNode("C3");
   A1.next = A2;
   A2.next = C1;
   C1.next = C2;
   C2.next = C3;
   const B1 = new ListNode("B1");
   const B2 = new ListNode("B2");
   const B3 = new ListNode("B3");
   B1.next = B2;
   B2.next = B3;
   B3.next = C1;

   function getIntersectionNode(headA, headB) {
       if (!headA || !headB) return null;
       let curA = headA;
       let curB = headB;
       while (curA !== curB) {
           curA = curA ? curA.next : headB;
           curB = curB ? curB.next : headA;
       }
       return curA;
   }
   let result = getIntersectionNode(A1, B1);
   console.log(result);