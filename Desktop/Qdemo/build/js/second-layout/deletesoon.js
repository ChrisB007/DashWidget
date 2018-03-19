"use strict";
$(document).ready(function () {
    $("#social-select").change(function () {
        fetchKeyWord();
    })
    function o(o) {
        $(o).block({
            message: "<div class='sk-three-bounce'><div class='sk-child sk-bounce1'></div><div class='sk-child sk-bounce2'></div><div class='sk-child sk-bounce3'></div></div>",
            css: {border: "none", backgroundColor: "transparent"},
            overlayCSS: {backgroundColor: "#FAFEFF", opacity: .5, cursor: "wait"}
        })
    }

    function e(o) {
        $(o).unblock()
    }

    $(".hamburger-menu").on("click", function () {
        $(this).toggleClass("active"), $("body").toggleClass("sidebar-toggled")
    }), $(".search-bar-toggle").on("click", function () {
        $(".search-bar").toggleClass("closed")
    }), $(".right-sidebar-toggle").on("click", function () {
        $(".right-sidebar").toggleClass("closed")
    }), $(".conversation-toggle").on("click", function () {
        $(".conversation").toggleClass("closed")
    }), $(".setting-toggle").on("click", function () {
        $(".setting").toggleClass("closed")
    }), $("[data-toggle='tooltip']").tooltip(), $("[data-toggle='popover']").popover(), $(".widget-collapse").on("click", function () {
        $(this).closest(".widget").find(".widget-body").slideToggle(300), $(this).find("i").toggleClass("ti-angle-up ti-angle-down")
    }), $(".widget-reload").on("click", function () {
        var s = $(this).closest(".widget");
        o(s), window.setTimeout(function () {
            e(s)
        }, 3e3)
    }), $(".widget-remove").on("click", function () {
        $(this).closest(".widget").hide()
    }), $(".progress").length > 0 && $(".progress .progress-bar").progressbar(), $(".animated").animo({duration: .2})
});

function fetchKeyWord(keyword) {
    $("#search-term").hide();
    $("#loader").show();
    $("#container").hide();
    if (keyword) {
        $(".grid-column").html(" ");
        $.get('../build/js/page-content/JSON/data.json?keyword=' + keyword, function (data) {
            var counter = 0;
            $("#loader").hide();
            $("#container").show();

            var sentiments = {
                'very-negative': 0,
                'negative': 0,
                'neutral': 0,
                'positive': 0,
                'very-positive': 0,
            }
            data.forEach(function (column) {
                var keyword;

                column.forEach(function (item) {
                    item.word;
                    var img = "<div class='img' style='background-image: url(" + item.post_url + ")'>";
                    var cssClass = item.sentiment_enum.replace(" ", "-");
                    sentiments[cssClass]++;
                    var overlay = $("<div class='overlay'></div>");
                    var gridColumn = $(".grid-container .grid-column" + counter);
                    overlay.click(function (){
                        var modal = $("#modal");
                        var comment = item.comment_data[0];
                        modal.find('.overlay-bg').attr('src', item.post_url);
                        modal.find(".name").text(item.fullname);
                        modal.find('.username').text(item.username);
                        modal.find(".user-img").attr('src', comment.owner.profile_pic_url);//update-this
                        modal.find(".text").text(item.text);
                        modal.find(".num_comments").text(item.comment_count);
                        modal.find('.engagement').text(item.sentiment_enum);
                        modal.find('.likes').text(item.like_count);
                        modal.find('.bg-black').removeClass('very-positive').removeClass('positive').removeClass('neutral').removeClass('negative').removeClass('very-negative');
                        modal.find('.bg-black').addClass(cssClass);
                        var comment_div = $(modal.find('.comments')[0]);
                        item.comment_data.forEach(function(comment){
                            comment_div.append("<div class='comment'>@" + comment.owner.username + " said: " +comment.text+"</div>");
                        });
                        $("#modal").modal('show');
                    });
                    var gridItem = $("<div class='grid-item " + cssClass + "'>" + img + "</div>");
                    gridColumn.append(gridItem);
                    gridItem.append(overlay);
                });

                $(".grid-container-fixed .grid-column" + counter).append("<div class='grid-item vertical'>" + keyword + "</div>");
                counter++;
            });
            for (var i in sentiments) {
                console.log($("#instagram-right ." + i) );
                $("#instagram-right ." + i).text(sentiments[i]);
            }
        })
    } else {
        $("#search-term").show();
    }
}

$(function () {
    $("#search").change(function (e) {
        e.preventDefault();
        fetchKeyWord($(this).val());
    })
    $("#keyword-form").submit(function (e) {
        e.preventDefault();

    })
});

function myhouse(){
    var tot_post = post.length;
    var num_post = num_pos.length;
    var mecasa = tot_post * num_pos / 100;
    return mecasa;
}

function search(){
   var mysearch = documents.getElementById("search");
   mysearch.innerHTML = "Enter Your search here: ";

   if mysearch !== myhouse (
       console.log "This "
   )

}




