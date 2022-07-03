/**
 * 联合类型（｜）
 * - 语法：T | U
 * - 用法：假设声明一个数据，既可以是 string 类型，也可以是 number 类型
 */
let stringOrNumber: string | number = 0;

class Bird {
  fly() {
      console.log('Bird flying');
  }
  layEggs() {
      console.log('Bird layEggs');
  }
}

class Fish {
  swim() {
      console.log('Fish swimming');
  }
  layEggs() {
      console.log('Fish layEggs');
  }
}

const bird = new Bird();
const fish = new Fish();

function start(pet: Bird | Fish) {
  // 调用 layEggs 没问题，因为 Bird 或者 Fish 都有 layEggs 方法
  pet.layEggs();

  // 会报错：Property 'fly' does not exist on type 'Bird | Fish'
  // pet.fly();

  // 会报错：Property 'swim' does not exist on type 'Bird | Fish'
  // pet.swim();
}

start(bird);

start(fish);