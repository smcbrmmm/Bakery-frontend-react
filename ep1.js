const customer = {
    name:"samut",
    age:"10",
    showdata(){
        console.log(this.name+" "+this.age)
    }
}
customer.showdata()
//----------------------------------------------------

// String
// let customerName = "เด็กชายโจโจ้"
// const address = `ชื่อลูกค้า : ${customerName} 
// ที่อยู่ 54/10 ม.7 พังงา 82120 
// เบอร์ติดต่อ 0922489093`
// console.log(address)
//----------------------------------------------------

// Spread Operator 
// const newArr = [100,200,300]
// const data = [10,20,...newArr]
// console.log(data)
//----------------------------------------------------

// Rest Parameter
// summation=(...number)=>{
//     let sum = 0;
//     for(let num of number){
//         sum += num;
//     }
//     return sum;
// }
// console.log(summation(500,100))
//----------------------------------------------------

// Destructuring
// const colors =["ขาว","แดง"]
// const [a,b] = colors
// console.log(a +" " +b)

// const product = {
//     productName:"คอมพิวเตอร์",
//     price:30000,
//     stock:10
// }

// ซ้ายคือ Property ที่ต้องการ ขวาคือตัวแปรใหม่ที่จะมารับค่าจาก property
// const {productName:productName,price:price,stock:stock} = product
// console.log(productName + " " + price + " " + stock)
//----------------------------------------------------

// Default Parameter
// getDataCustomer=(customerName,customerAddress="Bangkok")=>{
//     const address = `ชื่อลูกค้า : ${customerName}
//     ที่อยู่ : ${customerAddress}`
//     return address;
// }

// console.log(getDataCustomer("สมัชญ์","Phang-nga"))
// console.log(getDataCustomer("โจโจ้"))
//----------------------------------------------------

// Loop in Javascript
// const data = [10,20,30]

// for(let i=0;i<data.length;i++){
//     console.log(data[i])
// }

// Foreach continue , break ไม่ได้
// let total = 0 
// data.forEach(e=>{
//     total += e;
//     console.log(total)
// })

// for(let num of data){
//     if(num>=30) break
//     console.log(num)
// }
//----------------------------------------------------