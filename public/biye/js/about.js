$(function () {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        data: '',
        dataType: 'json',
        success: function (data) {
            console.log(data)
        }
    });
});