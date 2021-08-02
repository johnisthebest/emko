var arr = ['a','b','c','d','e','f'];

nmbr();

function nmbr() {
do {
n = Math.floor(Math.random() * arr.length);
document.getElementById('df').innerHTML=arr[n];
console.log(arr[n]);

m = Math.floor(Math.random() * arr.length);
document.getElementById('de').innerHTML=arr[m];
console.log(arr[m]);

if (arr.length == 1){
alert(arr);
break;
 }
}
while(n==m)

};


function dn()
{
 arr.splice(m,1);
console.log("bye n");	
nmbr();
};

function dm()
{
arr.splice(n,1);
console.log("bye m");
nmbr();
};



