let arr = [];
// for each button with the .btn class, listen for a click event
for(let butt of document.querySelectorAll(".btn")) {
    butt.addEventListener("click", function() {
        // when clicked, store the value of the clicked button in the value variable
        let value = document.getElementById("textarea").value = this.innerHTML;
        // multiple values should be pushed into the arr
        arr.push(value);
        // attempting to use the arr as a parameter for the calc function
        calc(arr);
    });
}
// when a button is pressed, push the pressed key into the arr
document.addEventListener("keypress", function(event) {
    arr.push(event.key);
    // again trying to use the arr as a parameter for the calc function
    calc(arr);
})

calc = (arr, operator) => {return add(arr)};
add = (arr) => {
    arr.reduce((a, b) => a + b);
};

subtract = (arr) => {
    arr.reduce((a, b) => a - b);
};