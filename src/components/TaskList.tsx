import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if (newTaskTitle === null || typeof newTaskTitle === 'undefined' || newTaskTitle === '') {
      return;
    }

    let task = {
      id: Math.floor(Math.random() * 1000 + 1),
      title: newTaskTitle,
      isComplete: false
    }
    // rebuild the tasks state with the spread operator passing the existing tasks and adding the new task
    setTasks([...tasks, task]);

    // clean up the todo input
    setNewTaskTitle('');

  }

  function handleToggleTaskCompletion(id: number) {

    /**
     * Using a functional state update to correctly update from any previous state value. 
     * Shallow copy any parts of the state that will be updated. Remember the useState hook 
     * state updater function doesn't shallow merge updates, so an entirely new state value 
     * will be returned.
     * 
     * Therefore, the previous array was mapped to a new array reference and then copied 
     * the array that will be updated, appending the updated properties, by checking the 
     * previous boolean value.
     * 
     * @param id number
     * @param isComplete boolean
     */
    const updateTask = (id: number, isComplete: boolean) => {
      setTasks(state => state.map(task => task.id === id ? { ...task, isComplete } : task))
    };

    let task = tasks.find(task => task.id === id);
    if (task?.isComplete) {
      updateTask(id, false);
    } else {
      updateTask(id, true);
    }

  }

  function handleRemoveTask(id: number) {

    const deleteTask = (id: number) => {
      setTasks(state => state.filter(task => task.id !== id))
    };

    deleteTask(id);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}