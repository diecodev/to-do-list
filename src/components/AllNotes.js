const AllNotes = ({ tasks, changeState }) => {
  return (
    <div className="notes-container">
      {tasks.map((note) => (
        <div key={note.key} className="task-item">
          <div className="task-container">
            <input
              type="checkbox"
              checked={note.state}
              id={`item-state${note.key}`}
              onChange={() => changeState(note.key)}
            />
            <label htmlFor={`item-state${note.key}`}>{note.content}</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllNotes;
