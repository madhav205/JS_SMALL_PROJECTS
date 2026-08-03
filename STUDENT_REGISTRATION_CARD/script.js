function registerStudent() {

    let student = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        course: document.getElementById("course").value
    };

    document.getElementById("studentName").innerHTML = student.name;
    document.getElementById("studentAge").innerHTML = student.age;
    document.getElementById("studentCourse").innerHTML = student.course;

    document.getElementById("card").style.display = "block";
}