document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from localStorage when page loads
    loadTasks();
    
    // Add task when Add button is clicked
    addBtn.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText) {
            // Create new task item
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <div class="buttons-container">
                    <button class="complete-btn">Complete</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            
            // Add to the list
            taskList.appendChild(taskItem);
            
            // Clear input
            taskInput.value = '';
            
            // Add event listeners to the new buttons
            taskItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
            taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
            
            // Save tasks to localStorage
            saveTasks();
        }
    }
    
    function toggleComplete(e) {
        const taskItem = e.target.closest('.task-item');
        taskItem.classList.toggle('completed');
        saveTasks();
    }
    
    function deleteTask(e) {
        const taskItem = e.target.closest('.task-item');
        taskItem.remove();
        saveTasks();
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                
                if (task.completed) {
                    taskItem.classList.add('completed');
                }
                
                taskItem.innerHTML = `
                    <span>${task.text}</span>
                    <div class="buttons-container">
                        <button class="complete-btn">Complete</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
                
                taskList.appendChild(taskItem);
                
                // Add event listeners to the loaded buttons
                taskItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
                taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
            });
        }
    }
});