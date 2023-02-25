import http from "@/utils/http"
// import axios from "axios"

//删除学生
export async function delStudent(ids) {
    const {data} = await http.delete('http://localhost/student',{ids: ids})
    return data
}

// 删除教师
export async function delTeacher(ids) {
    const {data} = await http.delete('http://localhost/teacher',{ids: ids})
    return data
}

// 获取试卷
export async function getTestPaper(id) {
    const {data} = await http.get('http://localhost/testPaper',{id: id})
    return data
}

// 删除试卷
export async function delTestPaper(id) {
    const {data} = await http.delete('http://localhost/testPaper',{id: id})
    return data
}

// 添加问题
export async function putQuestion(question) {
    const {data} = await http.put('http://localhost/question',question)
    return data
}

// 添加题库
export async function addQuestionBank(name) {
    const {data} = await http.post('http://localhost/questionBank',{name: name})
    return data
}

// 删除题库
export async function delQuestionBank(id) {
    const {data} = await http.del('http://localhost/questionBank',{id: id})
    return data
}

// 学生获取课程
export async function getCourse(course) {
    const {data} = await http.get('http://localhost/courseSelection/course',{course: course})
    return data
}
