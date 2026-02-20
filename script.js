$(document).ready(function(){


//  DataTables język PL

var table = $("#taskTable").DataTable({
    language: {
        search: "Szukaj:",
        lengthMenu: "Pokaż _MENU_ wpisów",
        info: "Wyświetlanie _START_ do _END_ z _TOTAL_ zadań",
        paginate: {
            next: "Dalej",
            previous: "Wstecz"
        }
    }
});

// tryb ciemny
$("#darkModeBtn").click(function(){

    $("body").toggleClass("dark-mode");

    if($("body").hasClass("dark-mode")){
        $(this).text("☀ Tryb jasny");
    } else {
        $(this).text("🌙 Tryb ciemny");
    }
});


//walidacja formularza
$("#taskForm").validate({
    rules: {
        taskName: {
            required: true,
            minlength: 3
        },
        priority: {
            required: true
        }
    },
    messages: {
        taskName: "Wpisz minimum 3 znaki",
        priority: "Wybierz priorytet"
    },

    submitHandler: function(form){

        var taskName = $("#taskName").val();
        var priority = $("#priority").val();

        // Kolorowe priorytety
        if(priority === "Wysoki"){
            priority = "<span style='color:#ff4d94; font-weight:bold;'>Wysoki</span>";
        }
        if(priority === "Średni"){
            priority = "<span style='color:#ff9f43; font-weight:bold;'>Średni</span>";
        }
        if(priority === "Niski"){
            priority = "<span style='color:#1dd1a1; font-weight:bold;'>Niski</span>";
        }

        var doneBtn = "<button class='btn btn-sm btn-success doneBtn'>✔</button>";
        var deleteBtn = "<button class='btn btn-sm btn-danger deleteBtn'>✖</button>";

        table.row.add([
            taskName,
            priority,
            doneBtn,
            deleteBtn
        ]).draw(false);

        $("#taskForm")[0].reset();

        // Animacja pojawienia
        $(".table-box").hide().fadeIn(600);
    }
});


//usuwanie zadania
$("#taskTable tbody").on("click", ".deleteBtn", function(){

    var row = $(this).closest("tr");

    row.fadeOut(400, function(){
        table.row(row).remove().draw();
    });
});

//oznacz jako wykonane
$("#taskTable tbody").on("click", ".doneBtn", function(){

    var row = $(this).closest("tr");

    if(!row.hasClass("done-task")){

        row.addClass("done-task");

        // Dodaj badge WYKONANE
        row.find("td:eq(0)").append("<span class='done-badge'> WYKONANE</span>");

        row.animate({opacity: 0.7}, 200).animate({opacity: 1}, 200);

    } else {

        row.removeClass("done-task");
        row.find(".done-badge").remove();
    }
});


//hover efekt
$("#taskTable tbody").on("mouseenter", "tr", function(){
    $(this).animate({opacity: 0.8}, 150);
});

$("#taskTable tbody").on("mouseleave", "tr", function(){
    $(this).animate({opacity: 1}, 150);
});


//efekt podczas pisania
$("#taskName").keyup(function(){
    $(this).css("border", "2px solid #ff6fa5");
});

});
