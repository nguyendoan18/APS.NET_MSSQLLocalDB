//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

function closemodel() {
    $('#myModal').modal('hide');
    $('#myModal1').modal('hide');
}
//Load Data function  
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            var i = 1;
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + i + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.Address + '</td>';
                html += '<td>' + item.Phone + '</td>';
                html += '<td><a href="#" onclick="Delele(' + item.EmployeeID + ')"><i class="fa fa-trash"  style="color:  red;  font-size: 25px;" aria-hidden="true"></i></a></td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmployeeID: $('#EmployeeID').val(),
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Phone: $('#Phone').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $("#Toast_create").toast("show");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#myToast").toast("show");
    });
});
//function for deleting employee's record  
var id_delete = 0;
function Delele(ID) {
    $('#myModal1').modal('show');
    id_delete = ID;
    $('#btndelete').click(function () {
        DeleteAction(id_delete)
    });
}

function DeleteAction(id_delete) {
    $.ajax({
        url: "/Home/Delete/" + id_delete,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $("#Toast_delete").toast("show");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    $('#myModal1').modal('hide');
}
//Function for clearing the textboxes  
function clearTextBox() {
    $('#EmployeeID').val("");
    $('#Name').val("");
    $('#Email').val("");
    $('#Address').val("");
    $('#Phone').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#Phone').css('border-color', 'lightgrey');
    $('#myModal').modal('show');

}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }
    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
    if ($('#Phone').val().trim() == "") {
        $('#Phone').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Phone').css('border-color', 'lightgrey');
    }
    return isValid;
}