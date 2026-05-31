interface Person {
    name: string;
}

// 继承
interface Employee extends Person {
    job: string;
}

type PersonType = {
    name: string
}

// 类型声明
type EmployeeType = PersonType & {
    job: string
}