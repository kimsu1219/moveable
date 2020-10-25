const makeDiv = () => {
  return document.createElement('div')}
const setting = (elename, property) => {
  return Object.assign(elename.style, property)
} 
const comp = (value, min, max) => Math.min(max, Math.max(min, value));

// const VIEW_WIDTH = 300;
// const VIEW_HEIGHT = 300;
// const VIEW_TOP = 40;
// const VIEW_LEFT = 30;

// const view = makeDiv();
// setting(view, {
//     position: 'relative',
//     width: `${VIEW_WIDTH}px`,
//     height: `${VIEW_HEIGHT}px`,
//     top: `${VIEW_TOP}px`,
//     left: `${VIEW_LEFT}px`,
//     border: '1px solid black'
// });
// document.body.appendChild(view);

class Movediv {
  pressed = false;
  constructor({width = 0, height = 0, width_min = 0, width_max = 0, height_min = 0, height_max = 0} = {}) {
    this.element = makeDiv();
    this.init({width, height, width_min, width_max, height_min, height_max})
    setting(this.element, {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: 'coral',
      top: 0,
      left: 0,
    })
    document.body.appendChild(this.element);

    this.element.addEventListener('pointerdown', ({offsetX = 0, offsetY = 0} = {}) => {
      this.pressed = true;
      this.offset_x = offsetX
      this.offset_y = offsetY;
    });
    
    window.addEventListener('pointermove', ({pageX = 0, pageY = 0} = {}) => {
      if (!this.pressed) return; 

      this.now_left = pageX - this.offset_x ;
      this.now_top = pageY - this.offset_y;
      this.move();
    });
    
    window.addEventListener('pointerup', () => {
      this.pressed = false;
    });
    window.addEventListener('resize', () => {
      //move이벤트 일어나기 전
      // if (this.left == undefined) this.left = VIEW_LEFT + VIEW_WIDTH/2 - width/2;
      // if (this.top == undefined) this.top = VIEW_TOP + VIEW_HEIGHT/2 - height/2
      
      if (this.left + width > window.innerWidth) {
        this.left -= (this.left + width - window.innerWidth) // 창에 겹쳐진 만큼 밀어주기
        if (this.left <= this.width_min) {
          this.left = this.width_min
        }
      }
      if (this.top + height > window.innerHeight) {
        this.top -= (this.top + height - window.innerHeight)
        if (this.top <= this.height_min) {
          this.top = this.height_min 
        }
      }

      this.element.style.transform = `translateX(${this.left}px) translateY(${this.top}px)`;
    })
  }

  setBound(ele) { 
    const rect = ele.getBoundingClientRect();

    this.init({
      width_min: rect.left + window.scrollX,
      height_min: rect.top + window.scrollY, 
      width_max: rect.width + rect.left + window.scrollX,
      height_max: rect.height + rect.top + window.scrollY,
    })
  }
  
  // init(property) {
  init({width = this.width, height = this.height, width_min, width_max, height_min, height_max} = {}) {
    Object.assign(this, {width, height, width_min, width_max, height_min, height_max})
    this.element.style.transform ='translateX(' + (this.width_min) + 'px) translateY(' + (this.height_min) + 'px )'
    console.log(this)
    }

  move() {
    this.left = comp(this.now_left, this.width_min, this.width_max-this.width);
    this.top = comp(this.now_top, this.height_min, this.height_max-this.height);
    this.element.style.transform = `translateX(${this.left}px) translateY(${this.top}px)`;
  }
  

}

const div = makeDiv();
setting(div, {
    position: 'relative',
    width: '800px',
    height: '400px',
    top: '50px',
    left: '100px',
    border: '1px solid black'
});
document.body.appendChild(div);

const movediv = new Movediv({
  width: 100, 
  height: 100, 
  width_max: 400, 
  width_min: 100,
  height_max: 400,
  height_min: 100
}); 

movediv.setBound(div)









    // this.width_min = rect.left + window.scrollX;
    // this.height_min = rect.top + window.scrollY;
    // this.width_max = rect.width + rect.left + window.scrollX;
    // this.height_max = rect.height + rect.top + window.scrollY;
    // const getbound = {
      // width_min: setbound.left,
      // height_min: setbound.top,
      // width_max : setbound.width + setbound.left,
      // height_max: setbound.height + setbound.top
    // }
    // Object.assign(this, getbound)

  // appendTo(parent) {
  //   parent.appendChild(this.element);
  // }

// const getbound = view.getBoundingClientRect();
// const minmax = {
//   width_min: getbound.left,
//   height_min: getbound.top,
//   width_max : getbound.width - moveevent.width,
//   height_max: getbound.height - moveevent.height
// }
// Object.assign(moveevent, minmax)

  // putdiv() {
  // const load_x = window.innerWidth/2 - this.width/2;
  // const load_y = window.innerHeight/2 - this.height/2;
  
  // const loadleft = comp(load_x, this.width_min, this.width_max);
  // const loadtop = comp(load_y, this.height_min, this.height_max);

  // // console.log()
  // this.element.style.transform = `translateX(${loadleft}px) translateY(${loadtop}px)`;
  // }

// const width_min = getbound.left;
// const height_min = getbound.top;
// const width_max = getbound.width - moveevent.width;
// const height_max = getbound.height - moveevent.height;

// Object.assign(moveevent, {
  // width_min: `${width_min}`, height_min: `${height_min}`, width_max: `${width_max}`, height_max: `${height_max}`
// })
  // 축개수 * 2
  
  //styleX -> getBoundingrect()  
  // const width_min = view.style.left.replace(/[^0-9]/g, '');
  // const height_min = view.style.top.replace(/[^0-9]/g, '');

  
  // //left,top 50%, translate -50%로 가운데 정렬 후 움직임
      // top: '50%',  
      // left: '50%',
      // transform: 'translateX(-50%) translateY(-50%)'
    // const now_left = this.now_x - this.offset_x - window.innerWidth/2;
    // const now_top = this.now_y - this.offset_y - window.innerHeight/2;
    // const maxLeft = window.innerWidth/2 - this.width;
    // const maxTop = window.innerHeight/2 - this.height;
    // const minLeft = -window.innerWidth/2;
    // const minTop = -window.innerHeight/2;

    // min, max를 window창크기로 잡아줄때
    // this.maxTop = window.innerHeight - this.height;
    // this.maxLeft = window.innerWidth - this.width;
    // this.minTop = 0;
    // this.minLeft = 0;

  // getLocation() { // 순수함수 또는 합치기
  //   this.now_left = this.now_x - this.offset_x ;
  //   this.now_top = this.now_y - this.offset_y;
    
  //   this.maxLeft = this.max;
  //   this.maxTop = this.max;
  //   this.minLeft = this.min;
  //   this.minTop = this.min;

  //   if (this.max > window.innerHeight - this.height) {
  //     this.maxTop = window.innerHeight - this.height
  //   }
  //   if (this.max > window.innerWidth - this.width) {
  //     this.maxLeft = window.innerWidth - this.width
    // }
