$(document).ready(function(){

    var table = $("#taskTable").DataTable({
        order: [[1, "desc"]], //sortuje malejaco
        columnDefs: [
            {
                targets: 1, // kolumny rpiorytetu
                render: function (data, type, row) {

                    // sortowanie
                    if (type === "sort") {
                        if (data === "Wysoki") return 3;
                        if (data === "Średni") return 2;
                        if (data === "Niski") return 1;
                        return 0;
                    }

                    // wyswietlanie kolorowe
                    if (data === "Wysoki")
                        return "<span style='color:#ff4d94; font-weight:bold;'>Wysoki</span>";

                    if (data === "Średni")
                        return "<span style='color:#ff9f43; font-weight:bold;'>Średni</span>";

                    if (data === "Niski")
                        return "<span style='color:#1dd1a1; font-weight:bold;'>Niski</span>";

                    return data;
                }
            }
        ],
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

    // ciemny tryb
    $("#darkModeBtn").click(function(){
        $("body").toggleClass("dark-mode");

        if($("body").hasClass("dark-mode")){
            $(this).text("☀ Tryb jasny");
        } else {
            $(this).text("🌙 Tryb ciemny");
        }
    });

    // walidacja formularza
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

            var doneBtn = "<button class='btn btn-sm btn-success doneBtn'>✔</button>";
            var deleteBtn = "<button class='btn btn-sm btn-danger deleteBtn'>✖</button>";

            table.row.add([
                taskName,
                priority,
                doneBtn,
                deleteBtn
            ]).draw(false);

            // Od razu sortuje ponownie po dodaniu
            table.order([1, 'desc']).draw();

            $("#taskForm")[0].reset();

            $(".table-box").hide().fadeIn(600);
        }
    });

    // usuwanie
    $("#taskTable tbody").on("click", ".deleteBtn", function(){

        var row = $(this).closest("tr");

        row.fadeOut(400, function(){
            table.row(row).remove().draw();
        });
    });

    // oznaczanie jako wykonane
    $("#taskTable tbody").on("click", ".doneBtn", function(){

        var row = $(this).closest("tr");

        if(!row.hasClass("done-task")){

            row.addClass("done-task");

            row.find("td:eq(0)").append("<span class='done-badge'> WYKONANE</span>");

            row.animate({opacity: 0.7}, 200).animate({opacity: 1}, 200);

        } else {

            row.removeClass("done-task");
            row.find(".done-badge").remove();
        }
    });

    // hover
    $("#taskTable tbody").on("mouseenter", "tr", function(){
        $(this).animate({opacity: 0.8}, 150);
    });

    $("#taskTable tbody").on("mouseleave", "tr", function(){
        $(this).animate({opacity: 1}, 150);
    });

    // efekt pisania
    $("#taskName").keyup(function(){
        $(this).css("border", "2px solid #ff6fa5");
    });

});
