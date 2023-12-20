
// const product= data.product;
document.addEventListener("DOMContentLoaded", function () {

    let sizeSelected;
    let colorSelected;
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448').then((response) => {
    if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
        console.log(data);
        const product= data.product;
        //product-image
        const mainImg= document.querySelector(".product_img");
        mainImg.innerHTML=`<img src=${product.images[0].src} alt=${product.images[0].alt} />`;

        const thumbImg1= document.querySelector(".thumbnail_img1");
        thumbImg1.innerHTML=`<img src=${product.images[0].src} alt=${product.images[1].alt} />`;
        thumbImg1.addEventListener("click", function(){
            mainImg.innerHTML=`<img src=${product.images[0].src} alt=${product.images[0].alt} />`;
        });

        const thumbImg2= document.querySelector(".thumbnail_img2");
        thumbImg2.innerHTML=`<img src=${product.images[1].src} alt=${product.images[2].alt} />`;
        thumbImg2.addEventListener("click", function(){
            mainImg.innerHTML=`<img src=${product.images[1].src} alt=${product.images[1].alt} />`;
        });

        const thumbImg3= document.querySelector(".thumbnail_img3");
        thumbImg3.innerHTML=`<img src=${product.images[2].src} alt=${product.images[3].alt} />`;
        thumbImg3.addEventListener("click", function(){
            mainImg.innerHTML=`<img src=${product.images[2].src} alt=${product.images[2].alt} />`;
        });

        const thumbImg4= document.querySelector(".thumbnail_img4");
        thumbImg4.innerHTML=`<img src=${product.images[3].src} alt=${product.images[3].alt} />`;
        thumbImg4.addEventListener("click", function(){
            mainImg.innerHTML=`<img src=${product.images[3].src} alt=${product.images[3].alt} />`;
        });


        //product-vendor
        const productVendor = document.querySelector(".product_vendor");
        productVendor.textContent = product.vendor;
        //product-title
        const productTitle = document.querySelector(".product_title");
        productTitle.textContent = product.title;

        //product-price
        const productPrice = document.querySelector(".product_price");
        productPrice.textContent = product.price;
        //product_discount_percentage
        const productDiscountPercentage = document.querySelector(".product_discount_percentage");
        productDiscountPercentage.textContent = product.discount_percentage;
        //product_compare_at_price
        const productCompareAtPrice = document.querySelector(".original_price");
        productCompareAtPrice.textContent = product.compare_at_price;

        //color selector
        const colorContainer= document.getElementById("color_selector");
        createColorSquares(colorContainer, product.options[0].values);

        //size selector
        const sizeContainer= document.getElementById("size_selector");
        createSizeSelectors(sizeContainer, product.options[1].values);

        //product-description
        const productDescription = document.querySelector(".product_description");
        productDescription.innerHTML = product.description;

        //quantity
        const decrementBtn=document.getElementById("minus");
        const incrementBtn=document.getElementById("plus");
        const qty=document.getElementById("counter");
        let qtyVal=1;
        function updateQty(){
            qty.textContent=qtyVal;
        }
        decrementBtn.addEventListener("click", function(){
            qtyVal--;
            if(qtyVal<1){
                qtyVal=1;
            }
            updateQty();
        });
        incrementBtn.addEventListener("click", function(){
            qtyVal++;
            updateQty();
        });

        //add to cart
        const addToCartBtn=document.getElementById("Addtocart_Button");
        addToCartBtn.addEventListener("click", function(){
            const cartItem= document.querySelector(".onAdd");
            cartItem.innerHTML= `${product.title} with color ${colorSelected} and Size ${sizeSelected} is added to cart`;
            cartItem.style.display="flex";
            cartItem.style.fontSize="14px";
            

        });


        /*const colourList=product.options[0].values;
        const colourSelector = document.querySelector(".colour_selector");
        for (let i = 0; i < colourList.length; i++) {
            console.log(colourList[i]);
            const colour = colourList[i];
            const colourItem = createHTMLElement("div", "colour-square", colour);
            colourItem.style.backgroundColor = colour;
            colourSelector.appendChild(colourItem);
        }*/
        
        
    })
    .catch((error) => console.error("FETCH ERROR:", error));


    
    function createHTMLElement(tag, className, textContent) {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = textContent;
        return element;
    }

    function createColorSquares(container, colors){
        colors.forEach(colorObject => {
            const colorVal= Object.values(colorObject)[0];
            const colorSquare= document.createElement("div");
            const colorSquareWrap= document.createElement("div");

            colorSquare.classList.add("color_square");
            //colorSqaure.textContent="";
            colorSquareWrap.classList.add(`${colorVal}`);
            colorSquareWrap.classList.add("Wrapper_class");
            colorSquare.style.backgroundColor=colorVal;

            //console.log(Object.keys(colorObject));
            //colorSquareWrap.style.border=`2px solid ${colorVal}`;
            colorSquareWrap.style.padding="5px";

            colorSquare.value=Object.keys(colorObject)[0];
            colorSquareWrap.appendChild(colorSquare);
            container.appendChild(colorSquareWrap);

            colorSquare.addEventListener("click", function(e){
                
                const wrappers= document.getElementsByClassName("Wrapper_class");
                for(let i=0; i<wrappers.length; i++){
                    wrappers[i].style.border="none";
                   // console.log(wrappers[i]);
                }
                //colorSquare.style.border="2px solid black";
                const currentWrapper=document.getElementsByClassName(`${colorVal}`);
                currentWrapper[0].style.border=`2px solid ${colorVal}`;
                colorSelected=e.target.value;
                console.log(colorSelected);
            });
        });
    }


    function createSizeSelectors(container, sizes){
        let selectedInput;
        sizes.forEach(sizeObject => {
            //console.log(sizeObject);
            const radioWrapper= document.createElement("div");
            const radioInput= document.createElement("input");
            radioWrapper.classList.add("radio_wrapper");
            radioInput.type='radio';
            radioInput.name='size';
            const radioLabel= document.createElement("label");
            radioLabel.textContent=sizeObject;
            radioInput.value=sizeObject;
            radioWrapper.appendChild(radioInput);
            radioWrapper.appendChild(radioLabel);
            container.appendChild(radioWrapper);

            radioInput.addEventListener("click", function(e){
                if(selectedInput){
                    selectedInput.classList.remove("selected_size");
                }
                selectedInput=radioWrapper;
                radioWrapper.classList.add("selected_size");
                sizeSelected=e.target.value;
                console.log(sizeSelected);
            })
            
        })
    }
    


});