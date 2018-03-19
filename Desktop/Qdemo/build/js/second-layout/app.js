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

            var rowCounter = 0;
            $("#loader").hide();
            $("#quantum-logo").hide();
            $("#container").show();

            var sentiments = {
                'very-negative': 0,
                'negative': 0,
                'neutral': 0,
                'positive': 0,
                'very-positive': 0
            };
            $("#post-tbody").html(" ");
            var counter = 0;
            data.forEach(function (column) {
                var keyword;

                column.forEach(function (item) {
                    keyword = item.word;
                    var searchMask = keyword;
                    var regEx = new RegExp(searchMask, "ig");
                    var text = item.text.replace(regEx, "<strong>" + keyword + "</strong>");
                    var img = "<div class='img' style='background-image: url(" + item.post_url + ")'>";
                    var cssClass = item.sentiment_enum.replace(" ", "-");
                    sentiments[cssClass]++;
                    var overlay = $("<div class='overlay'></div>");
                    var gridColumn = $(".grid-container .grid-column" + counter);
                    var comment = item.comment_data[0];
                    if(comment) {

                        var row = $("<tr data-sentiment='"+cssClass+"'>\n" +
                            "                    <td>" + item.username + "</td>\n" +
                            "                    <td>\n" +
                            "                      <div class=\"media\">\n" +
                            "                        <div class=\"media-left avatar\"><img src=\"" + comment.owner.profile_pic_url + "\" alt=\"\" class=\"media-object img-circle\"><span class=\"status bg-success\"></span></div>\n" +
                            "                        <div class=\"media-body\">\n" +
                            "                          <h5 class=\"media-heading\">" + item.fullname + "</h5>\n" +
                            "                          <p class=\"text-muted mb-0\">Post Comment:</p>\n" + item.text.substr(0, 50) + "..." +
                            "                        </div>\n" +
                            "                      </div>\n" +
                            "                    </td>\n" +
                            "                    <td>" +moment(comment.created_at * 1000).format('L') +" </td>\n" +
                            "                    <td>" + item.sentiment_enum + "</td>\n" +
                            "                    <td class=\"text-center\">" + keyword + "</td>\n" +
                            "                  </tr>");
                        $("#post-tbody").append(row);
                        row.click(function () {
                            var modal = $("#instagram-post-detail");
                            var comment = item.comment_data[0];
                            modal.find('.overlay-bg').attr('src', item.post_url);
                            modal.find(".name").text(item.fullname);
                            modal.find('.username').text(item.username);
                            modal.find(".user-img").attr('src', comment.owner.profile_pic_url);//update-this
                            modal.find(".text").html(text);
                            modal.find(".num_comments").text(item.comment_count);
                            modal.find('.engagement').text(item.sentiment_enum);
                            modal.find('.likes').text(item.like_count);
                            modal.find('.bg-black').removeClass('very-positive').removeClass('positive').removeClass('neutral').removeClass('negative').removeClass('very-negative');
                            modal.find('.bg-black').addClass(cssClass);
                            var comment_div = $(modal.find('.comments')[0]);
                            comment_div.html(" ");
                            item.comment_data.forEach(function(comment){
                                comment_div.append("<div class='comment'>@" + comment.owner.username + " said: " +comment.text+"</div>");
                            });
                        });
                        if (rowCounter === 0){
                            row.click();
                        }
                        rowCounter++;
                    }



                    overlay.click(function (){
                        var modal = $("#modal");
                        var comment = item.comment_data[0];
                        modal.find('.overlay-bg').attr('src', item.post_url);
                        modal.find(".name").text(item.fullname);
                        modal.find('.username').text(item.username);
                        modal.find(".user-img").attr('src', comment.owner.profile_pic_url);//update-this
                        modal.find(".text").html(text);
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
            $("#num-instagram").text(rowCounter);
            for (var i in sentiments) {
                if (i) {
                    try {
                        $("#instagram-right ." + i).text(sentiments[i]);
                    } catch (e) {
                    }
                    ;
                }
            }

            var num = (sentiments['very-positive'] + sentiments['positive'] / rowCounter * 100).toFixed(0);
            $(".text-success.instagram").text(num + "%");

            $(".counter").counterUp({delay: 10, time: 1e3});

           $("#order-table").DataTable(
                {

                    "bLengthChange": false,
                    "bFilter": true,
                    "bInfo": false,
                    "bAutoWidth": false,

                }
            )
        })
    } else {
        $("#search-term").show();
        $("#quantum-logo").show();
        $("#loader").hide();
    }
}

$(function () {
    $(".checkbox input").change(function () {

        var checked = $(".checkbox input:checked");
        var values = [];
        checked.each(function(item) {
            values.push($(this).val());
        })

        if(values.length === 0) {
            $("#post-tbody tr").removeClass('hidden');
            return;
        }

        $("#post-tbody tr").each(function () {
            var sentiment = $(this).data('sentiment');
            if (values.indexOf(sentiment) === -1) {
                $(this).addClass('hidden')
            }
            else {
                $(this).removeClass('hidden');
            }
        })
    })
    $("#search").change(function (e) {
        e.preventDefault();
        fetchKeyWord($(this).val());
    })
    $("#keyword-form").submit(function (e) {
        e.preventDefault();

    })
    /*$("body").on('click', '.grid-item .overlay', function () {
        debugger;
        $("#modal").modal('show');
    });*/
});

function on() {
    document.getElementsByClassName("very-negative").style.display = "block";
}
