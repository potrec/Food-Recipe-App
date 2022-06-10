export class UI {
    // Print message
    printMessage(message,className){
        const div = document.createElement('div');
    //ADD the HTML
    div.innerHTML = `
        <div class="alert alert-dismissible alert-${className}">
            <button type="button" class="close" data-dismiss="alert">x</button>
            ${message}
        </div>
        `;

        // Insert before

        const reference = document.querySelector('.meal-search h2');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div,reference);

        //Remove the alert after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();

        }, 3000);
    }

}   