	
	let Item = [//array of item objects
		{
			name:"Polka Dot Mini",
			tag: "polkadotmini",
			image: "/images/119469273_1257141594645713_3489490998363617874_n.jpg",
			price: 8,
			inCart: 0,
		},

		{
			name: "Exotic Maxi Dress",
			tag: "exoticmaxidress",
			image: "/images/115889193_1215859095440630_3124536734724679976_n.jpg",
			price: 11,
			inCart: 0,
		},

		{
			name: "One Arm LBD",
			tag: "onearmlbd",
			image: "/images/0022551_cotton-one-shoulder-bodycon-dress_400.jpeg",
			price: 10,
			inCart: 0,
		},

        {
            name: "Draw String Frill Top",
			tag: "drawstringfrilltop",
			image: "/images/69833692_937699106589965_1949832117781266432_n.jpg",
			price: 7,
			inCart: 0
        },

        {
            name: "Seamless Bandeux",
			tag: "seamlessbandeux",
			image: "/images/259x259.jpg",
			price: 5,
			inCart: 0
        },

        {
            name: "Mom Jeans",
			tag: "momjeans",
			image: "/images/jeans.jpeg",
			price: 20,
			inCart: 0
        },

        {
            name: "Cargo Pants",
			tag: "cargopants",
			image: "/images/ladies-cargo-pants-walmart-womens-trousers-black-military-work-skinny-australia-with-pockets-nz.jpg",
			price: 18,
			inCart: 0
        },

        {
            name: "Denim Shorts",
			tag: "denimshorts",
			image: "/images/6ad17696-bfac-4afd-b8b8-b24c446732e1_1.d09f7143afddfa44e69b3129df0d5f5c.jpeg",
			price: 12,
			inCart: 0
        },

        {
            name: "Sky Blue Bikini Set",
			tag: "skybluebikiniset",
			image: "/images/69592641_937590923267450_1200335899150254080_o.jpg",
			price: 15,
			inCart: 0
        },

        {
            name: "Miss Pretty Sunglasses",
			tag: "missprettysunglasses",
			image: "/images/119582769_1257141591312380_2838110834343700261_n.jpg",
			price: 5,
			inCart: 0
        },

        {
            name: "Flat Hat",
			tag: "flathat",
			image: "/images/131752739_1335133673513171_1379380516579143644_o.jpg",
			price: 7,
			inCart: 0
        },

        {
            name: "Summer Sandals",
			tag: "summersandals",
			image: "/images/78498933_1016351058724769_390191615563530240_n.jpg",
			price: 10,
			inCart: 0
        },

        {
            name: "Soosie Block Heels",
			tag: "soosieblockheels",
			image: "/images/72565817_965010850525457_8663587946777018368_n.jpg",
			price: 15,
			inCart: 0
        }
		
	]; 

$(document).ready(function() {
	//for in loop to display catalogue items on the catalogue page
	for (i in Item) {
		$(".product-items").append(
			`<li>
				<div class="product">
						<img src="${Item[i].image}" alt="image" class="product-image"/>
						<div class="product-name">
							<a href="#">${Item[i].name}</a>
						</div>
						<small class="in-stock">In Stock</small>
						<div class="price">
							<a href="#">$ ${Item[i].price},00</a>
						</div>
						<div class="action-btn">
							<button class="add-cart">Add to Cart</button>
							<ion-icon class="wishlist" name="heart"></ion-icon>
						</div>	 
					</div>
				</div>
            </li>`)
	}
	
	let carts = document.querySelectorAll('.add-cart');
	let modal = document.getElementById("myModal");
	
	// add to cart 
	// total cost accummulates
	// modal displays upon adding item to cart
	for (let i = 0; i < carts.length; i++) {
		carts[i].addEventListener('click', () => {
			cartNumbers(Item[i]);
			totalCost(Item[i]);
			displayModal()
		})
	}

	// sets items in local storage
	function setItems(Item) {
		let cartItems = localStorage.getItem('itemsInCart');
		cartItems = JSON.parse(cartItems);
		
		if (cartItems != null ) {
			if (cartItems[Item.tag] == undefined) {
				cartItems = {
					...cartItems,
					[Item.tag]: Item
				}
			}
			cartItems[Item.tag].inCart += 1;
		} else {
			Item.inCart = 1;
			cartItems = {
				[Item.tag]: Item
			}
		}
		localStorage.setItem('itemsInCart', JSON.stringify(cartItems));
	}

	// sets cart numbers and keeps count of number of items in cart
	function cartNumbers(Item, action) {
		let itemNumbers = localStorage.getItem('cartNumbers');
		itemNumbers = parseInt(itemNumbers);

		let cartItems = localStorage.getItem('itemsInCart');
		cartItems = JSON.parse(cartItems);

		if(action == "decrease") {
			localStorage.setItem('cartNumbers', itemNumbers - 1);
			document.querySelector('.shop-cart span').textContent = itemNumbers - 1;
		} else if( itemNumbers ) {
			localStorage.setItem('cartNumbers', itemNumbers + 1);
			document.querySelector('.shop-cart span').textContent = itemNumbers + 1
		} else {
			localStorage.setItem('cartNumbers', 1);
			document.querySelector('.shop-cart span').textContent = 1;
		}

		setItems(Item);
	}

	// shows cart numbers when the site pages are loaded
	function onLoadCartNumbers() {
		let itemNumbers = localStorage.getItem('cartNumbers');

		if (itemNumbers) {
			document.querySelector('.shop-cart span').textContent = itemNumbers;
		}
	}

	// function calls
	onLoadCartNumbers();
	displayCart();
	
	// adds total of cart items
	function totalCost(Item, action) {
		let cartCost = localStorage.getItem('totalCost');

		if(action == "decrease") {
			cartCost = parseInt(cartCost)

			localStorage.setItem("totalCost", cartCost - Item.price);
		} else if (cartCost != null) {
			cartCost = parseInt(cartCost);
			localStorage.setItem("totalCost", cartCost + Item.price);
		} else {
			localStorage.setItem("totalCost", Item.price);
		}
	}

	// modal notification when items are added to the cart
	function displayModal() {
		let cartItems = localStorage.getItem("itemsInCart");
		cartItems = JSON.parse(cartItems);
		modal.style.display = "block";

			if (cartItems && modal) {
				modal.innerHTML = '';
				Object.values(cartItems).map(item => {
					modal.innerHTML += 
					`
				<div class="modal-content">
				<span class="close">&times;</span>
				<h4>Item Added to Cart!</h4>
				<div class="item">
					<img class="item-image" src="${item.image}">
					<span>${item.name}</span>
					<div class="item-price">$ ${item.price},00</div>
					<ion-icon name="close-circle-outline"></ion-icon>
				</div>
				<a href="/Cart.html"><button class="view-cart">View Cart</button></a>
			  </div>
				`
				})
			}
		
			let closeModal = document.querySelector(".close");

			closeModal.addEventListener('click', () => {
				modal.style.display = "none";
			})
		
			window.onclick = (e) => {
				if(e.target == modal) {
					modal.style.display = "none";
				}
			}
	}

	// cart interface
	function displayCart() {
		let cartItems = localStorage.getItem("itemsInCart");
		cartItems = JSON.parse(cartItems);
		let itemContainer = document.querySelector(".items");
		let cartCost = localStorage.getItem('totalCost');

		if (cartItems && itemContainer ) {
			itemContainer.innerHTML = '';
			Object.values(cartItems).map(item => {
				itemContainer.innerHTML += `
					<div class="item">
						<div>
						<ion-icon class="remove-item" name="close-circle-outline"></ion-icon>
						<img class="item-image" src="${item.image}">
						<span>${item.name}</span>
						</div>
						<div class="item-quantity">
							<ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
							<span class="in-cart">${item.inCart}</span>
							<ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>
						</div>
						<div class="item-total">$ ${item.inCart * item.price},00</div>
					</div>
					
				`
			});

			itemContainer.innerHTML += `
				<div class="cartTotalContainer">
					<h4 class="cartTotalTitle">
						CART TOTAL
					</h4>
					<h4 class="cartTotal">
						$ ${cartCost},00
					</h4>
				</div>
			`
			
		}
		deleteItem();
		manageQuantity();
	}

	// deletes items from cart local storage and cart interface
	function deleteItem() {
		let deleteItems = document.querySelectorAll('.remove-item');
		let itemName;
		let itemNumbers = localStorage.getItem('cartNumbers');
		let cartItems = localStorage.getItem("itemsInCart");
		cartItems = JSON.parse(cartItems);
		let cartCost = localStorage.getItem('totalCost');

		for(let i = 0; i < deleteItems.length; i++) {
			deleteItems[i].addEventListener('click', () => {
			itemName = deleteItems[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');

			localStorage.setItem("cartNumbers", itemNumbers - cartItems[itemName].inCart);
			localStorage.setItem("totalCost", cartCost - ( cartItems[itemName].price * cartItems[itemName].inCart ));

			delete cartItems[itemName];
			localStorage.setItem('itemsInCart', JSON.stringify(cartItems));

			displayCart();
			onLoadCartNumbers();
			}
		)}
	}
	
	// manages increase and decrease quantity on items in cart
	function manageQuantity() {
		let decreaseButtons = document.querySelectorAll('.decrease');
		let increaseButtons = document.querySelectorAll('.increase');
		let cartItems = localStorage.getItem('itemsInCart');
		cartItems = JSON.parse(cartItems);
		let currentQuantity = 0;
		let currentProduct = '';
		
	
		for(let i=0; i < decreaseButtons.length; i++) {
			decreaseButtons[i].addEventListener('click', () => {
			currentQuantity = decreaseButtons[i].parentElement.querySelector('span.in-cart').textContent;
			currentProduct = decreaseButtons[i].parentElement.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();

			if(cartItems[currentProduct].inCart > 1) {
			cartItems[currentProduct].inCart -= 1;
			cartNumbers(cartItems[currentProduct], "decrease");
			totalCost( cartItems[currentProduct], "decrease" )
			localStorage.setItem('itemsInCart', JSON.stringify(cartItems));

			displayCart();
			}
		})

		for(let i=0; i < increaseButtons.length; i++) {
			increaseButtons[i].addEventListener('click', () => {
			currentQuantity = increaseButtons[i].parentElement.querySelector('span.in-cart').textContent;
			currentProduct = increaseButtons[i].parentElement.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();

			cartItems[currentProduct].inCart += 1;
			cartNumbers(cartItems[currentProduct]);
			totalCost( cartItems[currentProduct] )
			localStorage.setItem('itemsInCart', JSON.stringify(cartItems));

			displayCart();
		});

	}
}}

	// TABS
	function checkoutOption(evt, option) {
		let i, tabcontent, tablinks;
	

	// get all elements "tabcontent" and hide them 
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	//get all elements "tablinks" and remove the class active
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// show the current tab and add active class to the btn that opened the tab 
	document.getElementById(option).style.display = "block";
	evt.currentTarget.className += " active";

	}
	checkoutOption();

	function subscriptions() {
		let subs = document.getElementById("subscribe-btn");

		subs.addEventListener('click', function() {
			alert('You have subscribed successfully');
		})
	}
})

	


//==========================================================END OF CODE======================================================================
