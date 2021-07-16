var arr = ['a','b','c','d','e','f'];

lng = arr.length;

do 
{
n = 0;
i = lng;

function dn() {  
arr.splice(n+1,1);
};

function dm() {  
arr.splice(n,1);
};

console.log(arr[n]);
console.log(arr[n+2]);

lng = arr.length;

console.log(lng);

n = n+2;
}
while (i > 2)

console.log(arr);



