
export function addItem(incomingItem){
    let bool = false
    let products = [];

    const getItems = localStorage.getItem("items");

    if (getItems){
        products = JSON.parse(getItems);
    }

    products.forEach((item)=>{
        if(item.id === incomingItem.id){
            item.count += 1;

            if(!item.cartSum){
                item.cartSum = 2*item.price;
            }else{
            item.cartSum += incomingItem.price }
            bool = true;
        }
    })
    if(bool){
        localStorage.removeItem("items");
        localStorage.setItem("items",JSON.stringify(products));
    }else{
        localStorage.setItem("items",JSON.stringify([...products,incomingItem]));
    }
}
export function decreaseItemCount(incomingItem){
    let bool = false;
    let products = [];

    const getItems = localStorage.getItem("items");
    
    if (getItems){
        products = JSON.parse(getItems);
    }
    if (incomingItem.count === 1){
        const find = products.find(p=>p.id === incomingItem.id);
        const toRemove = products.indexOf(find);
        products.splice(toRemove,1);
        bool = true

    }else{
        products.forEach((item)=>{
            if(item.id === incomingItem.id){
                item.count -= 1;
                item.cartSum -= incomingItem.price 
                bool = true;
            }
        })
    }
    if(bool){
        localStorage.removeItem("items");
        localStorage.setItem("items",JSON.stringify(products));
    }else{
        localStorage.setItem("items",JSON.stringify([...products,incomingItem]));
    }

}
export function deleteItem(incomingItem){
    let products = [];
    const getItems = localStorage.getItem("items");

    if (getItems){
        products = JSON.parse(getItems);
    }
    const find = products.find(p=>p.id === incomingItem.id);
    const toRemove = products.indexOf(find);
    products.splice(toRemove,1);
    
    localStorage.removeItem("items");
    localStorage.setItem("items",JSON.stringify(products));
}