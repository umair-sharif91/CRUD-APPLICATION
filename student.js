$(document).ready(function() {


    $('#Retrieve').click(function() {
        $.ajax({
            url: '/student',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var tableBody = $('#student-table-body');
                tableBody.empty(); 

                
                $.each(data, function(index, student) {
                    var row = '<tr>' +
                        '<td>' + student.ID + '</td>' +
                        '<td>' + student.Name + '</td>' +
                        '<td>' + student.CNIC + '</td>' +
                        '<td>' + student.Course + '</td>' +
                        '<td>' + student.Grade + '</td>' +
                        '<td>' + student.GPA + '</td>' +
                        '</tr>';
                    tableBody.append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    });

    
    $('#student').on('submit', function(event) {
        event.preventDefault(); 

    
        var formData = {
            name: $('#name').val(),
            CNIC: $('#CNIC').val(),
            Course: $('#Course').val(),
            Grade: $('#Grade').val(),
            GPA: $('#GPA').val()
        };

        $.ajax({
            url: '/add-student',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData), 
            success: function(response) {
                alert('Data added successfully');
                $('#Retrieve').click(); 
            },
            error: function(xhr, status, error) {
                console.error('Error adding data:', error);
                alert('Error adding data');
            }
        });
    });

    
    $('#delete-button').on('click', function() {
        var userId = $('#delete-id').val(); 

        if (userId) {
            $.ajax({
                url: `/delete-student/${userId}`,
                method: 'DELETE',
                success: function(response) {
                    alert(response.message);
                    $('#Retrieve').click(); 
                },
                error: function(xhr, status, error) {
                    alert('Error deleting user:', error);
                }
            });
        } else {
            alert('Please enter an ID to delete.');
        }
    });

    
    $('#update-button1').on('click', function() {
        var userId = $('#update-id').val();
        var updateName = $('#update-name').val();
        var updatedCNIC = $('#update-CNIC').val();
        var updatedCourse = $('#update-Course').val();
        var updatedGrade = $('#update-Grade').val();
        var updatedGPA = $('#update-GPA').val();

        if (userId) {
        
            var updateData = {};
            if (updateName) updateData.name = updateName;
            if (updatedCNIC) updateData.CNIC = updatedCNIC;
            if (updatedCourse) updateData.Course = updatedCourse;
            if (updatedGrade) updateData.Grade = updatedGrade;
            if (updatedGPA) updateData.GPA = updatedGPA;

            $.ajax({
                url: `/update-student/${userId}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updateData), 
                success: function(response) {
                    alert(response.message);
                    $('#Retrieve').click();
                },
                error: function(xhr, status, error) {
                    alert('Error updating user:', error);
                }
            });
        } else {
            alert('Please enter an ID to update.');
        }
    });
});
