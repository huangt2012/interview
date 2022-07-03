/**
 * 交叉类型(&)
 * 交叉类型是将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性
 * - 语法：T & U
 * - 用法：假设有两个接口：一个是 Ant 蚂蚁接口，一个是 Fly 飞翔接口，现在有一只会飞的蚂蚁：
 */
 interface Ant {
  name: string;
  weight: number;
}

interface Fly {
  flyHeight: number;
  speed: number;
}

// 少了任何一个属性都会报错
const flyAnt: Ant & Fly = {
  name: '蚂蚁呀嘿',
  weight: 0.2,
  flyHeight: 20,
  speed: 1,
};