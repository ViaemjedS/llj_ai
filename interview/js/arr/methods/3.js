const people = [
    {name: '张三', age: 17, role: 'user'},
    {name: '李四', age: 19, role: 'user'},
    {name: '王五', age: 20, role: 'admin'}
]

const allAdults = people.every(person => person.age >= 18);
const hasAdmin = people.some(person => person.role === 'admin');
console.log(allAdults)
console.log(hasAdmin)