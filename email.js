//update this with your js_form selector
let form_id_js = "contact-form";

let data_js = {
    access_token: "j9s54ei45q3libkbts1hsjng",
};

function js_onSuccess() {
    // remove this to avoid redirect
    sendButton.disabled = false;
    sendButton.value = "Sucessfully sent ✅";
    console.log("Sucessfully sent ✅");
    reset_btn();
}

function js_onError(error) {
    // remove this to avoid redirect
    sendButton.disabled = false;
    sendButton.value = "Something went wrong ⚠️";
    console.log(error + "⚠️");
    reset_btn();
}

let sendButton = document.getElementById("submit-btn");

const reset_btn  = () => {
    setTimeout(() => {
        sendButton.value = "Send";        
    }, 1500);
}

function js_send() {
    sendButton.value = "Sending…";
    sendButton.disabled = true;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else if (request.readyState == 4) {
            js_onError(request.response);
        }
    };

    let subject = document.querySelector(".contact-subject").value;
    let message = document.querySelector(".contact-msg").value;
    let email = document.querySelector(".contact-email").value;
    let name = document.querySelector(".contact-name").value;
    
    data_js["subject"] = subject;
    let msg = "=================Name========================\n";
    msg += `Sent by ${name}\n`;
    msg += "=================Email======================\n"
    msg += `From email: ${email}\n`;
    msg += "===============Message======================\n";
    msg += message
    data_js["text"] = msg;
    let params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    let form_data = [];
    for (let key in data_js) {
        form_data.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key])
        );
    }

    return form_data.join("&");
}

let js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});