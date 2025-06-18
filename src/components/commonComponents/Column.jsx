import { Draggable, Droppable } from "@hello-pangea/dnd";


const Column = ({ col, tasks=[], id }) => {
  const fieldTask =()=> tasks.filter(task => col.taskIds.includes(task.id));
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="list__Container">
          <h2 className="list__title">{col.title}</h2>
          <div
            className="list_innerContainer"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {fieldTask().map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: "#eee",
                      borderRadius: 4,
                      padding: "4px 8px",
                      transition: "background-color .8s ease-out",
                      marginTop: 8,
                      ...provided.draggableProps.style,
                    }}
                  >
                    <p>{item.title}</p>
                    {item.description}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
export default Column;