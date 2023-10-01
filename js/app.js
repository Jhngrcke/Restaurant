// Create an element to save what is clicked on to browser session storage.
function save_function() {
    let data = $(this).parent().parent().parent();
    // Act accordingly to different elements
    if ($(this).parent().parent().attr('class') === 'drop-img') {
        let name = $(this).parent().siblings().attr('alt');
        let href = $(this).parent().siblings().attr('src');
        window.sessionStorage.setItem(name, href);
    } else {
        let name = data.children()[0].innerText.split('\n')[0];
        let price = data.children()[1].innerText;
        window.sessionStorage.setItem(name, price)
    }
    alert(`You have ${window.sessionStorage.length} items in your save folder`);
}


$(document).ready(() => {
    $(".drop-item").hover(function () {
        // Create the dropdown element and append it to the target element.
        let dropdiv = document.createElement("DIV");
        dropdiv.className = "dropdown";
        let tag = document.createElement("A");
        tag.onclick = save_function;
        tag.innerHTML = "Save for later";
        dropdiv.append(tag);
        $(this).children()[0].append(dropdiv);
        $('.dropdown').slideToggle(function () {
            $(this).css({'color': 'green'});
        }
        ).css({'color': 'blue'});
    }, function () {
        // Since the target changes based on where the hover event was triggered, remove all occurrences of the div in all elements.
        // This also fixes a bug where sometimes after clicking the element isn't deleted.
        $('.dropdown').slideToggle(function () {
            $('*').remove('.dropdown');
        });
    });


    $('.drop-img').hover(function () {
        // Create the dropdown element and append it to the target element.
        let dropdiv = document.createElement("DIV");
        dropdiv.className = "dropdown";
        let tag = document.createElement("A");
        tag.onclick = save_function;
        tag.innerHTML = "Save for later";
        dropdiv.append(tag);
        $(this).append(dropdiv);
        $('.dropdown').slideToggle(function () {
            $(this).css({'color': 'green'});
        }
        ).css({'color': 'blue'});
    }, function () {
        $('.dropdown').slideToggle(function () {
            $('*').remove('.dropdown');
        })
    });

    $(".comment_form").on("submit", (ev) => {
        ev.preventDefault();
        let name = $("input[name='username']").val();
        let surname = $("input[name='surname']").val();
        let comment = $("#commentbox").val();
        // Clear the form.
        ev.target.reset();
        // I wanted a way to let the user know their comment has been submitted for review
        // https://stackoverflow.com/questions/2765945/jquery-remove-append-after-5-seconds
        // The second answer in this form was ideal. 
        $(".comment_form").append("<span id='tmp'><span>");
        $("#tmp").delay(100).fadeOut(200, function() {
            $(this).html(`Dear ${name} ${surname}, your comment has been submitted for curation. Thank you.`).fadeIn(200).fadeOut(5000, function() {
                // Remove the element as a callback after the fadeOut function has been completed.
                $("#tmp").remove();
            });
        });
    });

    if (!window.sessionStorage.length) {
        $('#saved_items').append('<p>You have no saved items</p>');
    } else {
        for (let i = 0; i < sessionStorage.length; i++) {
            $('#saved_items').append(`<p>${sessionStorage.key(i)}: ${sessionStorage.getItem(sessionStorage.key(i))}`);
        }
    }
});
