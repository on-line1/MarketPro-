
const products = [
{id:1,name:"Headphone Gaming",price:250000,img:"https://via.placeholder.com/300"},
{id:2,name:"Keyboard Mechanical",price:450000,img:"https://via.placeholder.com/300"},
{id:3,name:"Mouse Wireless",price:150000,img:"https://via.placeholder.com/300"},
{id:4,name:"Smartwatch",price:750000,img:"https://via.placeholder.com/300"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){localStorage.setItem("cart",JSON.stringify(cart));updateCount();}
function updateCount(){
let count = cart.reduce((a,b)=>a+b.qty,0);
if(document.getElementById("cart-count")) document.getElementById("cart-count").innerText=count;
}

function formatRupiah(n){return "Rp "+n.toLocaleString("id-ID");}

if(document.getElementById("product-list")){
let container=document.getElementById("product-list");
products.forEach(p=>{
container.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h4>${p.name}</h4>
<p>${formatRupiah(p.price)}</p>
<a href="detail.html?id=${p.id}"><button>Lihat</button></a>
<button onclick="addToCart(${p.id})">Tambah</button>
</div>`;
});
}

function addToCart(id){
let p=products.find(x=>x.id===id);
let exist=cart.find(x=>x.id===id);
if(exist){exist.qty+=1}else{cart.push({...p,qty:1})}
saveCart();
}

if(document.getElementById("detail")){
let id=new URLSearchParams(window.location.search).get("id");
let p=products.find(x=>x.id==id);
document.getElementById("detail").innerHTML=`
<img src="${p.img}" style="width:100%;border-radius:10px">
<h2>${p.name}</h2>
<h3>${formatRupiah(p.price)}</h3>
<button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>`;
}

if(document.getElementById("checkout-items")){
let container=document.getElementById("checkout-items");
let total=0;
cart.forEach(item=>{
total+=item.price*item.qty;
container.innerHTML+=`<p>${item.name} (${item.qty}) - ${formatRupiah(item.price*item.qty)}</p>`;
});
document.getElementById("total").innerText=formatRupiah(total);
}

function completeCheckout(){
alert("Pembayaran Berhasil!");
localStorage.removeItem("cart");
window.location.href="index.html";
}

updateCount();
