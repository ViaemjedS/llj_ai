interface Animal {
    name: string;
}

interface Animal {
    age: number;
}

const dragon: Animal = {
    name: '奶龙',
    age: 1
}

type AnimalType = {name: string}
type AnimalType2 = AnimalType & {age: number}