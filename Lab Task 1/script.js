$(document).ready(function () {
    $("#registrationForm").validate({
        rules: {
            full_name: {
                required: true,
                minlength: 2 
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6 
            },
            confirm_password: {
                required: true,
                equalTo: "#password" 
            }
        },
        messages: {
            full_name: {
                required: "Please enter your full name.",
                minlength: "Full name must be at least 2 characters long."
            },
            email: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            },
            password: {
                required: "Please enter a password.",
                minlength: "Password must be at least 6 characters long."
            },
            confirm_password: {
                required: "Please confirm your password.",
                equalTo: "Passwords do not match."
            }
        },
        submitHandler: function (form) {
            alert("Registration successful!")
        }
    });
});
