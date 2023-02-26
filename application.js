$(document).ready(function(){
    var displayAllTasks = function (filter) {
      if (!filter) {
        filter = 'all';
      }
  
      $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=116',
        dataType: 'json',
        success: function (response, textStatus) {
          $('.to-do-amount').empty();
          var activeTasks = 0;
          
          response.tasks.filter(function (task) {
            if (filter === 'all') {
              return true;
            }
            if (filter === 'active') {
              return !task.completed;
            }
            if (filter === 'completed') {
              return task.completed;
            }
          })
          .forEach(function (task) {
            if (!task.completed) {
              activeTasks++;
            }
            
            $('.to-do-amount').append('<div class="todo-list ' + (task.completed ? 'complete' : '') + '"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + " " + task.content + " " + '<button class="delete btn-danger btn-sm" data-id="' + task.id + '"></button></div>' + '<br>');
          });
          $('.to-do-amount').append('Number of Active Tasks' + " = " + activeTasks);
          console.log(activeTasks);
        },

        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
    
    var createTask = function () {
      $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=116',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#task-content').val()
          }
        }),
        success: function (response, textStatus) {
          $('#task-content').val('');
          displayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });  
    }
    
    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      createTask();
    });
  
    var deleteTask = function (id) {
      $.ajax({
        type: 'DELETE',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=116',
        success: function (response, textStatus) {
          displayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  
    $(document).on('click', '.delete', function () {
      deleteTask($(this).data('id'));
    });
  
    var markTaskComplete = function (id) {
      $.ajax({
        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=116',
        dataType: 'json',
        success: function (response, textStatus) {
          displayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  
    var markTaskActive = function (id) {
      $.ajax({
        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=116',
        dataType: 'json',
        success: function (response, textStatus) {
          displayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  
    $(document).on('change', '.mark-complete', function () {
      if (this.checked) {
        markTaskComplete($(this).data('id'));
      } else {
        markTaskActive($(this).data('id'));
      }
    });
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("title").innerHTML = "Your To-do List: " + m + "/" + d + "/" + y;
  
    $('#all-button').on('click', function () {
      displayAllTasks('all');
    });
    $('#remaining-button').on('click', function () {
      displayAllTasks('active');
    });
    $('#completed-button').on('click', function () {
      displayAllTasks('completed');
    });
  
  function filteredItems() {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  }
  $('.filtered-div button').on('click', filteredItems);
    displayAllTasks();
  });