$(document).ready(function () 
{
    bindContactForm();
});

function bindContactForm()
{
    $("#submit").click(sendMail);
    $("input").keyup(getInput)
}

function sendMail(el)
{
    var form = $(el.currentTarget).closest("#form");
    var data = validateForm(form);
    if(data)
    {
        $(form).addClass('disabled');
        $(form).find("#sending .response").html("Sending Message...");
        $(form).find("#sending img").show();
        $(form).find("#sending").fadeIn(400);

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            //url: "http://localhost:7000/send",
            url: "https://premiercctvinstalls.co.uk/send",
            success: (res) =>
            {
                $(form).removeClass('disabled');
                $(form).find("#sending .response").html("Sent! We'll be back in touch soon.");
                $(form).find("#sending img").hide();
                $(form).find("#sending").delay(4000).fadeOut(400);
                clearForm();
            },
            error(err)
            {
                $(form).removeClass('disabled');
                $(form).find("#sending .response").html("Something went wrong, please try again.");
                $(form).find("#sending img").hide();
            }
        });
    }
}

function validateForm(form)
{
    // Check required text elements
    validateRequired();

    // Check required group elements
    validateGroups();

    // Finally check for any errors before returning data
    if (getErrors()) { return null; }
    else
    {
        return {
            name: $("#form #name").val(),
            email: $("#form #email").val(),
            number: $("#form #number").val(),
            message: $("#form #message").val(),
        }    
    }
}

function getErrors()
{
    return $("#form").children('input').toArray().filter(a => $(a).hasClass('error')).length;
}
function getInput(el)
{
    validateInput($(el.currentTarget));
    validateGroups();
}
function validateInput(input)
{
    switch ($(input).data('type'))
    {
        case 'text': { validateText(input); break; }
        case 'number': { validateNumber(input); break; }
        case 'email': { validateEmail(input); break; }
    }
}

function validateText(input)
{
    showError(input, $(input).val() == "");
}

function validateNumber(input)
{
    var regex = /^(?:(?:00)?44|0)7(?:[45789]\d{2}|624)\d{6}$/;
    var number = $(input).val(); 

    // Remove + if there is one
    if (number.length > 3 && number.substr(0, 3) == "+44") { $(input).val(number.replace("+44", 0)); }

    showError(input, !regex.test(number) && number.length > 0);
}

function validateEmail(input)
{
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = $(input).val();
    
    showError(input, !regex.test(email.toLowerCase()) && email.length > 0);
}

function validateRequired()
{
    var requiredElements = $("#form").children('input[data-required="true"]').toArray();
    requiredElements.forEach((input) => { validateText(input); });
}

function validateGroups()
{
    var groupElements = $("#form").children('input[data-required="group"]').toArray();
    var emptyGroupEls = groupElements.filter(a => $(a).val() == "");
    if (emptyGroupEls.length == groupElements.length)
    {
        $(groupElements).removeClass("ok");
        $(groupElements).addClass("error");
        $("#form .requirement").show();
    }
    else
    {
        $("#form .requirement").hide();
        $(groupElements).each((i, el) => { validateInput($(el)) });
    }
}

function showError(input, error)
{ 
    if (error)
    {
        $(input).addClass('error');
        $(input).removeClass('ok');
        $(input).nextAll('.invalid').first().show();
    }
    else
    {
        $(input).addClass('ok');
        $(input).removeClass('error');
        $(input).nextAll('.invalid').first().hide();
    }
}

function clearForm()
{
    $("#form input").val("");
    $("#form textarea").val("");
    $("#form input").removeClass("error");
    $("#form input").removeClass("ok");
    $("#form textarea").removeClass("ok");
    $("#form .invalid").hide();
    $("#form .requirement").hide();
}