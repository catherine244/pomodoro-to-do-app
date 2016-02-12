import $ from 'jquery';
import ToDoActions from "../actions/to_do_actions.js";

class ApiToDoUtil {
  create (formData, username, success, failure, ...callbacks) {
    const receiveToDo = (data) => {
      ToDoActions.receiveToDo(data.to_do);
      success(data.message);
      callbacks.forEach( (callback) => callback() );
    };

    const receiveError = (data) => failure(data.responseJSON.errors);

    $.ajax({
      url: `/user/${ username }/todo`,
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData})
      .done(receiveToDo)
      .fail(receiveError);
  }

  fetch (username) {
    const receiveToDos = (data) => ToDoActions.receiveToDos(data.to_dos);

    $.get(`/user/${ username }/todo`).done(receiveToDos);
  }

  delete (username, toDoId, success) {
    const deleteToDo = (data) => {
      ToDoActions.deleteToDo(data.to_do);
      success(data.message);
    };

    $.ajax({
      url: `/user/${ username }/todo/${ toDoId }`,
      type: 'DELETE'
    }).done(deleteToDo);
  }

  update (formData, username, toDoId, success, failure, ...callbacks) {
    const receiveToDo = (data) => {
      ToDoActions.updateToDo(data.to_do);
      success(data.message);
      callbacks.forEach( (callback) => callback() );
    };

    const receiveError = (data) => failure(data.responseJSON.errors);

    $.ajax({
      url: `/user/${ username }/todo/${ toDoId }`,
      method: "PUT",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData})
      .done(receiveToDo)
      .fail(receiveError);
  }
}

const apiToDoUtil = new ApiToDoUtil();

export default apiToDoUtil;
