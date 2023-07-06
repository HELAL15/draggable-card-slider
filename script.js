const wrapper = document.querySelector('.wrapper');
const carousal = document.getElementById('carousal');
const arrowBtn = document.querySelectorAll('.wrapper i');
const firstCardWidth = carousal.querySelector('.card').offsetWidth;
const carousalChildren = [...carousal.children];

let isDragging = false , startX , startScrollLeft , timeoutId;
// get the number of cards that can fit in the carousal at once
let cardPreview = Math.round(carousal.offsetWidth / firstCardWidth);
//
carousalChildren.slice(-cardPreview).reverse().forEach(card=>{
  carousal.insertAdjacentHTML("afterbegin" , card.outerHTML)
});
//
carousalChildren.slice(0 , cardPreview).forEach(card=>{
  carousal.insertAdjacentHTML("beforeend" , card.outerHTML)
});


// func to make the carousal scroll to the left or right when click on the arrow btn
arrowBtn.forEach(btn =>{
  btn.addEventListener('click',()=>{
    console.log(btn.id)
    carousal.scrollLeft += btn.id === 'left' ? - firstCardWidth : firstCardWidth;
  })
});
// func to start dragging which make var isDragging`s value is true 
const dragStart = (e)=>{
  isDragging = true;
  carousal.classList.add('drag');
  //record the initial cursor and scroll position of the carousal
  startX = e.pageX;
  startScrollLeft =carousal.scrollLeft;
}
// func to end dragging which make var isDragging`s value is false 
const dragEnd =()=>{
  isDragging = false;
  carousal.classList.remove('drag');
}
// func to dragging
const dragging = (e)=>{
  //check isDragging value if false return from here
  if(!isDragging){
    return;
  }
  //to scroll left
  carousal.scrollLeft = startScrollLeft - (e.pageX - startX);
  console.log(e.pageX)
}

const autoPlay =()=>{
  if(window.innerWidth < 800) return;
  timeoutId = setTimeout(()=> carousal.scrollLeft += firstCardWidth , 1500);
}
autoPlay();

// func to loop the carousal when it reach to the end
const infiniteScroll = ()=>{
  if(carousal.scrollLeft === 0 ){
    carousal.classList.add('no-transition');
    console.log('you have reached to the left end');
    carousal.scrollLeft = carousal.scrollWidth - (2* carousal.offsetWidth);
    carousal.classList.remove('no-transition');
  }else if(carousal.scrollLeft === carousal.scrollWidth - carousal.offsetWidth){
    carousal.classList.add('no-transition');
    console.log('you have reached to the right end');
    carousal.scrollLeft = carousal.offsetWidth;
    carousal.classList.remove('no-transition');
  }

  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
}


wrapper.addEventListener('mouseenter', ()=> clearTimeout(timeoutId));

wrapper.addEventListener('mouseleave', autoPlay);



//event to run the func while mouse move
carousal.addEventListener('mousemove' , dragging);
//event to run the func while mouse down
carousal.addEventListener('mousedown', dragStart);
//event to run the func while mouse up
document.addEventListener('mouseup', dragEnd);
//event to loop scroll when items end
carousal.addEventListener('scroll', infiniteScroll);

