import { gql } from "@apollo/client";
const GET_TASKS = gql`
    query tasks {
    task(order_by: {created_at: desc}) {
      id
      email
      title
      description
      is_completed
      created_at
      updated_at
    }
  }  
`;
const UPDATE_TASK = gql`
  mutation update_task($task_id: Int!, $is_completed: Boolean!){
    update_task(where: {id: {_eq: $task_id}}, _set: {is_completed: $is_completed}) {
        affected_rows
      }
  }
`;

const DELETE_TASK_QUERY = gql`
  mutation delete_task($task_id: Int!){
    delete_task(where: {id: {_eq: $task_id}}) {
        affected_rows
      }
  }
`;
const ADD_TASK = gql`
mutation AddTask($task: task_insert_input!) {
    insert_task_one(object: $task) {
      id
    }
  }
`;
export {
  UPDATE_TASK,
  DELETE_TASK_QUERY,
  GET_TASKS,
  ADD_TASK
}